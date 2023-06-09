import React from "react";
import { connect } from "react-redux";
import { useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import ALink from "~/components/features/custom-link";
import Coupons from "~/components/features/coupon";
import { cartActions } from "~/store/cart";
import { modalActions } from "~/store/modal";
import { eventActions } from "~/store/events";
import { toDecimal } from "~/utils";
import { RightAngle } from "~/components/icons";
import CartProduct from "~/components/partials/cart/cart-product";
import { useInventory } from "~/utils/hooks/useInventory";
import { useCartTotal, useCartItems } from "~/utils/hooks/useCart";
import { alertToaster } from "~/utils/popupHelper";
import { Logger } from "aws-amplify";
import { useGuestCheckout } from "~/utils/contexts/navbar";

const logger = new Logger("Cart");

function Cart(props) {
  const {
    store,
    cartList,
    appliedCoupon,
    user,
    openLogin,
    viewCart,
    recordOutOfStock,
    onProceedToCheckout,
  } = props;

  const { name } = store;
  const router = useRouter();
  const cartItems = useCartItems();
  const {
    ready: isInventoryCheckReady,
    success: isInventoryCheckSuccess,
    inventoryMapping,
    outOfStockItems,
  } = useInventory();

  const guestCheckout = useGuestCheckout();

  useEffect(() => {
    viewCart();
    logger.verbose("View Cart");
  }, []);

  const {
    totalItems,
    totalListingPrice,
    totalPrice,
    shippingTotal,
    couponTotal,
    cartGrandTotal,
    cartAmountSaved: totalSaved,
  } = useCartTotal();

  const validateAndGoToCheckout = useCallback(() => {
    onProceedToCheckout();

    if (!isInventoryCheckSuccess) {
      recordOutOfStock(outOfStockItems, inventoryMapping);
      alertToaster("Please remove out of stock product from cart", "error");
      logger.error("Out of stock product found in cart");
      return false;
    }

    if (user || guestCheckout) {
      router.push("/pages/checkout");
      logger.verbose("Redirecting to checkout page");
      return true;
    }

    openLogin(true);
    logger.verbose("Opening login modal");
    return false;
  }, [
    user,
    guestCheckout,
    isInventoryCheckSuccess,
    appliedCoupon,
    cartList,
    outOfStockItems,
    inventoryMapping,
  ]);

  // const appliedCouponStatus = useMemo(
  //   () => getCouponDiscount(appliedCoupon, cartList),
  //   [appliedCoupon, cartList]
  // );

  return (
    <main className="main cart">
      <Head>
        <title>{name} | Cart</title>
      </Head>

      <h1 className="d-none">{name} - Cart</h1>

      <div className="page-content pt-lg-7 pt-2 pb-5 lh-default">
        <div className="step-by pr-4 pl-4 d-sm-none">
          <h3 className="title title-simple title-step active">
            <ALink href="#">1. Shopping Cart</ALink>
            <i>
              <RightAngle size={18} color="currentColor" />
            </i>
          </h3>
          <h3 className="title title-simple title-step">
            <ALink href="#">2. Checkout</ALink>
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
                    <div key={appliedCoupon?.id}>
                      {cartItems.map((item) => (
                        <CartProduct
                          key={`${item.itemKey}-${item.extraQty}`}
                          item={item}
                          outOfStock={
                            inventoryMapping &&
                            inventoryMapping[item.recordKey] < Number(item.qty)
                          }
                        />
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
                    <div className="summary bg-white mb-9">
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
                            <>
                              <tr className="summary-subtotal">
                                <td className="d-flex align-items-center no-wrap">
                                  <h4 className="summary-subtitle lh-1 ">
                                    Discounts
                                    <span> ({appliedCoupon.code})</span>
                                  </h4>
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
                                {shippingTotal < 50 && (
                                  <del className="summary-subtotal-listingprice mr-2">
                                    ₹{toDecimal(50)}
                                  </del>
                                )}
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
                              {!!totalSaved && (
                                <div className="summary-saving-lable-container mb-4">
                                  <p className="saving-lable">
                                    <span>{`₹${toDecimal(totalSaved)} `}</span>
                                    saved so far on this order
                                  </p>
                                </div>
                              )}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <button
                        onClick={validateAndGoToCheckout}
                        className="btn btn-dark d-sm-none btn-rounded btn-checkout w-100"
                        disabled={!isInventoryCheckReady}
                      >
                        Proceed to checkout
                      </button>
                      <div className="d-sm-show stick">
                        <div className=" d-sm-show stick-bottom-button">
                          <div className="lh-default">
                            <span>
                              {totalItems > 1
                                ? `${totalItems} Items`
                                : "1 Item"}
                            </span>
                            <p className="summary-total-price text-left ls-s">
                              ₹{toDecimal(cartGrandTotal)}
                            </p>
                          </div>

                          <button
                            onClick={validateAndGoToCheckout}
                            className="btn btn-dark btn-rounded  btn-checkout"
                            disabled={!isInventoryCheckReady}
                          >
                            Proceed to checkout
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </aside>
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
      </div>
    </main>
  );
}

function mapStateToProps(state) {
  return {
    store: state.system.store,
    cartList: state.cart.data ? state.cart.data : [],
    user: state.user.data,
    appliedCoupon: state.cart.coupon,
    featuredCoupons: state.system.featuredCoupon || [],
  };
}
const Component = connect(mapStateToProps, {
  removeCoupon: cartActions.removeCoupon,
  removeFromCart: cartActions.removeFromCart,
  updateCart: cartActions.updateCart,
  openLogin: modalActions.openPasswordlessModal,
  viewCart: eventActions.viewCart,
  recordOutOfStock: eventActions.outOfStock,
  onProceedToCheckout: eventActions.proceedToCheckout,
})(Cart);

Component.hideFooter = true;
Component.navbarConfig = { shippingTier: true, coupons: true };

export default Component;
