import {
  getCouponDiscount,
  useCartItems,
  useCartTotal,
  useFeaturedCoupons,
  useRuleEngine,
} from "@wow-star/utils";
import { API, Logger } from "aws-amplify";
import { useAppRouter } from "~/utils/navigation";
import { useCallback, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { applyCoupon as applyCouponMutation } from "~/graphql/api";
import CouponDiscountBar from "~/components/common/coupon-discount-bar";
import CartTotal from "~/components/common/partials/cart-totals";
import { ProgressBar } from "~/components/common/progress-bar";
import ALink from "~/components/features/custom-link";
import { Bag, Cart, Cross, Ellipse, LoyaltyTag } from "~/components/icons";
import CartProduct from "~/components/partials/cart/cart-product";
import LimitedTimeProduct from "~/components/partials/cart/limited-time-product";
import LimitedTimeProductDeal from "~/components/partials/cart/limited-time-product-deal";
import { STORE_ID, STORE_PREFIX } from "~/config";
import { cartActions } from "~/store/cart";
import { eventActions } from "~/store/events";
import { modalActions } from "~/store/modal";
import { getTotalPrice, toDecimal } from "~/utils";
import { useNavBarState } from "~/utils/contexts/navbar";
import { errorHandler } from "~/utils/errorHandler";
import { v4 as uuidv4 } from "uuid";
import { useInventory } from "~/utils/hooks/useInventory";

const logger = new Logger("Cart");

function CartMenu(props) {
  const {
    cartList,
    appliedCoupon,
    isCartOpen,
    setCartVisibility,
    viewCart,
    validateCart,
    removeCoupon,
    removeFromCart,
  } = props;

  const router = useAppRouter();
  const { query, asPath } = router;
  const { cart: forceOpenCart } = query;
  const sessionKey = `${STORE_PREFIX}_coupon_session_id`;
  const sessionId = sessionStorage?.getItem(sessionKey);

  const cartItems = useCartItems({
    showLTOProducts: false,
    showNonApplicableFreeProducts: true,
  });

  const inventory = useInventory({ validateCart });
  const { isRewardApplied, handleRewardApply } = useNavBarState();

  const {
    totalItems,
    totalRewardPointsOfUser,
    prepaidCashbackRewardsOnOrder,
    amountNeededToAvailPrepaidCashback,
    usableRewards,
    grandTotal,
    showLoyalty,
    totalPrice,
  } = useCartTotal({
    paymentType: "PREPAID",
    isRewardApplied:
      (!appliedCoupon || appliedCoupon?.isRewardApplicable) && isRewardApplied,
  });

  const { inventoryMapping } = inventory;

  useEffect(() => {
    if (!isCartOpen) return;
    logger.verbose("View Cart");
    const timeoutId = setTimeout(() => {
      viewCart();
    }, 1000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [isCartOpen]);

  useEffect(() => {
    if (!!appliedCoupon) handleRewardApply(appliedCoupon?.isRewardApplicable);
  }, [appliedCoupon?.isRewardApplicable]);

  const validLtoProduct =
    !!cartItems?.length &&
    (cartItems.find((i) => i.ltoProduct) || cartItems.find((i) => i.ltoDeal));

  const outOfStock =
    validLtoProduct?.qty >
    ((inventoryMapping || {})[validLtoProduct?.recordKey] || 99);

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
  const { featuredCouponsSorted: featuredCoupons = [] } =
    useFeaturedCoupons(true);

  const cartPageWowCashTooltip = useRuleEngine("DEBIT_PREPAID_ORDER");

  const { percentageCoupon, bxayCoupon } = useMemo(() => {
    const bxayCoupon = featuredCoupons.find(
      ({ coupon }) =>
        coupon &&
        coupon.couponType === "BUY_X_AT_Y" &&
        (coupon.autoApply || coupon.isAffiliated) &&
        coupon.applicableCollections.includes(router?.query?.slug)
    );

    const percentageCoupon = featuredCoupons.find(
      ({ coupon }) =>
        coupon &&
        coupon.couponType === "PERCENTAGE" &&
        (coupon.autoApply || coupon.isAffiliated) &&
        coupon.applicableCollections.includes(router?.query?.slug)
    );
    return { percentageCoupon, bxayCoupon };
  }, [featuredCoupons]);

  const showProgressBar = useMemo(() => {
    return false; // for now
    // return (
    //   router?.query?.slug === "bundle-offer" &&
    //   cartList?.some((cart) => cart?.collections?.includes("bundle-offer")) &&
    //   bxayCoupon &&
    //   (!appliedCoupon || appliedCoupon.code === bxayCoupon.coupon.code)
    // );
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
    if (slug === "bundle-offer") {
      return "Add more items to unlock 'Buy 8 @ ₹999 Offer'";
    } else if (slug === "special-deal") {
      return "Add more items to unlock 'Buy 1 get 3 Offer'";
    } else if (slug === "bundle-offer-buy5" || slug === "bundle-deal") {
      return "Add more items to unlock 'Buy 5 @ ₹999 Offer'";
    } else if (slug === "buy-5-799") {
      return "Add more items to unlock 'Buy 5 @ ₹799 Offer'";
    } else if (slug === "buy-8-1199") {
      return "Add more items to unlock 'Buy 8 @ ₹1199 Offer'";
    } else if (slug === "special-bundle-offer") {
      return "Add more items to unlock 'Buy 8 @ ₹1299 Offer'";
    } else if (slug === "buy-4-699") {
      return "Add more items to unlock 'Buy 4 @ ₹699 Offer'";
    } else if (slug === "buy-4-for-699") {
      return "Add more items to unlock 'Buy 4 @ ₹699 Offer'";
    } else if (slug === "buy-6-at-899") {
      return "Add more items to unlock 'Buy 6 @ ₹899 Offer'";
    } else if (slug === "bundle-offer-makeup") {
      return "Add more items to unlock 'Buy 3 @ ₹699 Offer'";
    } else if (slug === "deal-offer") {
      return "Add more items to unlock 'Buy 3 @ ₹599 Offer'";
    } else if (slug === "gpay3") {
      return "Add more items to unlock 'Buy 6 @ ₹999 Offer'";
    } else if (slug === "gpay") {
      return "Add more items to unlock 'Buy 8 @ ₹999 Offer'";
    } else if (slug === "gpay2") {
      return "Add more items to unlock 'Buy 4 @ ₹599 Offer'";
    } else if (slug === "gpay75") {
      const isCongratsMessage =
        appliedCoupon?.code === percentageCoupon?.coupon?.code;
      const isCouponApplicable = percentageCoupon?.allowed;
      return isCongratsMessage
        ? "Congrats, Flat 75% Offer Applied!"
        : isCouponApplicable
        ? "Congrats,Your cart is eligible for Flat 75% Offer"
        : `Add products worth ₹${Math.max(
            0,
            percentageCoupon?.coupon?.minOrderValue - totalPrice
          )} more to the cart to unlock Flat 75% offer`;
    } else if (slug === "affiliate-4") {
      return "Add more items to unlock 'Buy 4 @ ₹599 Offer'";
    } else if (slug === "affiliate-6") {
      return "Add more items to unlock 'Buy 6 @ ₹999 Offer'";
    } else if (slug === "deal-perfume") {
      return "Add more items to unlock 'Buy 5 @ ₹1299 Offer'";
    } else if (slug === "bundle") {
      return "Add more items to unlock 'Buy 10 @ ₹1499 Offer'";
    } else if (slug === "buy-5") {
      return "Add more items to unlock 'Buy 5 @ 699 Offer'";
    } else if (slug === "buy-6") {
      return "Add more items to unlock 'Buy 6 @ 799 Offer'";
    } else if (slug === "buy-4-999") {
      return "Add more items to unlock 'Buy 4 @ ₹999 Offer'";
    } else if (slug === "buy-8-1099") {
      return "Add more items to unlock 'Buy 8 @ ₹1099 Offer'";
    }

    return "";
  };

  const handleCouponRemove = () => {
    cartList.forEach((item) => {
      if (item?.cartItemSource === "COUPON") {
        removeFromCart(item);
      }
    });
    removeCoupon();
  };

  const validatePreviousCart = useCallback(async () => {
    const code = appliedCoupon?.code;
    if (!code) return;

    try {
      const couponData = await API.graphql({
        query: applyCouponMutation,
        authMode: "API_KEY",
        variables: {
          storeId: STORE_ID,
          code: code,
          deviceType: "WEB",
          variantFilter: { status: { ne: "DISABLED" } },
          imageLimit: 1,
        },
      })
        .then((data) => data?.data?.applyCoupon)
        .catch(errorHandler);

      if (!couponData) {
        handleCouponRemove();
        return;
      }

      const { allowed } = getCouponDiscount(couponData, cartList);

      if (!allowed) {
        handleCouponRemove();
      }
    } catch (error) {
      console.error("Failed to validate coupon:", error);
      handleCouponRemove();
    }
  }, [appliedCoupon, cartList]);

  useEffect(() => {
    if (!sessionId) {
      try {
        validatePreviousCart();
      } catch (e) {
        console.error(e);
      } finally {
        const id = uuidv4();
        sessionStorage?.setItem(sessionKey, id);
      }
    }
  }, [sessionId, sessionKey]);

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
                      <div className="pt-2">
                        {!!validLtoProduct?.ltoDeal && !outOfStock && (
                          <LimitedTimeProductDeal
                            parentRecordKey={validLtoProduct?.recordKey}
                            product={validLtoProduct?.ltoDeal}
                            addedAt={validLtoProduct?.addedAt}
                          />
                        )}
                        {!!validLtoProduct?.ltoProduct && !outOfStock && (
                          <LimitedTimeProduct
                            product={validLtoProduct?.ltoProduct}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {!!usableRewards && (
                  <>
                    <div
                      className="d-flex-col wowCashCart justify-content-center"
                      style={{
                        pointerEvents: !showLoyalty ? "none" : "inherit",
                        opacity: !showLoyalty ? 0.6 : 1,
                      }}
                    >
                      <div className="d-flex pl-4 pr-4  pt-3 pb-3  gap-9">
                        <input
                          type="checkbox"
                          className="wowCashCheckbox"
                          name="wowCash"
                          checked={
                            (!appliedCoupon ||
                              appliedCoupon?.isRewardApplicable) &&
                            isRewardApplied
                          }
                          onChange={(e) => handleRewardApply(e.target.checked)}
                        />
                        <div className="d-flex-col grow-1 gap-5">
                          <div className="font-size-14 line-height-14 d-flex gap-5 align-items-center">
                            Use Cupid Coins
                            {!!cartPageWowCashTooltip?.description && (
                              <div className="balance-tooltip">
                                <Ellipse className="" size={14} color="none" />
                                <div className="font-size-10 font-weight-5 tip vis">
                                  {cartPageWowCashTooltip?.description}
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="font-size-10 font-weight-3 ">
                            Available balance:
                            <span className="font-size-11 font-weight-7">
                              ₹{totalRewardPointsOfUser.toFixed(2)}
                            </span>{" "}
                          </div>
                        </div>
                        {!!usableRewards && (
                          <div className="font-weight-6 font-size-14">
                            ₹{usableRewards.toFixed(2)}
                          </div>
                        )}
                      </div>
                    </div>
                    {!showLoyalty && (
                      <p
                        className="pl-4 pr-4  font-weight-3"
                        style={{
                          color: "#EF4444",
                          fontSize: 13,
                        }}
                      >
                        {`* Cupid Coins cannot be clubbed with this offer`}
                      </p>
                    )}
                  </>
                )}

                <div className="pb-0 d-flex align-items-center summary2 loyalty-text">
                  {!!prepaidCashbackRewardsOnOrder ? (
                    <>
                      <LoyaltyTag />
                      <p className="mb-0 pl-1 pt-1 pb-1">
                        You will earn ₹{prepaidCashbackRewardsOnOrder} cashback
                        with this order
                      </p>
                    </>
                  ) : (
                    <>
                      {!!amountNeededToAvailPrepaidCashback?.amount && (
                        <>
                          <LoyaltyTag />
                          <p className="mb-0 pl-1">
                            Add items worth ₹
                            {(
                              amountNeededToAvailPrepaidCashback.amount -
                              grandTotal
                            ).toFixed(2)}{" "}
                            to earn coins
                          </p>
                        </>
                      )}
                    </>
                  )}
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
  removeCoupon: cartActions.removeCoupon,
})(CartMenu);
