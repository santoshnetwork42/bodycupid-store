import { useCallback, useMemo, useState } from "react";
import { connect } from "react-redux";
import Head from "next/head";
import { API } from "aws-amplify";
import Collapse from "react-bootstrap/Collapse";
import { useRouter } from "next/router";

import ALink from "~/components/features/custom-link";
import { createPayment, createOrder, createOrderProduct } from "~/graphql/api";
import { createUserAddress } from "~/graphql/mutations";
import {
  toDecimal,
  getTotalPrice,
  getShippingPrice,
  getFinalPrice,
  getCouponTotal,
} from "~/utils";
import { cartActions } from "~/store/cart";
import { modalActions } from "~/store/modal";
import Addresses from "~/components/common/addresses";
import Coupons from "~/components/features/coupon";

function Checkout(props) {
  const { cartList, user, emptyCart, appliedCoupon, openLogin, removeCoupon } =
    props;

  const router = useRouter();
  const [isFirst, setFirst] = useState(true);
  const [shippingAddress, setAddress] = useState(null);

  const placeOrder = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        const { id: ignoreId, ...restAddress } = shippingAddress;
        const authMode = user ? "AMAZON_COGNITO_USER_POOLS" : "API_KEY";
        const payload = {
          userId: user?.username,
          status: "CONFIRMED",
          totalAmount: getFinalPrice(cartList, appliedCoupon),
          totalDiscount: getCouponTotal(appliedCoupon, cartList),
          totalShippingCharges: getShippingPrice(cartList),
          orderDate: new Date().toISOString(),
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
                userId: user?.username,
                orderId,
                method: isFirst ? "ONLINE" : "COD",
                amount: getFinalPrice(cartList, appliedCoupon),
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

        if (user) {
          promise.push(
            API.graphql({
              query: createUserAddress,
              variables: { input: { ...restAddress, userID: user.username } },
              authMode: "AMAZON_COGNITO_USER_POOLS",
            })
          );
        }

        await Promise.all(promise);
        await emptyCart();
        await router.push(`/order/${orderId}`);
      } catch (e) {
        console.log("e", e);
      }

      return false;
    },
    [user, isFirst, appliedCoupon, shippingAddress, cartList]
  );

  const codDisabled = useMemo(
    () => appliedCoupon?.couponType === "ONLINE",
    [appliedCoupon]
  );

  return (
    <main className="main checkout">
      <Head>
        <title>Wow life science | Checkout</title>
      </Head>

      <h1 className="d-none">Wow life science - Checkout</h1>

      <div
        className={`page-content pt-7 pb-10 ${
          cartList.length > 0 ? "mb-10" : "mb-2"
        }`}
      >
        <div className="step-by pr-4 pl-4">
          <h3 className="title title-simple title-step">
            <ALink href="/pages/cart">1. Shopping Cart</ALink>
          </h3>
          <h3 className="title title-simple title-step active">
            <ALink href="#">2. Checkout</ALink>
          </h3>
          <h3 className="title title-simple title-step">3. Order Complete</h3>
        </div>
        <div className="container mt-7">
          {cartList.length > 0 ? (
            <>
              {!user && (
                <div className="card accordion">
                  <div className="alert alert-light alert-primary alert-icon mb-4 card-header">
                    <i className="fas fa-exclamation-circle"></i>{" "}
                    <span className="text-body">Returning customer?</span>{" "}
                    <ALink
                      href="#"
                      onClick={() => openLogin(false)}
                      className="text-primary collapse"
                    >
                      Click here to login
                    </ALink>
                  </div>
                </div>
              )}
              {!appliedCoupon && <Coupons layout="checkout" />}
              {/* <form className="form" onSubmit={placeOrder}> */}
              <div className="row">
                <div className="col-lg-7 mb-6 mb-lg-0 pr-lg-4">
                  <h3 className="title title-simple text-left text-uppercase">
                    Shipping Address
                  </h3>
                  <Addresses onAddressChange={setAddress} />
                </div>

                <aside className="col-lg-5 sticky-sidebar-wrapper">
                  <div
                    className="sticky-sidebar mt-1"
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
                          {cartList.map((item) => (
                            <tr key={"checkout-" + item.title}>
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
                            <td className="summary-subtotal-price pb-0 pt-0">
                              ₹{toDecimal(getTotalPrice(cartList))}
                            </td>
                          </tr>
                          <tr className="summary-subtotal">
                            <td>
                              <h4 className="summary-subtitle">Shipping</h4>
                            </td>
                            <td className="summary-subtotal-price pb-0 pt-0">
                              {getShippingPrice(cartList)
                                ? `₹${toDecimal(getShippingPrice(cartList))}`
                                : "Free"}
                            </td>
                          </tr>
                          {!!appliedCoupon && (
                            <tr className="summary-subtotal">
                              <td>
                                <h4 className="summary-subtitle">Coupons</h4>
                                <p>
                                  <div className="d-flex">
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
                                  </div>
                                </p>
                              </td>
                              <td>
                                <p className="summary-subtotal-price">
                                  {`₹${toDecimal(
                                    getCouponTotal(appliedCoupon, cartList)
                                  )}`}
                                </p>
                              </td>
                            </tr>
                          )}
                          <tr className="summary-total">
                            <td className="pb-0">
                              <h4 className="summary-subtitle">Total</h4>
                            </td>
                            <td className=" pt-0 pb-0">
                              <p className="summary-total-price ls-s text-primary">
                                ₹
                                {toDecimal(
                                  getFinalPrice(cartList, appliedCoupon)
                                )}
                              </p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <div className="payment accordion radio-type">
                        <h4 className="summary-subtitle ls-m pb-3">
                          Payment Methods
                        </h4>

                        <div className="checkbox-group">
                          <div className="card-header">
                            <ALink
                              href="#"
                              className={`text-body text-normal ls-m ${
                                isFirst ? "collapse" : ""
                              }`}
                              onClick={() => {
                                !isFirst && setFirst(!isFirst);
                              }}
                            >
                              Pay Online
                            </ALink>
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
                      <button
                        onClick={placeOrder}
                        className="btn btn-dark btn-rounded btn-order"
                      >
                        Place Order
                      </button>
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
    </main>
  );
}

function mapStateToProps(state) {
  return {
    cartList: state.cart.data ? state.cart.data : [],
    user: state.user.data,
    appliedCoupon: state.cart.coupon,
  };
}

export default connect(mapStateToProps, {
  emptyCart: cartActions.emptyCart,
  openLogin: modalActions.openLoginModal,
  removeCoupon: cartActions.removeCoupon,
})(Checkout);
