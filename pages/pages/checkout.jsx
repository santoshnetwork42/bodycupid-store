import { useCallback, useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import Head from "next/head";
import { API } from "aws-amplify";
import { useRouter } from "next/router";
import { Logger } from "aws-amplify";
import { Collapse } from "react-bootstrap";

import ALink from "~/components/features/custom-link";
import {
  createOrder,
  createOrderProduct,
  createTransaction,
  createPayment,
  validateTransaction,
  getOrderStatus,
} from "~/graphql/api";
import { createUserAddress } from "~/graphql/mutations";
import { toDecimal } from "~/utils";
import { cartActions } from "~/store/cart";
import { modalActions } from "~/store/modal";
import { eventActions } from "~/store/events";
import Addresses from "~/components/common/addresses";
import loadScript from "~/utils/loadScript";
import { STORE_ID, RAZORPAY_SCRIPT, RAZORPAY_KEY } from "~/config";
import { getPublicImageURL } from "~/utils/getPublicImageUrl";
import Passwordless from "~/components/common/partials/passwordless";
import {
  validateAddress,
  getProperAddress,
  isValidAddress,
} from "~/utils/address";
import PaymentLoader from "~/components/common/partials/payment-loader";
import { errorHandler } from "~/utils/errorHandler";
import {
  DownAngle,
  RightAngle,
  ShoppingCart,
  UpAngle,
} from "~/components/icons";
import Card from "~/components/features/accordion/card";
import PaymentMethods from "~/components/features/payment-radio";
import { alertToaster } from "~/utils/popupHelper";
import { useWindowDimensions } from "~/utils/getWindowDimension";
import { useInventory } from "~/utils/hooks/useInventory";
import { useCartItems, useCartTotal } from "~/utils/hooks/useCart";
import { useFreeProducts } from "~/utils/hooks/useCoupon";
import { useGuestCheckout } from "~/utils/contexts/navbar";

const logger = new Logger("Checkout");

function Checkout(props) {
  const {
    cartList,
    user,
    emptyCart,
    appliedCoupon,
    store,
    metadata,
    placeOrder: onPlaceOrder,
    startCheckout,
    openAllAddressModal,
    recordOutOfStock,
    openLogin,
  } = props;

  const { name } = store;

  const guestCheckout = useGuestCheckout();

  const { isSmallSize: isMobile } = useWindowDimensions();
  const {
    ready: isInventoryCheckReady,
    success: isInventoryCheckSuccess,
    inventoryMapping,
    outOfStockItems,
  } = useInventory();
  const freeProductsResponse = useFreeProducts(false);
  const router = useRouter();
  const [payMethod, setFirst] = useState("PREPAID");
  const [shippingAddress, setAddress] = useState(null);
  const [loading, setLoading] = useState(null);
  const [formErorr, setFormErorr] = useState(null);
  const [orderData, setOrderData] = useState(null);
  const [isCollapse, setIsCollapse] = useState(false);
  const [paymentData, setPaymentData] = useState({
    order: null,
    paymentId: null,
  });

  const freeProducts = useMemo(
    () => freeProductsResponse.map((f) => f.product),
    [freeProductsResponse]
  );

  const isFirst = payMethod === "PREPAID";

  useEffect(() => {
    startCheckout();
    logger.verbose("Checkout component initialized");
  }, []);

  const {
    totalListingPrice,
    totalPrice,
    shippingTotal,
    totalAmountSaved: totalSaved,
    couponTotal,
    grandTotal,
    prepaidDiscount,
    totalDiscount,
    codGrandTotal,
    prepaidGrandTotal,
    codCharges,
    appliedCODCharges,
    prepaidDiscountPercent,
  } = useCartTotal(payMethod);

  const cartItems = useCartItems(false);

  const handlePayment = useCallback(
    async ({ order, paymentId, address }) => {
      const { id: orderId } = order;

      const [
        rzpEnabled,
        {
          data: { createTransaction: transaction },
        },
      ] = await Promise.all([
        loadScript(RAZORPAY_SCRIPT),
        API.graphql({
          query: createTransaction,
          variables: { orderId },
          authMode: !!user ? "AMAZON_COGNITO_USER_POOLS" : "API_KEY",
        }),
      ]);

      if (rzpEnabled && transaction) {
        const options = {
          key: RAZORPAY_KEY,
          amount: transaction.amount,
          currency: "INR",
          name: store.name,
          image: getPublicImageURL(store.imageUrl),
          order_id: transaction.orderId,
          handler: async function ({ razorpay_payment_id }) {
            setOrderData({ order, paymentId: razorpay_payment_id });
          },
          prefill: {
            name: address.name,
            email: address.email,
            contact: address.phone,
          },
          notes: {
            storeId: store.id,
            orderId,
            paymentId,
          },
          theme: {
            color: "#3399cc",
          },
          modal: {
            ondismiss: function () {
              setPaymentData({ order: null, paymentId: null });
              setLoading(false);
            },
          },
        };

        setPaymentData({ order, paymentId });
        var rzp1 = new Razorpay(options);
        rzp1.open();
        logger.verbose("Razorpay initialization");
      } else {
        setLoading(false);
        alertToaster("Something went wrong. Try Again!", "error");
        logger.error("Something went wrong with Razorpay initialization");
      }
    },
    [store, user, cartList]
  );

  useEffect(() => {
    let intervalId;
    if (!!orderData && orderData.order) {
      onPlaceOrder(
        orderData.order,
        [...cartList, ...freeProducts],
        appliedCoupon,
        shippingAddress
      );
      const { order, paymentId } = orderData;
      const { id: orderId } = order;
      intervalId = setInterval(async () => {
        try {
          let success;
          if (paymentId) {
            success = await API.graphql({
              query: validateTransaction,
              variables: { orderId, razorpayPaymentId: paymentId },
            }).then(
              (validateTransactionResponse) =>
                validateTransactionResponse.data.validateTransaction.success
            );
          } else {
            success = await API.graphql({
              query: getOrderStatus,
              variables: { id: orderId },
            }).then(
              (getOrderStatusResponse) =>
                !!getOrderStatusResponse.data.getOrder.code
            );
          }

          if (success) {
            logger.info("Payment completion");
            const orderUrl = paymentId
              ? `/order/${orderId}?paymentId=${paymentId}`
              : `/order/${orderId}`;
            await router.push(orderUrl);
            await emptyCart();
          }
        } catch (error) {
          errorHandler(error);
          logger.error("Error while validating transaction", error);
        }
      }, 2000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [!!orderData]);

  useEffect(() => {
    let intervalId;

    if (paymentData.order && paymentData.paymentId) {
      intervalId = setInterval(async () => {
        try {
          const { order, paymentId } = paymentData;
          const { id: orderId } = order;
          let success = await API.graphql({
            query: getOrderStatus,
            variables: { id: orderId },
          }).then(
            (getOrderStatusResponse) =>
              !!getOrderStatusResponse.data.getOrder.code
          );

          if (success) {
            logger.info("Payment completion");
            const orderUrl = paymentId
              ? `/order/${orderId}?paymentId=${paymentId}`
              : `/order/${orderId}`;

            await router.push(orderUrl);
            await emptyCart();
            clearInterval(intervalId);
          }
        } catch (error) {
          errorHandler(error);
          logger.error("Error while validating transaction", error);
        }
      }, 2000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [paymentData]);

  const addUserAddress = useCallback(async () => {
    const tempAddress = getProperAddress(shippingAddress);
    const { id: ignoreId, ...restAddress } = tempAddress;
    if (user && !ignoreId) {
      try {
        await API.graphql({
          query: createUserAddress,
          variables: { input: { ...restAddress, userID: user?.id } },
          authMode: !!user ? "AMAZON_COGNITO_USER_POOLS" : "API_KEY",
        });
      } catch (error) {
        errorHandler(error);
        logger.error("Error while adding user address", error);
      }
    }

    return Promise.resolve(null);
  }, [shippingAddress, user]);

  const placeOrder = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);

      if (!isInventoryCheckSuccess) {
        recordOutOfStock(outOfStockItems, inventoryMapping);
        alertToaster("Please remove out of stock product from cart", "error");
        logger.error("Out of stock product added in cart", error);
        setLoading(false);
        return;
      }

      if (payMethod === "NONE") {
        alertToaster("Please select payment method", "error");
        logger.error("No payment method selected by user");
        setLoading(false);
        return;
      }

      const formErrors = await validateAddress(shippingAddress, payMethod);
      setFormErorr(formErrors);

      if (!formErrors) {
        try {
          const tempAddress = getProperAddress(shippingAddress);
          const { id: ignoreId, ...restAddress } = tempAddress;
          const orderDate = new Date();
          const sla = new Date();
          sla.setDate(sla.getDate() + 2);

          const freeProductTotal = freeProducts.reduce(
            (a, b) => a + b.price,
            0
          );

          const payload = {
            storeId: STORE_ID,
            userId: user?.id,
            status: isFirst ? "PENDING" : "CONFIRMED",
            totalAmount: grandTotal,
            totalDiscount: totalDiscount + freeProductTotal,
            totalShippingCharges: shippingTotal,
            totalCashOnDeliveryCharges: appliedCODCharges,
            orderDate: orderDate.toISOString(),
            sla: sla.toISOString(),
            paymentType: payMethod,
            shippingAddress: restAddress,
            billingAddress: restAddress,
            couponCodeId: appliedCoupon?.id,
            ...metadata,
          };

          const {
            data: { createOrder: order },
          } = await API.graphql({
            query: createOrder,
            variables: { input: payload },
            authMode: !!user ? "AMAZON_COGNITO_USER_POOLS" : "API_KEY",
          });
          logger.debug("Created order:", order);

          const { id: orderId } = order;

          const promise = [
            API.graphql({
              query: createPayment,
              variables: {
                input: {
                  userId: user?.id,
                  storeId: STORE_ID,
                  orderId,
                  method: isFirst ? "ONLINE" : "COD",
                  amount: grandTotal,
                },
              },
              authMode: !!user ? "AMAZON_COGNITO_USER_POOLS" : "API_KEY",
            }),
            ...cartList.map((p) => {
              const itemtotal = parseInt(p.qty) * parseInt(p.price);

              const itemDiscount =
                ((totalDiscount + freeProductTotal) * itemtotal) /
                (totalPrice + freeProductTotal);

              const itemShippingCharges =
                (shippingTotal * itemtotal) / (totalPrice + freeProductTotal);

              const itemCodCharges =
                (appliedCODCharges * itemtotal) /
                (totalPrice + freeProductTotal);

              const finalItemPrice =
                itemtotal + itemShippingCharges + itemCodCharges - itemDiscount;

              return API.graphql({
                query: createOrderProduct,
                variables: {
                  input: {
                    orderId,
                    productId: p.id,
                    variantId: p.variantId,
                    quantity: p.qty,
                    price: p.price,
                    title: p.title,
                    discount: itemDiscount,
                    shippingCharges: itemShippingCharges,
                    cashOnDeliveryCharges: itemCodCharges,
                    totalPrice: finalItemPrice,
                    sku: p.sku,
                  },
                },
                authMode: !!user ? "AMAZON_COGNITO_USER_POOLS" : "API_KEY",
              });
            }),

            ...freeProducts.map((p) => {
              const itemtotal = 1 * parseInt(p.price);

              const itemDiscount =
                ((totalDiscount + freeProductTotal) * itemtotal) /
                (totalPrice + freeProductTotal);

              const itemShippingCharges =
                (shippingTotal * itemtotal) / (totalPrice + freeProductTotal);

              const itemCodCharges =
                (appliedCODCharges * itemtotal) /
                (totalPrice + freeProductTotal);

              const finalItemPrice =
                itemtotal + itemShippingCharges + itemCodCharges - itemDiscount;

              return API.graphql({
                query: createOrderProduct,
                variables: {
                  input: {
                    orderId,
                    productId: p.id,
                    variantId: p.variantId,
                    quantity: 1,
                    price: p.price,
                    title: p.title,
                    discount: itemDiscount,
                    shippingCharges: itemShippingCharges,
                    cashOnDeliveryCharges: itemCodCharges,
                    totalPrice: finalItemPrice,
                    sku: p.sku,
                  },
                },
                authMode: !!user ? "AMAZON_COGNITO_USER_POOLS" : "API_KEY",
              });
            }),

            addUserAddress(),
          ];

          const [paymentResponse] = await Promise.all(promise);
          const payment = paymentResponse.data.createPayment;

          if (isFirst) {
            handlePayment({
              order,
              paymentId: payment.id,
              address: restAddress,
            });
          } else {
            setOrderData({ order, paymentId: null });
          }
        } catch (error) {
          setLoading(false);
          errorHandler(error);
        }
      }

      return false;
    },
    [
      user,
      isFirst,
      appliedCoupon,
      shippingAddress,
      cartList,
      createUserAddress,
      handlePayment,
      grandTotal,
      shippingTotal,
      couponTotal,
      prepaidDiscount,
      metadata,
      totalDiscount,
      totalPrice,
      payMethod,
      freeProducts,
      isInventoryCheckSuccess,
      outOfStockItems,
      inventoryMapping,
      appliedCODCharges,
    ]
  );

  const { codDisabled, onlineDisabled } = useMemo(() => {
    return {
      codDisabled: appliedCoupon?.paymentMethod === "ONLINE",
      onlineDisabled: appliedCoupon?.paymentMethod === "COD",
    };
  }, [appliedCoupon]);

  const productDiscountPercentage = ({ price, listingPrice }) => {
    return Math.round(((listingPrice - price) / listingPrice) * 100);
  };

  if (!!orderData) {
    return <PaymentLoader loading />;
  }

  return (
    <main className="main checkout">
      <Head>
        <title>{name} | Checkout</title>
      </Head>

      <h1 className="d-none">{name} - Checkout</h1>

      {!user && !guestCheckout && <Passwordless forceOpen redirect={false} />}

      <div className={`checkout-page-content page-content pb-10`}>
        <div className="step-by pr-4 pl-4 d-sm-none pb-5 pt-7">
          <h3 className="title title-simple title-step">
            <ALink href="/pages/cart">1. Shopping Cart</ALink>
            <i>
              <RightAngle size={18} color="currentColor" />
            </i>
          </h3>
          <h3 className="title title-simple title-step active">
            <ALink href="#">2. Checkout</ALink>
            <i>
              <RightAngle size={18} color="currentColor" />
            </i>
          </h3>
          <h3 className="title title-simple title-step">3. Order Complete</h3>
        </div>

        <div className={"container mt-0 md-7"}>
          {cartList.length > 0 ? (
            <>
              {!user && (
                <div className="row">
                  <div className="card accordion col-lg-12">
                    <Card
                      type="parse"
                      title="<div class='alert alert-light alert-primary alert-icon mb-4 card-header'>
                                <i class='fas fa-exclamation-circle'></i> <span class='text-body'>Returning customer?</span> <a href='#' class='text-primary collapse'>Click here to login</a>
                            </div>"
                      onLinkClick={() => openLogin(false)}
                    >
                      <div className="alert-body collapsed">
                        <Passwordless redirect={false} />
                      </div>
                    </Card>
                  </div>
                </div>
              )}

              {/* <form className="form" onSubmit={placeOrder}> */}
              <div className="row">
                {!isMobile && (
                  <div className="col-lg-7 mb-4 mb-lg-0 pr-lg-4 p-0 d-sm-none">
                    <Addresses
                      onAddressChange={setAddress}
                      variant="CHECKOUT"
                    />
                  </div>
                )}

                <aside
                  id="checkout-details"
                  className="col-lg-5 sticky-sidebar-wrapper"
                >
                  <div
                    className="sticky-sidebar"
                    data-sticky-options="{'bottom': 50}"
                  >
                    <div className="summary pt-5 p-0 border-no">
                      <div className="">
                        <div
                          onClick={() => setIsCollapse(!isCollapse)}
                          className="checkout-summary-btn d-flex bg-white border-regular align-items-center mb-2 "
                        >
                          <div>
                            <div className="d-flex align-items-center">
                              <ShoppingCart size={20} />
                              <p className="checkout-summary-label m-0">
                                Order Summary &nbsp;
                                {isCollapse ? (
                                  <UpAngle size={17} color="currentColor" />
                                ) : (
                                  <DownAngle color="currentColor" size={16} />
                                )}
                              </p>
                            </div>
                            {!!totalSaved && (
                              <p className="saving-lable mb-0 ml-6 text-success">
                                <span>{`₹${toDecimal(totalSaved)} `}</span>
                                saved so far on this order
                              </p>
                            )}
                          </div>
                          <p className="m-0 checkout-summary-total font-weight-semi-bold">
                            ₹{toDecimal(grandTotal, 0)}
                          </p>
                        </div>
                      </div>

                      <Collapse in={isCollapse}>
                        <div className="collapsible-checkout-wrapper mb-2">
                          <table className="order-table cart-table">
                            <thead>
                              <tr>
                                <th className="p-0"></th>
                              </tr>
                            </thead>
                            <tbody>
                              {cartItems.map((item) => (
                                <tr
                                  className="m-0 p-0 border-no"
                                  key={item.itemKey}
                                >
                                  <td className="m-0 p-0">
                                    <div className="mobile-specific-cart-product-container border-regular bg-white mb-2 d-flex p-relative">
                                      <figure>
                                        <img
                                          src={getPublicImageURL(
                                            item.images.items[0]?.imageKey
                                          )}
                                          width="100"
                                          height="100"
                                          alt={item.images.items[0]?.alt}
                                        />
                                      </figure>
                                      <div className="text-left text-primary w-100 mr-5 ml-2">
                                        <div>{item.title}</div>

                                        {inventoryMapping &&
                                        item.qty >
                                          inventoryMapping[item.recordKey] ? (
                                          <div className="outofstock-tag mt-2">
                                            <p className="m-0 outofstock-label">
                                              out of stock
                                            </p>
                                          </div>
                                        ) : (
                                          <div className="product-subtotal mt-1">
                                            {(item?.cartItemType ===
                                              "FREE_PRODUCT" ||
                                              item?.cartItemType ===
                                                "AUTO_FREE_PRODUCT") && (
                                              <span className="text-success mr-1">
                                                {!!item.price && (
                                                  <del className="summary-subtotal-listingprice ml-0 mr-1">
                                                    ₹{toDecimal(item.price)}
                                                  </del>
                                                )}
                                                Free
                                              </span>
                                            )}

                                            {item?.cartItemType !==
                                              "FREE_PRODUCT" &&
                                              item?.cartItemType !==
                                                "AUTO_FREE_PRODUCT" && (
                                                <p className="m-0 product-discount-listing">
                                                  <span className="sm-product-amount">
                                                    ₹{toDecimal(item.price)}
                                                  </span>
                                                  {item.price <
                                                    item.listingPrice && (
                                                    <del className="summary-subtotal-listingprice">
                                                      ₹
                                                      {toDecimal(
                                                        item.listingPrice
                                                      )}
                                                    </del>
                                                  )}
                                                  <span
                                                    className={`discount-percetage ml-2`}
                                                  >
                                                    {productDiscountPercentage(
                                                      item
                                                    ) > 0 &&
                                                      `${productDiscountPercentage(
                                                        item
                                                      )}% off`}
                                                  </span>
                                                </p>
                                              )}

                                            <div className="text-grey">
                                              Qty:{item.qty || 1}
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          <div className="check-payment-detail border-regular bg-white">
                            <table className="order-table cart-table">
                              <thead>
                                <tr>
                                  <th></th>
                                  <th></th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="summary-subtotal">
                                  <td>
                                    <h4 className="summary-subtitle">
                                      Subtotal
                                    </h4>
                                  </td>
                                  <td>
                                    <p className="summary-subtotal-price">
                                      {totalPrice < totalListingPrice && (
                                        <del className="summary-subtotal-listingprice mr-2">
                                          ₹{toDecimal(totalListingPrice)}
                                        </del>
                                      )}
                                      ₹{toDecimal(totalPrice)}
                                    </p>
                                  </td>
                                </tr>
                                {!!appliedCoupon && !!couponTotal && (
                                  <tr className="summary-subtotal">
                                    <td>
                                      <h4 className="summary-subtitle">
                                        Coupons
                                        <span> ({appliedCoupon.code})</span>
                                      </h4>
                                    </td>
                                    <td>
                                      <p className="summary-subtotal-price discount-price-color">
                                        - {`₹${toDecimal(couponTotal)}`}
                                      </p>
                                    </td>
                                  </tr>
                                )}
                                {isFirst && !!prepaidDiscount && (
                                  <tr className="summary-subtotal">
                                    <td>
                                      <h4 className="summary-subtitle">
                                        {prepaidDiscountPercent}% Online Payment
                                        Discount
                                      </h4>
                                    </td>
                                    <td className="summary-subtotal-price discount-price-color pb-0 pt-0">
                                      - {`₹${toDecimal(prepaidDiscount)}`}
                                    </td>
                                  </tr>
                                )}
                                <tr className="summary-subtotal">
                                  <td>
                                    <h4 className="summary-subtitle">
                                      Shipping
                                      {payMethod === "PREPAID" && (
                                        <p className="m-0">
                                          For prepaid orders only
                                        </p>
                                      )}
                                    </h4>
                                  </td>
                                  <td
                                    className={`summary-subtotal-price pb-0 pt-0 ${
                                      !shippingTotal && "discount-price-color"
                                    }`}
                                  >
                                    {shippingTotal < 50 && (
                                      <del className="summary-subtotal-listingprice mr-2">
                                        ₹{toDecimal(50)}
                                      </del>
                                    )}
                                    {!!shippingTotal
                                      ? `₹${toDecimal(shippingTotal)}`
                                      : "Free"}
                                    &nbsp;
                                  </td>
                                </tr>

                                {!!codCharges && (
                                  <tr className="summary-subtotal">
                                    <td>
                                      <h4 className="summary-subtitle">
                                        COD Charges
                                      </h4>
                                    </td>
                                    <td
                                      className={`summary-subtotal-price pb-0 pt-0 ${
                                        !appliedCODCharges &&
                                        "discount-price-color"
                                      }`}
                                    >
                                      {!appliedCODCharges && (
                                        <del className="summary-subtotal-listingprice mr-2">
                                          ₹{toDecimal(codCharges)}
                                        </del>
                                      )}
                                      {!!appliedCODCharges
                                        ? `₹${toDecimal(appliedCODCharges)}`
                                        : "Free"}
                                      &nbsp;
                                    </td>
                                  </tr>
                                )}

                                <tr className="summary-subtotal">
                                  <td>
                                    <h4 className="summary-subtitle">
                                      Total{" "}
                                      <p className="m-0">
                                        Inclusive of all taxes
                                      </p>
                                    </h4>
                                  </td>
                                  <td>
                                    <p className="summary-total-price ls-s">
                                      ₹{toDecimal(grandTotal, 0)}
                                    </p>
                                  </td>
                                </tr>
                                <tr>
                                  <td colSpan={2}>
                                    <div
                                      className={
                                        "avg-delivery-lable-container mt-3"
                                      }
                                    >
                                      <p className="m-0">
                                        Average delivery time:{" "}
                                        <span>3-5 days</span>
                                      </p>
                                    </div>
                                    {!!totalSaved && (
                                      <div className="summary-saving-lable-container">
                                        <p className="saving-lable">
                                          <span>{`₹${toDecimal(
                                            totalSaved
                                          )}`}</span>{" "}
                                          saved so far on this order
                                        </p>
                                      </div>
                                    )}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </Collapse>

                      {!!isMobile && (
                        <div className="col-lg-6 mb-lg-0 pr-lg-4 p-0 d-sm-show">
                          <Addresses
                            onAddressChange={setAddress}
                            variant="CHECKOUT"
                          />
                        </div>
                      )}

                      <div
                        className="payment accordion radio-type "
                        id="payment-method"
                      >
                        <h4 className="payment-heading">Payment Methods</h4>

                        <div className="checkbox-group ">
                          <PaymentMethods
                            title="Pay Online"
                            tag={
                              !!prepaidDiscount &&
                              `EXTRA ${prepaidDiscountPercent}% OFF`
                            }
                            isSelected={payMethod === "PREPAID"}
                            description={
                              onlineDisabled
                                ? `Online payment disabled for you coupon "${appliedCoupon?.code}"`
                                : "Pay using credit/debit cards, net-banking, UPI, or digital wallets."
                            }
                            disabled={onlineDisabled}
                            onClick={() => {
                              !onlineDisabled && setFirst("PREPAID");
                            }}
                            amount={prepaidGrandTotal}
                          />

                          <PaymentMethods
                            title="Cash On Delivery"
                            tagVariant="danger"
                            tag={
                              !!codCharges && `₹${toDecimal(codCharges)} EXTRA`
                            }
                            isSelected={payMethod === "COD"}
                            description={
                              codDisabled
                                ? `COD payment disabled for you coupon "${appliedCoupon?.code}"`
                                : `Pay using Cash on Delivery.`
                            }
                            disabled={codDisabled}
                            onClick={() => {
                              !codDisabled && setFirst("COD");
                            }}
                            amount={codGrandTotal}
                          />
                        </div>
                      </div>

                      {!!formErorr && (
                        <div className="overflow-hidden mb-4 ">
                          <div className="alert alert-danger alert-summary alert-light alert-message alert-inline">
                            <ul className="m-0">
                              {Object.values(formErorr).map((val) => (
                                <li key={val}>{val}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                      <div
                        className={`d-flex justify-content-center ${
                          isMobile ? "stick-bottom-button" : ""
                        }`}
                      >
                        {!isValidAddress(shippingAddress) && !!isMobile && (
                          <button
                            onClick={() => {
                              openAllAddressModal();
                            }}
                            className="btn btn-primary btn-rounded d-flex justify-content-center align-items-center btn-order"
                          >
                            Add new address
                            {loading && <div className="spin-loader ml-2" />}
                          </button>
                        )}

                        {(!!isValidAddress(shippingAddress) || !isMobile) && (
                          <button
                            onClick={placeOrder}
                            disabled={
                              !isValidAddress(shippingAddress) ||
                              !isInventoryCheckReady ||
                              loading
                            }
                            className={`btn d-flex justify-content-center align-items-center btn-order ${
                              !!isValidAddress(shippingAddress)
                                ? "btn-primary"
                                : "btn-disabled"
                            }`}
                          >
                            Place Order
                            {loading && <div className="spin-loader ml-2" />}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </aside>
              </div>
              {/* </form> */}
            </>
          ) : (
            <div className="empty-cart text-center">
              <p className="mt-2">Your cart is currently empty.</p>
              <i className="cart-empty d-icon-bag"></i>
              <p className="return-to-shop mb-0">
                <ALink
                  className="button wc-backward btn btn-dark btn-md"
                  href="/collections/all"
                >
                  Return to shop
                </ALink>
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

function mapStateToProps(state) {
  return {
    cartList: state.cart.data ? state.cart.data : [],
    user: state.user.data,
    appliedCoupon: state.cart.coupon,
    store: state.system.store,
    metadata: state.system.meta,
  };
}
const Component = connect(mapStateToProps, {
  emptyCart: cartActions.emptyCart,
  openLogin: modalActions.openPasswordlessModal,
  removeCoupon: cartActions.removeCoupon,
  placeOrder: eventActions.placeOrder,
  startCheckout: eventActions.startCheckout,
  openAllAddressModal: modalActions.openAllAddressModal,
  recordOutOfStock: eventActions.outOfStock,
})(Checkout);

Component.hideFooter = true;
Component.navbarConfig = {
  shippingTier: true,
  coupons: true,
};

export default Component;
