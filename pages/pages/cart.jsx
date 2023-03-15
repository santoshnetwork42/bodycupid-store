import { connect } from "react-redux";
import { useCallback, useEffect, useState } from "react";

import ALink from "~/components/features/custom-link";
import Quantity from "~/components/features/quantity";
import Coupons from "~/components/features/coupon";

import { cartActions } from "~/store/cart";
import { modalActions } from "~/store/modal";

import {
  toDecimal,
  getTotalPrice,
  getShippingPrice,
  getFinalPrice,
  getCouponTotal,
} from "~/utils";
import { getPublicImageURL } from "~/utils/getPublicImageUrl";
import { scrollWithOffset } from "~/utils/helper";

function Cart(props) {
  const {
    cartList,
    removeFromCart,
    updateCart,
    appliedCoupon,
    removeCoupon,
    user,
    openLogin,
  } = props;
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    setCartItems([...cartList]);
  }, [cartList]);

  const onChangeQty = (item, qty) => {
    if (qty) {
      const { id, variantId } = item;
      const cart = cartItems.map((item) => {
        return item.id === id && (!variantId || variantId === item.variantId)
          ? { ...item, qty: qty }
          : item;
      });
      updateCart(cart);
    } else {
      removeFromCart(item);
    }
  };

  // const compareItems = () => {
  //   if (cartItems.length !== cartList.length) return false;

  //   for (let index = 0; index < cartItems.length; index++) {
  //     if (cartItems[index].qty !== cartList[index].qty) return false;
  //   }

  //   return true;
  // };

  // const update = () => {
  //   if (!compareItems()) {
  //     updateCart(cartItems);
  //   }
  //   return true;
  // };

  const checkAuth = useCallback(() => {
    if (user) return true;
    openLogin(true);
    return false;
  }, [user]);

  return (
    <div className="main cart">
      <div className="page-content pt-7 pb-10">
        <div className="step-by pr-4 pl-4">
          <h3 className="title title-simple title-step active">
            <ALink href="#">1. Shopping Cart</ALink>
          </h3>
          <h3 className="title title-simple title-step">
            <ALink href={user ? "/pages/checkout" : "#"} onClick={checkAuth}>
              2. Checkout
            </ALink>
          </h3>
          <h3 className="title title-simple title-step">
            <ALink href="#">3. Order Complete</ALink>
          </h3>
        </div>

        <div className="container mt-7 mb-2">
          <div className="row">
            {cartItems.length > 0 ? (
              <>
                <div className="col-lg-8 col-md-12 pr-lg-4 mb-4">
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
                              onChangeQty={(qty) => onChangeQty(item, qty)}
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
                </div>
                <aside className="col-lg-4 sticky-sidebar-wrapper">
                  <div
                    className="sticky-sidebar"
                    data-sticky-options="{'bottom': 20}"
                  >
                    <Coupons />
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
                          {!!appliedCoupon && (
                            <>
                              <tr>
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
                                      getCouponTotal(appliedCoupon, cartItems)
                                    )}`}
                                  </p>
                                </td>
                              </tr>
                              <tr className="summary-subtotal">
                                <td colSpan={2}>
                                  <div className="summary-saving-lable-container mt-0 mb-3">
                                    <p className="saving-lable">
                                      You are saving{" "}
                                      <span>
                                        {`₹${toDecimal(
                                          getCouponTotal(
                                            appliedCoupon,
                                            cartItems
                                          )
                                        )}`}
                                      </span>{" "}
                                      on this order
                                    </p>
                                  </div>
                                </td>
                              </tr>
                            </>
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
                                ₹
                                {toDecimal(
                                  getFinalPrice(cartItems, appliedCoupon)
                                )}
                              </p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <ALink
                        onClick={checkAuth}
                        href={user ? "/pages/checkout" : "#"}
                        className="btn btn-dark d-sm-none btn-rounded btn-checkout"
                      >
                        Proceed to checkout
                      </ALink>
                      <div className="d-none stick-bottom-button d-sm-show">
                        <div>
                          <p className="summary-total-price text-left ls-s">
                            ₹
                            {toDecimal(getFinalPrice(cartItems, appliedCoupon))}
                          </p>
                          <ALink
                            onClick={() => {
                              scrollWithOffset("details", 65);
                            }}
                            className="text-underline"
                            href="#"
                          >
                            View details
                          </ALink>
                        </div>

                        <ALink
                          onClick={checkAuth}
                          href={user ? "/pages/checkout" : "#"}
                          className="btn btn-dark btn-rounded  btn-checkout"
                        >
                          Proceed to checkout
                        </ALink>
                      </div>
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
    appliedCoupon: state.cart.coupon,
  };
}

export default connect(mapStateToProps, {
  removeCoupon: cartActions.removeCoupon,
  removeFromCart: cartActions.removeFromCart,
  updateCart: cartActions.updateCart,
  openLogin: modalActions.openPasswordlessModal,
})(Cart);
