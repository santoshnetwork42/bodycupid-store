import React, { useCallback, useRef } from "react";
import { connect } from "react-redux";
import { Logger } from "aws-amplify";
import { useRouter } from "next/router";
import { useCartTotal, useConfiguration } from "@wow-star/utils";

import { eventActions } from "~/store/events";
import { toDecimal } from "~/utils";
import { alertToaster } from "~/utils/popupHelper";
import { modalActions } from "~/store/modal";
import { useGuestCheckout } from "~/utils/contexts/navbar";
import Coupon from "~/components/features/coupon";
import { useWindowDimensions } from "~/utils/getWindowDimension";
import { PREPAID_ENABLED } from "~/constant";

const logger = new Logger("Cart");

function CartTotal({
  recordOutOfStock,
  openLogin,
  appliedCoupon,
  onProceedToCheckout,
  user,
  customUser,
  cartList,
  isSmall,
  setCartVisibility,
  inventory,
  startCheckout,
}) {
  const router = useRouter();
  const { isSmallSize } = useWindowDimensions();
  const prepaidEnabled = useConfiguration(PREPAID_ENABLED, true);

  const {
    totalItems,
    totalListingPrice,
    totalPrice,
    shippingTotal,
    couponTotal,
    cartGrandTotal,
    prepaidDiscount,
    prepaidDiscountPercent,
    prepaidGrandTotal,
    totalAmountSaved,
    codCharges,
    appliedCODCharges,
  } = useCartTotal({
    paymentType: prepaidEnabled ? "PREPAID" : "COD",
  });

  const guestCheckout = useGuestCheckout();
  const avgDeliveryTimeRef = useRef(null);

  const {
    ready: isInventoryCheckReady,
    success: isInventoryCheckSuccess,
    inventoryMapping,
    outOfStockItems,
  } = inventory || {};

  const validateAndGoToCheckout = useCallback(() => {
    setCartVisibility(false);
    onProceedToCheckout();

    if (!isInventoryCheckSuccess) {
      recordOutOfStock(outOfStockItems, inventoryMapping);
      alertToaster("Please remove out of stock product from cart", "error");
      logger.error("Out of stock product found in cart");
      return false;
    }

    // startCheckout();

    if (user || guestCheckout || customUser) {
      router.push("/pages/checkout");
      logger.verbose("Redirecting to checkout page");
      return true;
    }

    openLogin(true, true);
    logger.verbose("Opening login modal");
    return false;
  }, [
    user,
    guestCheckout,
    customUser,
    isInventoryCheckSuccess,
    appliedCoupon,
    cartList,
    outOfStockItems,
    inventoryMapping,
  ]);

  const onDetailClick = () => {
    if (avgDeliveryTimeRef.current) {
      avgDeliveryTimeRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="border-none cart-total-container">
      <h3 className="summary-title summary-title2 text-left font-weight-bold pt-2 bg-white">
        Payment Summary
      </h3>
      <div
        className={`${appliedCoupon ? "table-margin-applied" : "table-margin"}`}
      >
        <div className="summary summary2 bg-white">
          <table className="shipping">
            <tbody>
              <tr className="summary-subtotal">
                <td>
                  <h4 className="summary-subtitle lh-1">Cart MRP</h4>
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
                        <span className="font-weight-bold">
                          {" "}
                          ({appliedCoupon.code})
                        </span>
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
                  <h4 className="summary-subtitle lh-1">Shipping</h4>
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
                    {!!shippingTotal ? `₹${toDecimal(shippingTotal)}` : "FREE"}
                  </p>
                </td>
              </tr>

              {!!codCharges && (
                <tr className="summary-subtotal">
                  <td>
                    <h4 className="summary-subtitle">COD Charges</h4>
                  </td>
                  <td
                    className={`summary-subtotal-price pb-0 pt-0 ${
                      !appliedCODCharges && "discount-price-color"
                    }`}
                  >
                    {!appliedCODCharges && (
                      <del className="summary-subtotal-listingprice mr-2">
                        ₹{toDecimal(codCharges)}
                      </del>
                    )}
                    {!!appliedCODCharges
                      ? `₹${toDecimal(appliedCODCharges)}`
                      : "Free"}
                    &nbsp;
                  </td>
                </tr>
              )}

              {prepaidDiscount > 0 && (
                <tr className="summary-subtotal">
                  <td>
                    <h4 className="summary-subtitle lh-1">
                      {prepaidDiscountPercent}% Online Payment Discount
                    </h4>
                  </td>
                  <td>
                    <p className="summary-subtotal-price discount-price-color">
                      -{`₹${toDecimal(prepaidDiscount)}`}
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <table className="total">
            <tbody>
              <tr className="summary-subtotal border-bottom-none">
                <td>
                  <h4 className="summary-subtitle font-weight-bold  lh-1">
                    Total <p className="m-0">Inclusive of all taxes</p>
                  </h4>
                </td>
                <td className="td-alignment">
                  <p className="summary-total-price summary-total-price-2 font-weight-bold  ls-s">
                    ₹{toDecimal(prepaidGrandTotal)}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div
          className={"mt-3 pt-1 pb-1 mb-3 avg-delivery-container"}
          id="avg-delivery-time"
          ref={avgDeliveryTimeRef}
        >
          <p className="m-0 font-weight-bold">
            Average delivery time: <span>3-5 days</span>
          </p>
        </div>
      </div>

      <div id="sidebar-footer" className="sidebar-footer p-0 box-shadow-coupon">
        <Coupon isSmall />
        <div>
          {!!totalAmountSaved && (
            <div className="summary-saving-lable-container m-0 text-center border-top">
              <p
                className={`saving-lable background-alice ${
                  isSmallSize ? "label-size" : ""
                }`}
              >
                🎊 Congrats!
                <span> You saved {`₹${toDecimal(totalAmountSaved)} `}</span>
              </p>
            </div>
          )}
        </div>
        <div className="cart-sticky-checkout">
          <div className="d-flex">
            <div className="flex-45">
              <div className="cart-totals">
                {" "}
                ₹{toDecimal(prepaidGrandTotal)}
              </div>
              {!!totalAmountSaved && (
                <div
                  className="summary-saving-lable-container m-0 p-0"
                  onClick={onDetailClick}
                >
                  <p className={"m-0 font-size-12"}>
                    <strong>View details</strong>
                  </p>
                </div>
              )}
            </div>
            <button
              onClick={validateAndGoToCheckout}
              className={`btn btn-product btn-primary btn-rounded btn-checkout w-100 font-weight-bolder flex-60`}
              disabled={!isInventoryCheckReady}
            >
              begin checkout
            </button>
          </div>
        </div>

        {!isSmall && (
          <div className="d-sm-show stick">
            <div className=" d-sm-show stick-bottom-button">
              <div className="lh-default">
                <span>{totalItems > 1 ? `${totalItems} Items` : "1 Item"}</span>
                <p className="summary-total-price text-left ls-s">
                  ₹{toDecimal(cartGrandTotal)}
                </p>
              </div>

              <button
                onClick={validateAndGoToCheckout}
                className="btn btn-dark btn-rounded font-weight-bold btn-checkout"
                disabled={!isInventoryCheckReady}
              >
                begin checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    appliedCoupon: state.cart.coupon,
    user: state.user.data,
    customUser: !!state.user.custom,
    cartList: state.cart.data ? state.cart.data : [],
  };
}
const Component = connect(mapStateToProps, {
  onProceedToCheckout: eventActions.proceedToCheckout,
  openLogin: modalActions.openPasswordlessModal,
  recordOutOfStock: eventActions.outOfStock,
  setCartVisibility: modalActions.setCartVisibility,
  startCheckout: eventActions.startCheckout,
})(CartTotal);
export default Component;
