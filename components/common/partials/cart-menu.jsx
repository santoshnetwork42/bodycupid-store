import { useCartItems, useCartTotal, useInventory } from "@wow-star/utils";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { connect } from "react-redux";
import { Logger } from "aws-amplify";

import CouponDiscountBar from "~/components/common/coupon-discount-bar";
import CartTotal from "~/components/common/partials/cart-totals";
import ALink from "~/components/features/custom-link";
import { Bag, Cart, Cross } from "~/components/icons";
import CartProduct from "~/components/partials/cart/cart-product";
import { cartActions } from "~/store/cart";
import { eventActions } from "~/store/events";
import { modalActions } from "~/store/modal";
import { getTotalPrice, toDecimal } from "~/utils";
import { useNavBarState } from "~/utils/contexts/navbar";

const logger = new Logger("Cart");

function CartMenu(props) {
  const {
    cartList,
    appliedCoupon,
    isCartOpen,
    setCartVisibility,
    viewCart,
    validateCart,
  } = props;

  const router = useRouter();
  const cartItems = useCartItems({
    showLTOProducts: false,
    showNonApplicableFreeProducts: true,
  });

  const inventory = useInventory({ validateCart });
  const { isRewardApplied } = useNavBarState();

  const { totalItems } = useCartTotal({
    paymentType: "PREPAID",
    isRewardApplied: isRewardApplied,
  });

  const { inventoryMapping } = inventory;

  useEffect(() => {
    viewCart();
    logger.verbose("View Cart");
  }, []);

  useEffect(() => {
    if (isCartOpen) {
      document.body.classList.add("overflow-hidden");
      viewCart();
      if (!document.querySelector(".side-bar").classList.contains("opened"))
        document.querySelector(".side-bar").classList.add("opened");
    } else {
      if (document.querySelector(".side-bar").classList.contains("opened"))
        document.querySelector(".side-bar").classList.remove("opened");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isCartOpen]);

  useEffect(() => {
    setCartVisibility(false);
  }, [router.asPath]);

  return (
    <div className=" side-bar  d-flex align-items-center p-unset mr-0 mr-lg-2">
      <ALink
        href="#"
        className="cart-toggle label-block link p-relative"
        onClick={() => {
          setCartVisibility(true);
        }}
      >
        <div className="cart-label d-lg-show">
          <span className="cart-name">Shopping Cart:</span>
          <span className="cart-price">
            ₹{toDecimal(getTotalPrice(cartList))}
          </span>
        </div>
        <Bag />
        <span className="cart-count">{totalItems}</span>
      </ALink>
      <div
        className="sidebar-overlay"
        onClick={() => {
          setCartVisibility(false);
        }}
      ></div>
      <div className="sidebar-box">
        <div className="sidebar-header wrapper">
          <div className="d-flex align-items-center">
            <Cart />
            <h4 className="cart-title ml-2">Shopping Cart ({totalItems})</h4>
          </div>
          <ALink
            href="#"
            className=" mb-0 "
            onClick={() => {
              setCartVisibility(false);
            }}
          >
            <Cross size={24} />
          </ALink>
        </div>
        <div className="">
          <div className="sidebar-products p-relative">
            {cartItems.length > 0 ? (
              <>
                <div className=" ">
                  <CouponDiscountBar />
                  <div className="shop-table cart-table lh-default sidebar-padding mt-4">
                    <div key={appliedCoupon?.id}>
                      {cartItems.map((item) => (
                        <CartProduct
                          isSmall
                          key={`${item.itemKey}-${item.extraQty}`}
                          item={item}
                          inventory={(inventoryMapping || {})[item.recordKey]}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <aside
                  id="cart-details"
                  className="text-primary sticky-sidebar-wrapper pb-6 sidebar-padding"
                >
                  <div
                    className="sticky-sidebar"
                    data-sticky-options="{'bottom': 20}"
                  >
                    <CartTotal isSmall inventory={inventory} />
                  </div>
                </aside>
              </>
            ) : (
              <div className="empty-cart text-center">
                <p className="mt-2 text-black font-weight-bold">
                  Your cart is currently empty.
                </p>
                <i className="cart-empty d-icon-bag"></i>
                <p className="return-to-shop mr-3 ml-3  mb-0">
                  <ALink
                    className="button wc-backward d-flex justify-content-center btn btn-dark btn-md"
                    href="/collections/all"
                    onClick={() => {
                      setCartVisibility(false);
                    }}
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
    cartList: state.cart.data || [],
    user: state.user.data,
    appliedCoupon: state.cart.coupon,
    isCartOpen: state.modal.openCart,
  };
}

export default connect(mapStateToProps, {
  removeFromCart: cartActions.removeFromCart,
  updateCart: cartActions.updateCart,
  openLogin: modalActions.openPasswordlessModal,
  setCartVisibility: modalActions.setCartVisibility,
  viewCart: eventActions.viewCart,
  validateCart: cartActions.validateCart,
})(CartMenu);
