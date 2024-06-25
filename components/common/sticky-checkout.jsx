import { useCartTotal, useFeaturedCoupons } from "@wow-star/utils";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { connect } from "react-redux";

import { ShowProgressBar } from "~/components/common/sticky-progress-bar";
import ALink from "~/components/features/custom-link";
import { modalActions } from "~/store/modal";
import { toDecimal } from "~/utils";
import { useNavBarState } from "~/utils/contexts/navbar";

function StickyFooter(props) {
  const { cartList, showStickyCheckout, setCartVisibility, appliedCoupon } =
    props;
  const { isRewardApplied } = useNavBarState();
  const router = useRouter();

  const { totalPrice, totalItems } = useCartTotal({
    paymentType: "PREPAID",
    isRewardApplied: isRewardApplied,
  });
  //passed true for getting cart item number only
  const { filteredFeaturedCoupons: featuredCoupons = [] } =
    useFeaturedCoupons(true);

  const isBundleOffer = useMemo(() => {
    return !!(
      router?.query?.slug === "bundle-offer" &&
      cartList?.some((cart) => cart?.collections?.includes("bundle-offer"))
    );
  }, [cartList, router?.query?.slug]);

  const bxayCoupon = useMemo(() => {
    return featuredCoupons.find(
      ({ coupon }) =>
        coupon && coupon.couponType === "BUY_X_AT_Y" && coupon.autoApply
    );
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
  return (
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
