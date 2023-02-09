import { connect } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { API } from "aws-amplify";

import ALink from "~/components/features/custom-link";
import Quantity from "~/components/features/quantity";

import { cartActions } from "~/store/cart";

import {
  toDecimal,
  getTotalPrice,
  getShippingPrice,
  getFinalPrice,
  getCouponTotal,
} from "~/utils";
import { getPublicImageURL } from "~/utils/getPublicImageUrl";
import { applyCoupn } from "~/graphql/queries";

function Cart(props) {
  const {
    cartList,
    user,
    coupons,
    removeFromCart,
    updateCart,
    applyCoupon,
    removeCoupon,
  } = props;
  const [cartItems, setCartItems] = useState([]);
  const [coupon, setCoupon] = useState("");

  useEffect(() => {
    setCartItems([...cartList]);
  }, [cartList]);

  const onChangeQty = (id, qty) => {
    setCartItems(
      cartItems.map((item) => {
        return item.id === id ? { ...item, qty: qty } : item;
      })
    );
  };

  const compareItems = () => {
    if (cartItems.length !== cartList.length) return false;

    for (let index = 0; index < cartItems.length; index++) {
      if (cartItems[index].qty !== cartList[index].qty) return false;
    }

    return true;
  };

  const update = () => {
    updateCart(cartItems);
  };

  const applyCouponCode = useCallback(async () => {
    const response = await API.graphql({
      query: applyCoupn,
      variables: { code: coupon },
      authMode: user ? "AMAZON_COGNITO_USER_POOLS" : "API_KEY",
    });

    if (response.data.applyCoupn) {
      setCoupon("");
      applyCoupon(response.data.applyCoupn);
    }
  }, [coupon, user]);

  return (
    <div className="main cart">
      <div className="page-content pt-7 pb-10">
        <div className="step-by pr-4 pl-4">
          <h3 className="title title-simple title-step active">
            <ALink href="#">1. Shopping Cart</ALink>
          </h3>
          <h3 className="title title-simple title-step">
            <ALink href="/pages/checkout">2. Checkout</ALink>
          </h3>
          <h3 className="title title-simple title-step">
            <ALink href="/pages/order">3. Order Complete</ALink>
          </h3>
        </div>

        <div className="container mt-7 mb-2">
          <div className="row">
            {cartItems.length > 0 ? (
              <>
                <div className="col-lg-8 col-md-12 pr-lg-4">
                  <table className="shop-table cart-table">
                    <thead>
                      <tr>
                        <th>
                          <span>Product</span>
                        </th>
                        <th></th>
                        <th>
                          <span>Price</span>
                        </th>
                        <th>
                          <span>quantity</span>
                        </th>
                        <th>Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((item) => (
                        <tr key={"cart" + item.title}>
                          <td className="product-thumbnail">
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
                          </td>
                          <td className="product-name">
                            <div className="product-name-section">
                              <ALink href={"/product/" + item.slug}>
                                {item.title}
                              </ALink>
                            </div>
                          </td>
                          <td className="product-subtotal">
                            <span className="amount">
                              ₹{toDecimal(item.price)}
                            </span>
                          </td>

                          <td className="product-quantity">
                            <Quantity
                              product={item}
                              qty={item.qty}
                              max={item.inventory}
                              onChangeQty={(qty) => onChangeQty(item.id, qty)}
                            />
                          </td>
                          <td className="product-price">
                            <span className="amount">
                              ₹{toDecimal(item.price * item.qty)}
                            </span>
                          </td>
                          <td className="product-close">
                            <ALink
                              href="#"
                              className="product-remove"
                              title="Remove this product"
                              onClick={() => removeFromCart(item)}
                            >
                              <i className="fas fa-times"></i>
                            </ALink>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="cart-actions mb-6 pt-4">
                    <ALink
                      href="/shop"
                      className="btn btn-dark btn-md btn-rounded btn-icon-left mr-4 mb-4"
                    >
                      <i className="d-icon-arrow-left"></i>Continue Shopping
                    </ALink>
                    <button
                      type="submit"
                      className={`btn btn-outline btn-dark btn-md btn-rounded ${
                        compareItems() ? " btn-disabled" : ""
                      }`}
                      onClick={update}
                    >
                      Update Cart
                    </button>
                  </div>
                  <div className="cart-coupon-box mb-8">
                    <h4 className="title coupon-title text-uppercase ls-m">
                      Coupon Discount
                    </h4>
                    <input
                      type="text"
                      name="coupon_code"
                      className="input-text form-control text-grey ls-m mb-4"
                      id="coupon_code"
                      placeholder="Enter coupon code here..."
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                    />
                    <button
                      onClick={applyCouponCode}
                      className="btn btn-md btn-dark btn-rounded btn-outline"
                    >
                      Apply Coupon
                    </button>
                  </div>
                </div>
                <aside className="col-lg-4 sticky-sidebar-wrapper">
                  <div
                    className="sticky-sidebar"
                    data-sticky-options="{'bottom': 20}"
                  >
                    <div className="summary mb-4">
                      <h3 className="summary-title text-left">Cart Totals</h3>
                      <table className="shipping">
                        <tbody>
                          <tr className="summary-subtotal">
                            <td>
                              <h4 className="summary-subtitle">Subtotal</h4>
                            </td>
                            <td>
                              <p className="summary-subtotal-price">
                                ₹{toDecimal(getTotalPrice(cartItems))}
                              </p>
                            </td>
                          </tr>
                          <tr className="summary-subtotal">
                            <td>
                              <h4 className="summary-subtitle">Shipping</h4>
                            </td>
                            <td>
                              <p className="summary-subtotal-price">
                                {getShippingPrice(cartItems)
                                  ? `₹${toDecimal(getShippingPrice(cartItems))}`
                                  : "FREE"}
                              </p>
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
                                      <ALink
                                        key={c.id}
                                        href="#"
                                        className="product-remove"
                                        title="Remove coupon"
                                        onClick={() => removeCoupon(c.id)}
                                      >
                                        <i className="fas fa-times"></i>
                                      </ALink>
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
                        </tbody>
                      </table>
                      <table className="total">
                        <tbody>
                          <tr className="summary-subtotal">
                            <td>
                              <h4 className="summary-subtitle">Total</h4>
                            </td>
                            <td>
                              <p className="summary-total-price ls-s">
                                ₹{toDecimal(getFinalPrice(cartItems, coupons))}
                              </p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <ALink
                        href="/pages/checkout"
                        className="btn btn-dark btn-rounded btn-checkout"
                      >
                        Proceed to checkout
                      </ALink>
                    </div>
                  </div>
                </aside>
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
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    cartList: state.cart.data ? state.cart.data : [],
    user: state.user.data,
    coupons: state.cart.coupons || [],
  };
}

export default connect(mapStateToProps, {
  removeFromCart: cartActions.removeFromCart,
  updateCart: cartActions.updateCart,
  applyCoupon: cartActions.applyCoupon,
  removeCoupon: cartActions.removeCoupon,
})(Cart);
