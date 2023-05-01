import React from "react";
import { connect } from "react-redux";
import { useCallback, useEffect, useMemo, useState } from "react";

import ALink from "~/components/features/custom-link";
import Coupons from "~/components/features/coupon";
import { cartActions } from "~/store/cart";
import { modalActions } from "~/store/modal";
import { eventActions } from "~/store/events";
import { toDecimal, getCartTotals } from "~/utils";
import { systemActions } from "~/store/system";
import { RightAngle } from "~/components/icons";
import CartProduct from "~/components/partials/cart/cart-product";

function Cart(props) {
  const {
    cartList,
    appliedCoupon,
    user,
    openLogin,
    shippingTiers,
    getShippingTiers,
    viewCart,
  } = props;

  useEffect(() => {
    viewCart();
    getShippingTiers();
  }, []);

  const cartItems = useMemo(() => {
    if (appliedCoupon?.couponType === "BOGO") {
      const totalQty = cartList.reduce((a, b) => a + b.qty, 0);
      if (totalQty > 1) {
        const item = cartList.reduce((prev, curr) => {
          return prev.price < curr.price ? prev : curr;
        });

        if (item.price > appliedCoupon.minOrderValue) {
          return [...cartList].map((c) =>
            c.id === item.id ? { ...c, isBogo: true } : c
          );
        }
      }
    }

    return cartList;
  }, [cartList, appliedCoupon]);

  const {
    totalListingprice,
    totalPrice,
    shippingTotal,
    couponTotal,
    cartGrandTotal,
    cartAmmountSaved,
  } = useMemo(
    () => getCartTotals(cartItems, appliedCoupon, shippingTiers),
    [cartItems, appliedCoupon, shippingTiers]
  );

  const checkAuth = useCallback(() => {
    if (user) return true;
    openLogin(true);
    return false;
  }, [user]);

  return (
    <main className="main cart">
      <div className="page-content pt-7 pb-5 lh-default">
        <div className="step-by pr-4 pl-4 d-sm-none">
          <h3 className="title title-simple title-step active">
            <ALink href="#">1. Shopping Cart</ALink>
            <i>
              <RightAngle size={18} color="currentColor" />
            </i>
          </h3>
          <h3 className="title title-simple title-step">
            <ALink href={user ? "/pages/checkout" : "#"} onClick={checkAuth}>
              2. Checkout
            </ALink>
            <i>
              <RightAngle size={18} color="currentColor" />
            </i>
          </h3>
          <h3 className="title title-simple title-step">
            <ALink href="#">3. Order Complete</ALink>
          </h3>
        </div>

        <div className="container p-0 sm-container mt-7 mb-2 ">
          <div className="row">
            {cartItems.length > 0 ? (
              <>
                <div className="col-lg-8 col-md-12 ">
                  <div className="shop-table cart-table lh-default ">
                    <div>
                      {cartItems.map((item) => (
                        <React.Fragment key={`${item.recordKey}-cart-item`}>
                          {item.isBogo ? (
                            <>
                              {item.qty > 1 && (
                                <CartProduct
                                  key={`${item.recordKey}-primary`}
                                  item={{
                                    ...item,
                                    qty: item.qty - 1,
                                    bogo: "PRIMARY",
                                  }}
                                />
                              )}
                              <CartProduct
                                key={`${item.recordKey}-secondary`}
                                item={{ ...item, bogo: "SECONDARY" }}
                              />
                            </>
                          ) : (
                            <CartProduct key={item.recordKey} item={item} />
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>

                <aside
                  id="cart-details "
                  className="col-lg-4 text-primary sticky-sidebar-wrapper"
                >
                  <div
                    className="sticky-sidebar"
                    data-sticky-options="{'bottom': 20}"
                  >
                    <Coupons />
                    <div className="summary bg-white">
                      <h3 className="summary-title text-left d-sm-none">
                        Cart Totals
                      </h3>
                      <table className="shipping">
                        <tbody>
                          <tr className="summary-subtotal">
                            <td>
                              <h4 className="summary-subtitle lh-1">
                                Subtotal
                              </h4>
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
                              <tr className="summary-subtotal">
                                <td className="d-flex align-items-center">
                                  <h4 className="summary-subtitle lh-1">
                                    Discounts
                                  </h4>
                                  &nbsp; ( {appliedCoupon.code})
                                </td>
                                <td>
                                  <p className="summary-subtotal-price discount-price-color">
                                    -{`₹${toDecimal(couponTotal)}`}
                                  </p>
                                </td>
                              </tr>
                            </>
                          )}

                          <tr className="summary-subtotal">
                            <td>
                              <h4 className="summary-subtitle lh-1">
                                Shipping
                              </h4>
                            </td>
                            <td>
                              <p
                                className={`summary-subtotal-price ${
                                  !shippingTotal && "discount-price-color"
                                }`}
                              >
                                {!!shippingTotal
                                  ? `₹${toDecimal(shippingTotal)}`
                                  : "FREE"}
                              </p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table className="total">
                        <tbody>
                          <tr className="summary-subtotal">
                            <td>
                              <h4 className="summary-subtitle font-weight-semi-bold  lh-1">
                                Total{" "}
                                <p className="m-0">Inclusive of all taxes</p>
                              </h4>
                            </td>
                            <td>
                              <p className="summary-total-price font-weight-semi-bold  ls-s">
                                ₹{toDecimal(cartGrandTotal)}
                              </p>
                            </td>
                          </tr>
                          <tr>
                            <td colSpan={2}>
                              <div
                                className={
                                  "avg-delivery-lable-container mt-3 mb-2"
                                }
                              >
                                <p className="m-0">
                                  Average delivery time: <span>3-5 days</span>
                                </p>
                              </div>
                              {!!cartAmmountSaved && (
                                <div className="summary-saving-lable-container mb-4">
                                  <p className="saving-lable">
                                    <span>{`₹${toDecimal(
                                      cartAmmountSaved
                                    )} `}</span>
                                    saved so far on this order
                                  </p>
                                </div>
                              )}
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
                        <div className="lh-2">
                          <p className="summary-total-price text-left ls-s">
                            ₹{toDecimal(cartGrandTotal)}
                          </p>
                          <ALink
                            onClick={() => {
                              scrollWithOffset("cart-details", 130);
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
                    href="/collections/all"
                  >
                    Return to shop
                  </ALink>
                </p>
              </div>
            )}
          </div>
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
    shippingTiers: state.system.shippingTiers,
  };
}
const Component = connect(mapStateToProps, {
  removeCoupon: cartActions.removeCoupon,
  removeFromCart: cartActions.removeFromCart,
  updateCart: cartActions.updateCart,
  openLogin: modalActions.openPasswordlessModal,
  getShippingTiers: systemActions.getShippingTiers,
  viewCart: eventActions.viewCart,
})(Cart);

Component.hideFooter = true;

export default Component;
