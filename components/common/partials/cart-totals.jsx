import React, { useCallback } from "react";
import { connect } from "react-redux";

import { eventActions } from "~/store/events";
import { toDecimal } from "~/utils";
import { useCartTotal } from "~/utils/hooks/useCart";
import { alertToaster } from "~/utils/popupHelper";
import { Logger } from "aws-amplify";
import { useInventory } from "~/utils/hooks/useInventory";
import { modalActions } from "~/store/modal";
import { useGuestCheckout } from "~/utils/contexts/navbar";
import { useRouter } from "next/router";

const logger = new Logger("Cart");

function CartTotal({
  recordOutOfStock,
  openLogin,
  appliedCoupon,
  onProceedToCheckout,
  user,
  cartList,
  isSmall,
  setCartVisibility,
}) {
  const router = useRouter();

  const {
    totalItems,
    totalListingPrice,
    totalPrice,
    shippingTotal,
    couponTotal,
    cartGrandTotal,
    cartAmountSaved: totalSaved,
  } = useCartTotal();

  const guestCheckout = useGuestCheckout();

  const {
    ready: isInventoryCheckReady,
    success: isInventoryCheckSuccess,
    inventoryMapping,
    outOfStockItems,
  } = useInventory();

  const validateAndGoToCheckout = useCallback(() => {
    setCartVisibility(false);
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

  return (
    <div className="summary bg-white mb-7 border-bottom-none">
      <h3 className="summary-title text-left d-sm-none">Cart Totals</h3>
      <table className="shipping">
        <tbody>
          <tr className="summary-subtotal">
            <td>
              <h4 className="summary-subtitle lh-1">Subtotal</h4>
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
        </tbody>
      </table>
      <table className="total">
        <tbody>
          <tr className="summary-subtotal">
            <td>
              <h4 className="summary-subtitle font-weight-semi-bold  lh-1">
                Total <p className="m-0">Inclusive of all taxes</p>
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
              <div className={"avg-delivery-lable-container mt-3 mb-2"}>
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
      <div className={` ${!isSmall ? "d-sm-none" : "w-100 sticky-checkout bg-white "}`}>
        <button
          onClick={validateAndGoToCheckout}
          className={`btn btn-dark  btn-rounded btn-checkout w-100 font-weight-bold }`}
          disabled={!isInventoryCheckReady}
        >
          begin checkout
        </button>{" "}
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
  );
}

function mapStateToProps(state) {
  return {
    appliedCoupon: state.cart.coupon,
    user: state.user.data,
    cartList: state.cart.data ? state.cart.data : [],
  };
}
const Component = connect(mapStateToProps, {
  onProceedToCheckout: eventActions.proceedToCheckout,
  openLogin: modalActions.openPasswordlessModal,
  recordOutOfStock: eventActions.outOfStock,
  setCartVisibility: modalActions.setCartVisibility,
})(CartTotal);
export default Component;
