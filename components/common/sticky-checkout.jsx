import { useCartTotal, useFeaturedCoupons } from "@wow-star/utils";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { connect } from "react-redux";

import { ShowProgressBar } from "~/components/common/sticky-progress-bar";
import ALink from "~/components/features/custom-link";
import { modalActions } from "~/store/modal";
import { getCartCount, toDecimal } from "~/utils";
import { useNavBarState } from "~/utils/contexts/navbar";
import CouponDiscountBar from "./coupon-discount-bar";

function StickyFooter(props) {
  const { cartList, showStickyCheckout, setCartVisibility, appliedCoupon } =
    props;
  const { isRewardApplied } = useNavBarState();
  const router = useRouter();
  const { slug } = router?.query || {};

  const { totalPrice, totalItems } = useCartTotal({
    paymentType: "PREPAID",
    isRewardApplied: isRewardApplied,
  });
  //passed true for getting cart item number only
  const { featuredCouponsSorted: featuredCoupons = [] } =
    useFeaturedCoupons(true);

  const isBundleOffer = useMemo(() => {
    return false; // for now
    // return !!(
    //   slug === "bundle-offer" &&
    //   cartList?.some((cart) => cart?.collections?.includes("bundle-offer"))
    // );
  }, [cartList, slug]);

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

  if (!cartList?.length || !showStickyCheckout) return <></>;

  if (
    isBundleOffer &&
    bxayCoupon &&
    (!appliedCoupon || appliedCoupon.code === bxayCoupon.coupon.code)
  ) {
    const cartItemsToAdd =
      typeof bxayCoupon?.message === "number" ? bxayCoupon?.message : 0;
    const max = bxayCoupon?.coupon?.buyXQuantity;
    const current = max - cartItemsToAdd;
    const progress = (current / max) * 100;
    const progressMessage = bxayCoupon?.allowed
      ? `🥳 Congrats, 'Buy ${bxayCoupon.coupon.buyXQuantity} @ ₹${bxayCoupon.coupon.getYAmount} Coupon is applied!'`
      : `Select ${cartItemsToAdd} More Products to Avail Offer! 🎁`;

    const buttonText = bxayCoupon?.allowed
      ? `Go to Cart (${current}/${max})`
      : `Buy ${max} @ ₹${bxayCoupon.coupon.getYAmount} (${current}/${max})`;

    return ShowProgressBar({
      current,
      max,
      progress,
      progressMessage,
      buttonText,
      setCartVisibility,
    });
  }

  const totalCartItems = getCartCount(cartList);
  const hasDiscountSlug =
    slug === "bundle-offer-buy5" ||
    slug === "buy-4-699" ||
    slug === "buy-6-at-899" ||
    slug === "special-deal" ||
    slug === "bundle-offer-makeup" ||
    slug === "gpay" ||
    slug === "gpay2" ||
    slug === "gpay3" ||
    slug === "gpay75" ||
    slug === "bundle-offer" ||
    slug === "deal-perfume" ||
    slug === "affiliate-4" ||
    slug === "affiliate-6" ||
    slug === "deal-offer" ||
    slug === "bundle";
  const hasSpecialOffer = cartList?.some(
    (cart) =>
      slug === "" ||
      slug === "" ||
      cart?.collections?.includes("bundle-offer-buy5") ||
      cart?.collections?.includes("buy-4-699") ||
      cart?.collections?.includes("buy-6-at-899") ||
      cart?.collections?.includes("special-deal") ||
      cart?.collections?.includes("bundle-offer") ||
      cart?.collections?.includes("deal-perfume") ||
      cart?.collections?.includes("affiliate-6") ||
      cart?.collections?.includes("affiliate-4") ||
      cart?.collections?.includes("deal-offer") ||
      cart?.collections?.includes("gpay") ||
      cart?.collections?.includes("gpay2") ||
      cart?.collections?.includes("gpay3") ||
      cart?.collections?.includes("gpay75")
  );

  const showDiscount = totalCartItems > 0 && hasDiscountSlug && hasSpecialOffer;

  const getCollectionWiseNudgeMsg = () => {
    if (slug === "special-deal") {
      return "Add more items to unlock 'Buy 1 get 3 Offer'";
    } else if (slug === "bundle-offer-buy5") {
      return "Add more items to unlock 'Buy 5 @ ₹999 Offer'";
    } else if (slug === "buy-4-699") {
      return "Add more items to unlock 'Buy 4 @ ₹699 Offer'";
    } else if (slug === "bundle") {
      return "Add more items to unlock 'Buy 10 @ ₹1499 Offer'";
    } else if (slug === "buy-6-at-899") {
      return "Add more items to unlock 'Buy 6 @ ₹899 Offer'";
    } else if (slug === "bundle-offer-makeup") {
      return "Add more items to unlock 'Buy 3 @ ₹699 Offer'";
    } else if (slug === "bundle-offer") {
      return "Add more items to unlock 'Buy 8 @ ₹999 Offer'";
    } else if (slug === "deal-offer") {
      return "Add more items to unlock 'Buy 3 @ ₹599 Offer'";
    } else if (slug === "gpay") {
      return "Add more items to unlock 'Buy 8 @ ₹999 Offer'";
    } else if (slug === "gpay2") {
      return "Add more items to unlock 'Buy 4 @ ₹599 Offer'";
    } else if (slug === "gpay3") {
      return "Add more items to unlock 'Buy 6 @ ₹999 Offer'";
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
    }

    return "";
  };

  return (
    <div className="sticky-container">
      {showDiscount && (
        <CouponDiscountBar
          collectionWiseNudgeMsg={getCollectionWiseNudgeMsg()}
        />
      )}
      <div className="stick-bottom-button">
        <div className="lh-default text-primary">
          <span>{totalItems > 1 ? `${totalItems} Items` : `1 Item`}</span>
          <p className="summary-total-price text-left ls-s">
            ₹ {toDecimal(totalPrice)}
          </p>
        </div>

        <ALink
          href="#"
          onClick={() => setCartVisibility(true)}
          className="btn btn-dark btn-rounded btn-checkout"
        >
          Go To Cart
        </ALink>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    cartList: state.cart.data || [],
    user: state.user.data,
    appliedCoupon: state.cart.coupon,
  };
}

export default connect(mapStateToProps, {
  setCartVisibility: modalActions.setCartVisibility,
})(StickyFooter);
