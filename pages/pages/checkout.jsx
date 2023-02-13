import { useCallback, useState } from "react";
import { connect } from "react-redux";
import Helmet from "react-helmet";
import { API } from "aws-amplify";
import Collapse from "react-bootstrap/Collapse";
import { useRouter } from "next/router";

import ALink from "~/components/features/custom-link";
import Card from "~/components/features/accordion/card";
import AuthView from "~/pages/pages/login";
import {
  createPayment,
  updateOrder,
} from "~/graphql/mutations";

import {
  toDecimal,
  getTotalPrice,
  getShippingPrice,
  getFinalPrice,
  getCouponTotal,
} from "~/utils";
import { cartActions } from "~/store/cart";
import Addresses from "~/components/common/addresses";

function Checkout(props) {
  const { cartList, user, emptyCart, coupons, order, updateCartOrder } = props;
  const router = useRouter();
  const [isFirst, setFirst] = useState(false);

  const placeOrder = useCallback(
    async (e) => {
      e.preventDefault();
      const authMode = user ? "AMAZON_COGNITO_USER_POOLS" : "API_KEY";
      await API.graphql({
        query: createPayment,
        variables: {
          input: {
            userId: user?.username || null,
            orderId: order?.id,
            method: isFirst ? "ONLINE" : "COD",
            amount: getFinalPrice(cartList, coupons),
          },
        },
        authMode,
      });
      router.push(`/order/${order?.id}`);
      await emptyCart();
      return false;
    },
    [order, user, isFirst, coupons]
  );

  const updateShippingAddress = useCallback(
    async (address) => {
      const authMode = user ? "AMAZON_COGNITO_USER_POOLS" : "API_KEY";
      const { id, ...restAddress } = address;
      const {
        data: { updateOrder: response },
      } = await API.graphql({
        query: updateOrder,
        variables: {
          input: {
            id: order?.id,
            userId: user?.username,
            shippingAddress: restAddress,
          },
        },
        authMode,
      });
      updateCartOrder({ ...response, shippingAddressId: id });
    },
    [order, user]
  );

  return (
    <main className="main checkout">
      <Helmet>
        <title>Wow React eCommerce Template | Checkout</title>
      </Helmet>

      <h1 className="d-none">Wow React eCommerce Template - Checkout</h1>

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
          {cartList.length > 0 && order ? (
            <>
              {!user && (
                <div className="card accordion">
                  <Card
                    type="parse"
                    title="<div class='alert alert-light alert-primary alert-icon mb-4 card-header'>
                            <i class='fas fa-exclamation-circle'></i> <span class='text-body'>Returning customer?</span> <a href='#' class='text-primary collapse'>Click here to login</a>
                        </div>"
                  >
                    <div className="alert-body collapsed">
                      <AuthView redirect={false} />
                    </div>
                  </Card>
                </div>
              )}
              {/* <div className="card accordion">
                <Card
                  title="
                                            <div class='alert alert-light alert-primary alert-icon mb-4 card-header'>
                                                <i class='fas fa-exclamation-circle'></i>
                                                <span class='text-body'>Have a coupon?</span>
                                                <a href='#' class='text-primary'>Click here to enter your code</a>
                                            </div>"
                  type="parse"
                >
                  <div className="alert-body mb-4 collapsed">
                    <p>If you have a coupon code, please apply it below.</p>
                    <form className="check-coupon-box d-flex">
                      <input
                        type="text"
                        name="coupon_code"
                        className="input-text form-control text-grey ls-m mr-4"
                        id="coupon_code"
                        placeholder="Coupon code"
                      />
                      <button
                        type="submit"
                        className="btn btn-dark btn-rounded btn-outline"
                      >
                        Apply Coupon
                      </button>
                    </form>
                  </div>
                </Card>
              </div> */}
              {/* <form className="form" onSubmit={placeOrder}> */}
              <div className="row">
                <div className="col-lg-7 mb-6 mb-lg-0 pr-lg-4">
                  <h3 className="title title-simple text-left text-uppercase">
                    Shipping Address
                  </h3>
                  <Addresses
                    selected={order?.shippingAddressId}
                    onSelect={updateShippingAddress}
                  />
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
                          {!!coupons?.length && (
                            <tr className="summary-subtotal">
                              <td>
                                <h4 className="summary-subtitle">Coupons</h4>
                                <p>
                                  {coupons.map((c) => (
                                    <div style={{ display: "flex" }}>
                                      <span className="mr-1">{c.code}</span>
                                    </div>
                                  ))}
                                </p>
                              </td>
                              <td>
                                <p className="summary-subtotal-price">
                                  {`₹${toDecimal(getCouponTotal(coupons))}`}
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
                                ₹{toDecimal(getFinalPrice(cartList, coupons))}
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
                                isFirst && setFirst(!isFirst);
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
    order: state.cart.order,
    cartList: state.cart.data ? state.cart.data : [],
    user: state.user.data,
    coupons: state.cart.coupons || [],
  };
}

export default connect(mapStateToProps, {
  emptyCart: cartActions.emptyCart,
  updateCartOrder: cartActions.updateOrder,
})(Checkout);
