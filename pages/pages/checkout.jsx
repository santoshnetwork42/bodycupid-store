import { useCallback, useState } from "react";
import { connect } from "react-redux";
import Helmet from "react-helmet";
import { useSetState } from "react-use";
import { API } from "aws-amplify";
import SlideToggle from "react-slide-toggle";
import Collapse from "react-bootstrap/Collapse";
import { useRouter } from "next/router";

import ALink from "~/components/features/custom-link";
import Card from "~/components/features/accordion/card";
import AuthView from "~/pages/pages/login";
import {
  createOrder,
  createOrderProduct,
  createPayment,
} from "~/graphql/mutations";

import {
  toDecimal,
  getTotalPrice,
  getShippingPrice,
  getFinalPrice,
} from "~/utils";
import { cartActions } from "~/store/cart";

function Checkout(props) {
  const { cartList, user, emptyCart } = props;
  const router = useRouter();
  const [isFirst, setFirst] = useState(false);
  const [billingAddress, setBillingAddress] = useSetState({
    firstName: user?.attributes?.name,
    lastName: user?.attributes?.given_name,
    phone: user?.attributes?.phone_number,
    email: user?.attributes?.email,
    country: "in",
    state: "",
    city: "",
    pinCode: "",
    landmark: "",
    address: "",
    location: "",
    area: "",
  });

  const placeOrder = useCallback(
    async (e) => {
      e.preventDefault();
      const authMode = user ? "AMAZON_COGNITO_USER_POOLS" : "API_KEY";
      const { firstName, lastName, ...restAddress } = billingAddress;
      const {
        data: {
          createOrder: { id: orderId },
        },
      } = await API.graphql({
        query: createOrder,
        variables: {
          input: {
            userId: user?.username,
            shippingAddress: {
              name: firstName + " " + lastName,
              ...restAddress,
            },
            CouponCodeId: null,
            totalShippingCharges: getShippingPrice(cartList),
            // orderDate,
            status: "PROCESSING",
          },
        },
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
              amount: getFinalPrice(cartList),
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
                quantity: p.qty,
                price: p.price,
              },
            },
            authMode,
          })
        ),
      ];

      await Promise.all(promise);

      router.push(`/order/${orderId}`);
      await emptyCart();
      return false;
    },
    [billingAddress, cartList, user, isFirst]
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
          {cartList.length > 0 ? (
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
              <div className="card accordion">
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
              </div>
              <form className="form" onSubmit={placeOrder}>
                <div className="row">
                  <div className="col-lg-7 mb-6 mb-lg-0 pr-lg-4">
                    <h3 className="title title-simple text-left text-uppercase">
                      Shipping Address
                    </h3>
                    <div className="row">
                      <div className="col-xs-6">
                        <label>First Name *</label>
                        <input
                          type="text"
                          className="form-control"
                          name="first-name"
                          required
                          value={billingAddress.firstName}
                          onChange={(e) =>
                            setBillingAddress({ firstName: e.target.value })
                          }
                        />
                      </div>
                      <div className="col-xs-6">
                        <label>Last Name *</label>
                        <input
                          type="text"
                          className="form-control"
                          name="last-name"
                          required
                          value={billingAddress.lastName}
                          onChange={(e) =>
                            setBillingAddress({ lastName: e.target.value })
                          }
                        />
                      </div>
                      <div className="col-xs-6">
                        <label>Phone *</label>
                        <input
                          type="tel"
                          className="form-control"
                          name="phone"
                          required
                          value={billingAddress.phone}
                          onChange={(e) =>
                            setBillingAddress({ phone: e.target.value })
                          }
                        />
                      </div>
                      <div className="col-xs-6">
                        <label>Email Address *</label>
                        <input
                          type="email"
                          className="form-control"
                          name="email-address"
                          required
                          value={billingAddress.email}
                          onChange={(e) =>
                            setBillingAddress({ email: e.target.value })
                          }
                        />
                      </div>
                    </div>
                    <label>Country / Region *</label>
                    <div className="select-box">
                      <select
                        name="country"
                        className="form-control"
                        defaultValue="in"
                        value={billingAddress.country}
                        onChange={(e) =>
                          setBillingAddress({ country: e.target.value })
                        }
                      >
                        <option value="in">India</option>
                        <option value="us">United States (US)</option>
                        <option value="uk"> United Kingdom</option>
                        <option value="fr">France</option>
                        <option value="aus">Austria</option>
                      </select>
                    </div>
                    <label>Street Address *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="address1"
                      required
                      placeholder="House number and street name"
                      value={billingAddress.address}
                      onChange={(e) =>
                        setBillingAddress({ address: e.target.value })
                      }
                    />
                    <input
                      type="text"
                      className="form-control"
                      name="address2"
                      placeholder="Apartment, suite, unit, etc. (optional)"
                      value={billingAddress.location}
                      onChange={(e) =>
                        setBillingAddress({ location: e.target.value })
                      }
                    />
                    <div className="row">
                      <div className="col-xs-6">
                        <label>Town / City *</label>
                        <input
                          type="text"
                          className="form-control"
                          name="city"
                          required
                          value={billingAddress.city}
                          onChange={(e) =>
                            setBillingAddress({ city: e.target.value })
                          }
                        />
                      </div>
                      <div className="col-xs-6">
                        <label>State *</label>
                        <input
                          type="text"
                          className="form-control"
                          name="state"
                          required
                          value={billingAddress.state}
                          onChange={(e) =>
                            setBillingAddress({ state: e.target.value })
                          }
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xs-6">
                        <label>Pincode *</label>
                        <input
                          type="text"
                          className="form-control"
                          name="pincode"
                          required
                          value={billingAddress.pinCode}
                          onChange={(e) =>
                            setBillingAddress({ pinCode: e.target.value })
                          }
                        />
                      </div>
                    </div>
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
                            <tr className="summary-total">
                              <td className="pb-0">
                                <h4 className="summary-subtitle">Total</h4>
                              </td>
                              <td className=" pt-0 pb-0">
                                <p className="summary-total-price ls-s text-primary">
                                  ₹{toDecimal(getFinalPrice(cartList))}
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
                                  Use credit/debit card, net-banking, UPI,
                                  wallets to complete the payment.
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
                        <div className="form-checkbox mt-4 mb-5">
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
                        </div>
                        <button
                          type="submit"
                          className="btn btn-dark btn-rounded btn-order"
                        >
                          Place Order
                        </button>
                      </div>
                    </div>
                  </aside>
                </div>
              </form>
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
  };
}

export default connect(mapStateToProps, {
  emptyCart: () => cartActions.updateCart([]),
})(Checkout);
