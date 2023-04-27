import { useCallback, useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import Head from "next/head";
import { API } from "aws-amplify";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import ALink from "~/components/features/custom-link";
import {
  createOrder,
  createOrderProduct,
  createTransaction,
  createPayment,
  validateTransaction,
} from "~/graphql/api";
import { createUserAddress } from "~/graphql/mutations";
import { toDecimal, getCartTotals } from "~/utils";
import { cartActions } from "~/store/cart";
import { modalActions } from "~/store/modal";
import { eventActions } from "~/store/events";
import Addresses from "~/components/common/addresses";
import loadScript from "~/utils/loadScript";
import { STORE_ID, RAZORPAY_SCRIPT, RAZORPAY_KEY } from "~/config";
import { getPublicImageURL } from "~/utils/getPublicImageUrl";
import AlertPopup from "~/components/features/product/common/alert-popup";
import Passwordless from "~/components/common/partials/passwordless";
import { validateAddress, getProperAddress } from "~/utils/address";
import { scrollWithOffset } from "~/utils/helper";
import PaymentLoader from "~/components/common/partials/payment-loader";
import { systemActions } from "~/store/system";
import { Cross } from "~/components/icons";

function Checkout(props) {
  const {
    cartList,
    user,
    emptyCart,
    appliedCoupon,
    removeCoupon,
    store,
    metadata,
    shippingTiers,
    getShippingTiers,
    placeOrder: onPlaceOrder,
  } = props;

  const { name } = store;
  const router = useRouter();
  const [payMethod, setFirst] = useState("NONE");
  const [shippingAddress, setAddress] = useState(null);
  const [loading, setLoading] = useState(null);
  const [formErorr, setFormErorr] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [paymentId, setPaymentId] = useState(null);
  const [timer, setTimer] = useState(null);
  const [paymentLoading, setPaymentLoading] = useState(false);

  const isFirst = payMethod === "PREPAID";

  useEffect(() => {
    getShippingTiers();
  }, []);

  const {
    totalListingprice,
    totalPrice,
    shippingTotal,
    amoutSaved,
    couponTotal,
    grandTotal,
    prepaidDiscount,
  } = useMemo(
    () => getCartTotals(cartList, appliedCoupon, shippingTiers, isFirst),
    [cartList, appliedCoupon, isFirst, shippingTiers]
  );

  const handlePayment = useCallback(
    async ({ order, paymentId, address }) => {
      const { id: orderId } = order;
      const authMode = user ? "AMAZON_COGNITO_USER_POOLS" : "API_KEY";

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
          authMode,
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
        toast(
          <AlertPopup
            message="Something went wrong. Try Again!"
            status="error"
          />
        );
      }
    },
    [store, user]
  );

  const fetchPaymentStatus = useCallback(async () => {
    if (orderId && paymentId) {
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
      await API.graphql({
        query: createUserAddress,
        variables: { input: { ...restAddress, userID: user.id } },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });
    }

    return Promise.resolve(null);
  }, [shippingAddress, user]);

  const placeOrder = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);
      const paymentType = isFirst ? "PREPAID" : "COD";
      const formErrors = await validateAddress(shippingAddress, paymentType);
      setFormErorr(formErrors);
      if (!formErrors) {
        try {
          const tempAddress = getProperAddress(shippingAddress);
          const { id: ignoreId, ...restAddress } = tempAddress;
          const authMode = user ? "AMAZON_COGNITO_USER_POOLS" : "API_KEY";
          const payload = {
            storeId: STORE_ID,
            userId: user?.id,
            status: isFirst ? "PENDING" : "CONFIRMED",
            totalAmount: grandTotal,
            totalDiscount: couponTotal + prepaidDiscount,
            totalShippingCharges: shippingTotal,
            orderDate: new Date().toISOString(),
            sla: new Date().toISOString(),
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
            authMode,
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
              authMode,
            }),
            ...cartList.map((p) =>
              API.graphql({
                query: createOrderProduct,
                variables: {
                  input: {
                    orderId,
                    productId: p.id,
                    variantId: p.variantId,
                    quantity: p.qty,
                    price: p.price,
                    title: p.title,
                    totalPrice: parseInt(p.qty) * parseInt(p.price),
                    sku: p.sku,
                  },
                },
                authMode,
              })
            ),
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
            await router.push(`/order/${orderId}`);
            await emptyCart();
            setLoading(false);
          }
        } catch (error) {
          console.log(error);
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

      <div
        className={`page-content pb-10 ${
          cartList.length > 0 ? "mb-10" : "mb-2"
        }`}
      >
        <div className="step-by pr-4 pl-4 d-sm-none pb-5 pt-7">
          <h3 className="title title-simple title-step">
            <ALink href="/pages/cart">1. Shopping Cart</ALink>
          </h3>
          <h3 className="title title-simple title-step active">
            <ALink href="#">2. Checkout</ALink>
          </h3>
          <h3 className="title title-simple title-step">3. Order Complete</h3>
        </div>
        <div className="container mt-0 md-7">
          {cartList.length > 0 ? (
            <>
              {/* <form className="form" onSubmit={placeOrder}> */}
              <div className="row">
                <div className="col-lg-7 mb-4 mb-lg-0 pr-lg-4">
                  <Addresses onAddressChange={setAddress} screen="checkout" />
                </div>

                <aside
                  id="checkout-details"
                  className="col-lg-5 sticky-sidebar-wrapper"
                >
                  <div
                    className="sticky-sidebar"
                    data-sticky-options="{'bottom': 50}"
                  >
                    <div className="summary pt-5 p-0 border-no">
                      <table className="order-table cart-table">
                        <thead>
                          <tr>
                            <th className="p-0"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {cartList.map((item) => (
                            <tr className="m-0 p-0 border-no">
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
                                    <div className="product-subtotal mt-1">
                                      {!(item.isBogo && item.qty === 1) && (
                                        <span className="sm-product-amount">
                                          ₹{toDecimal(item.price)}
                                        </span>
                                      )}

                                      <p className="m-0 product-discount-listing">
                                        {item.price < item.listingPrice && (
                                          <del className="summary-subtotal-listingprice">
                                            ₹{toDecimal(item.listingPrice)}
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
                                            {productDiscountPercentage(item) >
                                              0 &&
                                              `${productDiscountPercentage(
                                                item
                                              )}% off`}
                                          </span>
                                        )}
                                      </p>
                                    </div>{" "}
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
                                <h4 className="summary-subtitle">Subtotal</h4>
                              </td>
                              <td>
                                <p className="summary-subtotal-price">
                                  {totalPrice < totalListingprice && (
                                    <del className="summary-subtotal-listingprice mr-2">
                                      ₹{toDecimal(totalListingprice)}
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
                                        <ALink
                                          key={appliedCoupon.id}
                                          href="#"
                                          className="pr-1 pl-1 border-cricle lh-default d-flex align-items-center"
                                          title="Remove coupon"
                                          onClick={() => removeCoupon()}
                                        >
                                          <Cross
                                            size={12}
                                            color="currentColor"
                                          />
                                        </ALink>
                                      </span>
                                    </p>
                                  </td>
                                  <td>
                                    <p className="summary-subtotal-price discount-price-color">
                                      {`₹${toDecimal(couponTotal)}`}
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
                                  {`₹${toDecimal(prepaidDiscount)}`}
                                </td>
                              </tr>
                            )}

                            <tr className="summary-subtotal">
                              <td>
                                <h4 className="summary-subtitle">Shipping</h4>
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
                                  <p className="m-0">Inclusive of all taxes</p>
                                </h4>
                              </td>
                              <td>
                                <p className="summary-total-price ls-s">
                                  ₹{toDecimal(grandTotal)}
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
                                    Average delivery time: <span>3-5 days</span>
                                  </p>
                                </div>
                                {!!amoutSaved && (
                                  <div className="summary-saving-lable-container">
                                    <p className="saving-lable">
                                      <span>{`₹${toDecimal(amoutSaved)}`}</span>{" "}
                                      saved so far on this order
                                    </p>
                                  </div>
                                )}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div
                        className="payment accordion radio-type "
                        id="payment-method"
                      >
                        <h4 className="summary-subtitle ls-default pb-1 pt-1 mt-2">
                          Payment Methods
                        </h4>
                        <div className="checkbox-group">
                          <div className="bg-white border-regular payment-card mt-2">
                            <div className="card-header d-flex align-items-center">
                              <ALink
                                href="#"
                                className={`text-body text-normal ls-m mr-2 ${
                                  payMethod === "PREPAID" ? "collapse" : ""
                                }`}
                                onClick={() => {
                                  !isFirst && setFirst("PREPAID");
                                }}
                              >
                                Pay Online
                              </ALink>
                              <p className="extra-lable m-0">EXTRA 5% OFF</p>
                            </div>

                            <div className="card-wrapper">
                              <div className="card-body ls-m overflow-hidden">
                                Use credit/debit card, net-banking, UPI, wallets
                                to complete the payment.
                              </div>
                            </div>
                          </div>
                          <div className="bg-white mt-2 border-regular payment-card">
                            <div className="card-header">
                              <ALink
                                href="#"
                                className={`text-body text-normal ls-m ${
                                  payMethod === "COD" ? "collapse" : ""
                                }`}
                                onClick={() => {
                                  !codDisabled && isFirst && setFirst("COD");
                                }}
                              >
                                Cash on delivery
                              </ALink>
                            </div>

                            <div className="card-wrapper">
                              <div className="card-body ls-m overflow-hidden">
                                Pay in cash or pay in person at the time of
                                delivery with GPay/PayTM/PhonePe.
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {!!formErorr && (
                        <div className="overflow-hidden mb-4 mt-4">
                          <div className="alert alert-danger alert-summary alert-light alert-message alert-inline">
                            <ul className="m-0">
                              {Object.values(formErorr).map((val) => (
                                <li key={val}>{val}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                      <div className="stick-bottom-button">
                        <div className="d-sm-show lh-2">
                          <p className="summary-total-price ls-s text-primary text-align-start">
                            ₹{toDecimal(grandTotal)}
                          </p>
                          <ALink
                            onClick={() => {
                              scrollWithOffset("checkout-details", 130);
                            }}
                            className="text-underline"
                            href="#"
                          >
                            View details
                          </ALink>
                        </div>
                        {payMethod !== "NONE" && (
                          <button
                            onClick={placeOrder}
                            className="btn btn-primary btn-rounded btn-order d-flex justify-content-center align-items-center"
                          >
                            Place Order
                            {loading && <div className="spin-loader ml-2" />}
                          </button>
                        )}
                        {payMethod === "NONE" && (
                          <button
                            onClick={() => {
                              scrollWithOffset("payment-method", 0);
                            }}
                            className="btn btn-primary btn-rounded btn-order d-flex justify-content-center align-items-center"
                          >
                            Select Payment Method
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
})(Checkout);

Component.hideFooter = true;
export default Component;
