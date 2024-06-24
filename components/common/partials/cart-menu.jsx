import {
  useCartItems,
  useCartTotal,
  useFeaturedCoupons,
  useInventory,
} from "@wow-star/utils";
import { Logger } from "aws-amplify";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import { connect } from "react-redux";

import CouponDiscountBar from "~/components/common/coupon-discount-bar";
import CartTotal from "~/components/common/partials/cart-totals";
import { ProgressBar } from "~/components/common/progress-bar";
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
  const { query, asPath } = router;
  const { cart: forceOpenCart } = query;

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
    if (!forceOpenCart) {
      setCartVisibility(false);
    }
  }, [asPath]);

  //passed true for getting cart item number only
  const { filteredFeaturedCoupons: featuredCoupons = [] } =
    useFeaturedCoupons(true);

  const bxayCoupon = useMemo(() => {
    return featuredCoupons.find(
      ({ coupon }) =>
        coupon && coupon.couponType === "BUY_X_AT_Y" && coupon.autoApply
    );
  }, [featuredCoupons]);

  const showProgressBar = useMemo(() => {
    return (
      router?.query?.slug === "fragrance-bundle-offer" &&
      cartList?.some((cart) =>
        cart?.collections?.includes("fragrance-bundle-offer")
      ) &&
      bxayCoupon &&
      (!appliedCoupon || appliedCoupon.code === bxayCoupon.coupon.code)
    );
  }, [bxayCoupon, appliedCoupon, cartList]);

  const { current, max, progress, progressMessage } = useMemo(() => {
    if (showProgressBar) {
      const cartItemsToAdd =
        typeof bxayCoupon?.message === "number" ? bxayCoupon?.message : 0;
      const max = bxayCoupon?.coupon?.buyXQuantity;
      const current = max - cartItemsToAdd;
      const progress = (current / max) * 100;
      const progressMessage = bxayCoupon?.allowed
        ? `🥳 Congrats, 'Buy ${bxayCoupon.coupon.buyXQuantity} @ ₹${bxayCoupon.coupon.getYAmount} Coupon is applied!'`
        : `Select ${cartItemsToAdd} More Products to Avail Offer! 🎁`;

      return { current, max, progress, progressMessage };
    }
    return { current: 0, max: 0, progress: 0 };
  }, [showProgressBar, bxayCoupon]);

  const getCollectionWiseNudgeMsg = () => {
    const slug = router?.query?.slug;

    if (slug === "fragrance-bundle-offer") {
      return "Add more items to unlock 'Buy 8 @ ₹1999 Offer'";
    } else if (slug === "special-deal") {
      return "Add more items to unlock 'Buy 1 get 3 Offer'";
    }

    return "";
  };

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
                  {showProgressBar ? (
                    <div className="cart-progress-container">
                      <ProgressBar
                        current={current}
                        max={max}
                        progress={progress}
                        progressMessage={progressMessage}
                      />
                    </div>
                  ) : (
                    <CouponDiscountBar
                      collectionWiseNudgeMsg={getCollectionWiseNudgeMsg()}
                    />
                  )}

                  <div className="shop-table cart-table lh-default sidebar-padding">
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
                  className="text-primary sticky-sidebar-wrapper pb-6"
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
