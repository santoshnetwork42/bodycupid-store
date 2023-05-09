import { useCallback, useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import Head from "next/head";
import { API } from "aws-amplify";
import { useRouter } from "next/router";

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
import { getCartTotals, toInteger, toDecimal } from "~/utils";
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
import { systemActions } from "~/store/system";
import {
  DownAngle,
  RightAngle,
  ShoppingCart,
  UpAngle,
} from "~/components/icons";
import { Collapse } from "react-bootstrap";
import PaymentMethods from "~/components/features/payment-radio";
import { alertToaster } from "~/utils/popupHelper";
import { useWindowDimensions } from "~/utils/getWindowDimension";
import { useInventory } from "~/utils/hooks/useInventory";

function Checkout(props) {
  const {
    cartList,
    user,
    emptyCart,
    appliedCoupon,
    store,
    metadata,
    shippingTiers,
    getShippingTiers,
    placeOrder: onPlaceOrder,
    startCheckout,
    openAllAddressModal,
  } = props;

  const { name } = store;

  const { isSmallSize: isMobile } = useWindowDimensions();
  const inventoryMapping = useInventory(cartList);
  const router = useRouter();
  const [payMethod, setFirst] = useState("NONE");
  const [shippingAddress, setAddress] = useState(null);
  const [loading, setLoading] = useState(null);
  const [formErorr, setFormErorr] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [paymentId, setPaymentId] = useState(null);
  const [timer, setTimer] = useState(null);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [isCollapse, setIsCollapse] = useState(false);

  const isFirst = payMethod === "PREPAID";

  useEffect(() => {
    startCheckout();
    getShippingTiers();
  }, []);

  const {
    totalListingPrice,
    totalPrice,
    shippingTotal,
    totalAmountSaved,
    couponTotal,
    grandTotal,
    prepaidDiscount,
    totalDiscount,
    codGrandTotal,
    prepaidGrandTotal,
  } = useMemo(
    () => getCartTotals(cartList, appliedCoupon, shippingTiers, isFirst),
    [cartList, appliedCoupon, isFirst, shippingTiers]
  );

  const inventorySuccess = useMemo(() =>
    cartList.every((c) => c.qty <= inventoryMapping[c.recordKey])
  );

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
          authMode: "AMAZON_COGNITO_USER_POOLS",
        }),
      ]);

      setLoading(false);

      if (rzpEnabled && transaction) {
        const options = {
          key: RAZORPAY_KEY,
          amount: transaction.amount,
          currency: "INR",
          name: store.name,
          image: getPublicImageURL(store.imageUrl),
          order_id: transaction.orderId,
          handler: async function ({ razorpay_payment_id }) {
            onPlaceOrder(order, [...cartList], appliedCoupon);
            setOrderId(orderId);
            setPaymentId(razorpay_payment_id);
            setPaymentLoading(true);
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
        };
        var rzp1 = new Razorpay(options);
        rzp1.open();
      } else {
        alertToaster("Something went wrong. Try Again!", "error");
      }
    },
    [store, user, inventorySuccess]
  );

  const handleCodPayments = (orderId) => {
    setPaymentLoading(true);
    const intervalId = setInterval(() => {
      getOrders(intervalId, orderId);
    }, 2000);
    return () => clearInterval(intervalId);
  };

  const getOrders = useCallback(
    async (intervalId, orderId) => {
      setPaymentLoading(true);
      try {
        const {
          data: { getOrder },
        } = await API.graphql({
          query: getOrderStatus,
          variables: { id: orderId },
          authMode: "AMAZON_COGNITO_USER_POOLS",
        });
        const { code } = getOrder;
        if (code) {
          clearInterval(intervalId);
          await router.push(`/order/${orderId}`);
          await emptyCart();
          setLoading(false);
          setPaymentLoading(false);
        }
      } catch (error) {
        setPaymentLoading(false);
        errorHandler(error);
      }
    },
    [user]
  );

  const fetchPaymentStatus = useCallback(async () => {
    if (orderId && paymentId) {
      try {
        const {
          data: {
            validateTransaction: { success },
          },
        } = await API.graphql({
          query: validateTransaction,
          variables: { orderId, razorpayPaymentId: paymentId },
        });
        if (success) {
          await emptyCart();
          await router.push(`/order/${orderId}?paymentId=${paymentId}`);
          setPaymentLoading(false);
        }
      } catch (error) {
        errorHandler(error);
      }
    }
  }, [orderId, paymentId]);

  useEffect(() => {
    if (paymentLoading) {
      if (timer) clearTimeout(timer);
      const timerId = setTimeout(() => {
        fetchPaymentStatus();
        setTimer(null);
      }, [2000]);
      setTimer(timerId);
    }
  }, [orderId, paymentId, paymentLoading]);

  const addUserAddress = useCallback(async () => {
    const tempAddress = getProperAddress(shippingAddress);
    const { id: ignoreId, ...restAddress } = tempAddress;
    if (user && !ignoreId) {
      try {
        await API.graphql({
          query: createUserAddress,
          variables: { input: { ...restAddress, userID: user.id } },
          authMode: "AMAZON_COGNITO_USER_POOLS",
        });
      } catch (error) {
        errorHandler(error);
      }
    }

    return Promise.resolve(null);
  }, [shippingAddress, user]);

  const placeOrder = useCallback(
    async (e) => {
      e.preventDefault();
      if (!inventorySuccess) {
        alertToaster(
          "Some product goes out of stock, Please remove from cart.",
          "error"
        );
        return;
      }

      if (payMethod === "NONE") {
        alertToaster("Please select payment method", "error");
        return;
      }

      setLoading(true);

      const paymentType = isFirst ? "PREPAID" : "COD";
      const formErrors = await validateAddress(shippingAddress, paymentType);
      setFormErorr(formErrors);
      if (!formErrors) {
        try {
          const tempAddress = getProperAddress(shippingAddress);
          const { id: ignoreId, ...restAddress } = tempAddress;

          const orderDate = new Date();
          const sla = new Date();
          sla.setDate(sla.getDate() + 2);

          const payload = {
            storeId: STORE_ID,
            userId: user?.id,
            status: isFirst ? "PENDING" : "CONFIRMED",
            totalAmount: grandTotal,
            totalDiscount,
            totalShippingCharges: shippingTotal,
            orderDate: orderDate.toISOString(),
            sla: sla.toISOString(),
            paymentType: isFirst ? "PREPAID" : "COD",
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
            authMode: "AMAZON_COGNITO_USER_POOLS",
          });

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
              authMode: "AMAZON_COGNITO_USER_POOLS",
            }),
            ...cartList.map((p) => {
              const itemtotal = parseInt(p.qty) * parseInt(p.price);
              const itemDiscount = (totalDiscount * itemtotal) / totalPrice;
              const itemShippingCharges =
                (shippingTotal * itemtotal) / totalPrice;

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
                    totalPrice: itemtotal + itemShippingCharges - itemDiscount,
                    sku: p.sku,
                  },
                },
                authMode: "AMAZON_COGNITO_USER_POOLS",
              });
            }),
          ];

          promise.push(addUserAddress());

          const [
            {
              data: { createPayment: payment },
            },
          ] = await Promise.all(promise);

          if (isFirst) {
            handlePayment({
              order,
              paymentId: payment.id,
              address: restAddress,
            });
          } else {
            onPlaceOrder(order, [...cartList], appliedCoupon);
            handleCodPayments(orderId);
          }
        } catch (error) {
          errorHandler(error);
        }
      }
      setLoading(false);
      return false;
    },
    [
      user,
      isFirst,
      appliedCoupon,
      shippingAddress,
      cartList,
      createUserAddress,
      formErorr,
      handlePayment,
      setFormErorr,
      grandTotal,
      shippingTotal,
      couponTotal,
      prepaidDiscount,
      metadata,
      totalDiscount,
      totalPrice,
      payMethod,
    ]
  );

  const codDisabled = useMemo(
    () => appliedCoupon?.couponType === "ONLINE",
    [appliedCoupon]
  );
  const productDiscountPercentage = ({ price, listingPrice }) => {
    return Math.round(((listingPrice - price) / listingPrice) * 100);
  };

  return (
    <main className="main checkout">
      <Head>
        <title>{name} | Checkout</title>
      </Head>

      <h1 className="d-none">{name} - Checkout</h1>

      {!user && <Passwordless forceOpen redirect={false} />}

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
                          <div className="d-flex align-items-center">
                            <ShoppingCart size={20} />
                            <p className="checkout-summary-label m-0">
                              Order Summary
                            </p>
                            {isCollapse ? (
                              <UpAngle size={17} color="currentColor" />
                            ) : (
                              <DownAngle color="currentColor" size={16} />
                            )}
                          </div>
                          <p className="m-0 checkout-summary-total font-weight-semi-bold">
                            ₹{toInteger(grandTotal)}
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
                              {cartList.map((item) => (
                                <tr
                                  className="m-0 p-0 border-no"
                                  key={item?.id}
                                >
                                  <td className="m-0 p-0">
                                    <div className="mobile-specific-cart-product-container border-regular bg-white mb-2 d-flex p-relative">
                                      <figure>
                                        <ALink href={"/product/" + item.slug}>
                                          <img
                                            src={getPublicImageURL(
                                              item.images.items[0]?.imageKey
                                            )}
                                            width="100"
                                            height="100"
                                            alt={item.images.items[0]?.alt}
                                          />
                                        </ALink>
                                      </figure>
                                      <div className="text-left text-primary w-100 mr-5 ml-2">
                                        <div>
                                          <ALink href={"/product/" + item.slug}>
                                            {item.title}
                                          </ALink>
                                        </div>
                                        {item.qty >=
                                        inventoryMapping[item.recordKey] ? (
                                          <div className="outofstock-tag mt-2">
                                            <p className="m-0 outofstock-label">
                                              out of stock
                                            </p>
                                          </div>
                                        ) : (
                                          <div className="product-subtotal mt-1">
                                            {!(
                                              item.isBogo && item.qty === 1
                                            ) && (
                                              <span className="sm-product-amount">
                                                ₹{toDecimal(item.price)}
                                              </span>
                                            )}

                                            <p className="m-0 product-discount-listing">
                                              {item.price <
                                                item.listingPrice && (
                                                <del className="summary-subtotal-listingprice">
                                                  ₹
                                                  {toDecimal(item.listingPrice)}
                                                </del>
                                              )}
                                              {item.isBogo && item.qty === 1 ? (
                                                <span className="text-success ml-1">
                                                  Free
                                                </span>
                                              ) : (
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
                                              )}
                                            </p>
                                          </div>
                                        )}
                                        {item.isBogo && item.qty > 1 && (
                                          <div className="summary-saving-lable-container mb-1  qty-label ">
                                            {" "}
                                            <p className="m-0 saving-lable">
                                              1 qty is Free
                                            </p>
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

                                {!!appliedCoupon && (
                                  <>
                                    <tr className="summary-subtotal-saving">
                                      <td>
                                        <h4 className="summary-subtitle">
                                          Coupons
                                        </h4>
                                        <p className="m-0">
                                          <span className="d-flex">
                                            <span className="mr-1">
                                              {appliedCoupon.code}
                                            </span>
                                          </span>
                                        </p>
                                      </td>
                                      <td>
                                        <p className="summary-subtotal-price discount-price-color">
                                          - {`₹${toDecimal(couponTotal)}`}
                                        </p>
                                      </td>
                                    </tr>
                                  </>
                                )}

                                {isFirst && (
                                  <tr className="summary-subtotal">
                                    <td>
                                      <h4 className="summary-subtitle">
                                        5% Online Payment Discount
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
                                    {!!shippingTotal
                                      ? `₹${toDecimal(shippingTotal)}`
                                      : "Free"}
                                  </td>
                                </tr>

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
                                      ₹{toInteger(grandTotal)}
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
                                    {!!totalAmountSaved && (
                                      <div className="summary-saving-lable-container">
                                        <p className="saving-lable">
                                          <span>{`₹${toDecimal(
                                            totalAmountSaved
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
                            tag={"EXTRA 5% OFF"}
                            isSelected={payMethod === "PREPAID"}
                            description="Pay using credit/debit cards, net-banking, UPI, or digital wallets."
                            onClick={() => {
                              setFirst("PREPAID");
                            }}
                            amount={prepaidGrandTotal}
                          />

                          <PaymentMethods
                            title="Cash On Delivery"
                            isSelected={payMethod === "COD"}
                            description="Pay using Cash on Delivery"
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
                      <div className="stick-bottom-button d-flex justify-content-center">
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
                            disabled={!isValidAddress(shippingAddress)}
                            className={`btn btn-rounded d-flex justify-content-center align-items-center btn-order ${
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
              <p>Your cart is currently empty.</p>
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
      <PaymentLoader loading={paymentLoading} />
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
    shippingTiers: state.system.shippingTiers,
  };
}
const Component = connect(mapStateToProps, {
  emptyCart: cartActions.emptyCart,
  openLogin: modalActions.openPasswordlessModal,
  removeCoupon: cartActions.removeCoupon,
  getShippingTiers: systemActions.getShippingTiers,
  placeOrder: eventActions.placeOrder,
  startCheckout: eventActions.startCheckout,
  openAllAddressModal: modalActions.openAllAddressModal,
})(Checkout);

Component.hideFooter = true;
export default Component;
