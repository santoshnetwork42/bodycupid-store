import { useCallback, useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import Head from "next/head";
import { API, graphqlOperation } from "aws-amplify";
import Collapse from "react-bootstrap/Collapse";
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
import Addresses from "~/components/common/addresses";
import Coupons from "~/components/features/coupon";
import loadScript from "~/utils/loadScript";
import { STORE_ID, RAZORPAY_SCRIPT, RAZORPAY_KEY } from "~/config";
import { getPublicImageURL } from "~/utils/getPublicImageUrl";
import AlertPopup from "~/components/features/product/common/alert-popup";
import Passwordless from "~/components/common/partials/passwordless";
import { validateAddress, getProperAddress } from "~/utils/address";
import { scrollWithOffset } from "~/utils/helper";
import PaymentLoader from "~/components/common/partials/payment-loader";

function Checkout(props) {
  const { cartList, user, emptyCart, appliedCoupon, removeCoupon, store } =
    props;
  const { name } = store;
  const router = useRouter();
  const [isFirst, setFirst] = useState(true);
  const [shippingAddress, setAddress] = useState(null);
  const [loading, setLoading] = useState(null);
  const [formErorr, setFormErorr] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [paymentId, setPaymentId] = useState(null);
  const [timer, setTimer] = useState(null);
  const [paymentLoading, setPaymentLoading] = useState(false);

  const {
    totalListingprice,
    totalPrice,
    shippingTotal,
    amoutSaved,
    couponTotal,
    grandTotal,
    prepaidDiscount,
  } = useMemo(
    () => getCartTotals(cartList, appliedCoupon, isFirst),
    [cartList, appliedCoupon, isFirst]
  );

  const handlePayment = useCallback(
    async ({ orderId, paymentId, address }) => {
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
          };

          const {
            data: {
              createOrder: { id: orderId },
            },
          } = await API.graphql({
            query: createOrder,
            variables: { input: payload },
            authMode,
          });

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
              orderId,
              paymentId: payment.id,
              address: restAddress,
            });
          } else {
            await emptyCart();
            await router.push(`/order/${orderId}`);
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
    ]
  );

  const codDisabled = useMemo(
    () => appliedCoupon?.couponType === "ONLINE",
    [appliedCoupon]
  );

  return (
    <main className="main checkout">
      <Head>
        <title>{name} | Checkout</title>
      </Head>

      <h1 className="d-none">{name} - Checkout</h1>

      {!user && <Passwordless forceOpen redirect={false} />}

      <div
        className={`page-content pt-7 pb-10 ${
          cartList.length > 0 ? "mb-10" : "mb-2"
        }`}
      >
        <div className="step-by pr-4 pl-4 d-sm-none">
          <h3 className="title title-simple title-step">
            <ALink href="/pages/cart">1. Shopping Cart</ALink>
          </h3>
          <h3 className="title title-simple title-step active">
            <ALink href="#">2. Checkout</ALink>
          </h3>
          <h3 className="title title-simple title-step">3. Order Complete</h3>
        </div>
        <div className="container mt-md-7">
          {cartList.length > 0 ? (
            <>
              {!appliedCoupon && <Coupons layout="checkout" />}
              {/* <form className="form" onSubmit={placeOrder}> */}
              <div className="row">
                <div className="col-lg-7 mb-6 mb-lg-0 pr-lg-4">
                  <Addresses onAddressChange={setAddress} />
                </div>

                <aside
                  id="checkout-details"
                  className="col-lg-5 sticky-sidebar-wrapper"
                >
                  <div
                    className="sticky-sidebar"
                    data-sticky-options="{'bottom': 50}"
                  >
                    <div className="summary pt-5">
                      <h3 className="title title-simple text-left text-uppercase">
                        Your Order
                      </h3>
                      <table className="order-table">
                        <thead>
                          <tr>
                            <th>Product</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {cartList.map((item, index) => (
                            <tr key={"checkout-" + item.title + "-" + index}>
                              <td className="product-name">
                                {item.title}{" "}
                                <span className="product-quantity">
                                  ×&nbsp;{item.qty}
                                </span>
                              </td>
                              <td className="product-total text-body">
                                ₹{toDecimal(item.price * item.qty)}
                              </td>
                            </tr>
                          ))}

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
                                  <h4 className="summary-subtitle">Coupons</h4>
                                  <p>
                                    <span className="d-flex">
                                      <span className="mr-1">
                                        {appliedCoupon.code}
                                      </span>
                                      <ALink
                                        key={appliedCoupon.id}
                                        href="#"
                                        className="product-remove"
                                        title="Remove coupon"
                                        onClick={() => removeCoupon()}
                                      >
                                        <i className="fas fa-times"></i>
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
                                className={"avg-delivery-lable-container mt-3"}
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
                      <div className="payment accordion radio-type">
                        <h4 className="summary-subtitle ls-m pb-3">
                          Payment Methods
                        </h4>

                        <div className="checkbox-group">
                          <div className="card-header d-flex align-items-center">
                            <ALink
                              href="#"
                              className={`text-body text-normal ls-m mr-2 ${
                                isFirst ? "collapse" : ""
                              }`}
                              onClick={() => {
                                !isFirst && setFirst(!isFirst);
                              }}
                            >
                              Pay Online
                            </ALink>
                            <p className="extra-lable m-0">EXTRA 5% OFF</p>
                          </div>

                          <Collapse in={isFirst}>
                            <div className="card-wrapper">
                              <div className="card-body ls-m overflow-hidden">
                                Use credit/debit card, net-banking, UPI, wallets
                                to complete the payment.
                              </div>
                            </div>
                          </Collapse>

                          <div className="card-header">
                            <ALink
                              href="#"
                              className={`text-body text-normal ls-m ${
                                !isFirst ? "collapse" : ""
                              }`}
                              onClick={() => {
                                !codDisabled && isFirst && setFirst(!isFirst);
                              }}
                            >
                              Cash on delivery
                            </ALink>
                          </div>

                          <Collapse in={!isFirst}>
                            <div className="card-wrapper">
                              <div className="card-body ls-m overflow-hidden">
                                Pay in cash or pay in person at the time of
                                delivery with GPay/PayTM/PhonePe.
                              </div>
                            </div>
                          </Collapse>
                        </div>
                      </div>
                      {/* <div className="form-checkbox mt-4 mb-5">
                        <input
                          type="checkbox"
                          className="custom-checkbox"
                          id="terms-condition"
                          name="terms-condition"
                          required
                        />
                        <label
                          className="form-control-label"
                          htmlFor="terms-condition"
                        >
                          I have read and agree to the website{" "}
                          <ALink href="#">terms and conditions </ALink>*
                        </label>
                      </div> */}
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
                          <p className="summary-total-price ls-s text-primary">
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
                        <button
                          onClick={placeOrder}
                          className="btn btn-dark btn-rounded btn-order d-flex justify-content-center align-items-center"
                        >
                          Place Order
                          {loading && <div className="spin-loader ml-2" />}
                        </button>
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
                  href="/shop"
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
  };
}
const Component = connect(mapStateToProps, {
  emptyCart: cartActions.emptyCart,
  openLogin: modalActions.openPasswordlessModal,
  removeCoupon: cartActions.removeCoupon,
})(Checkout);

Component.hideFooter = true;
export default Component;
