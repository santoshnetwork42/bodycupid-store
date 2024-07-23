import React from "react";
import { connect } from "react-redux";
import { useFeaturedCoupons, useFreeProducts } from "@wow-star/utils";

import { GiftBox } from "~/components/icons";

const CouponBanner = ({ message, animate }) => (
  <div className="coupon-discount-bar">
    <div className="coupon-discount">
      <p
        className={`coupon-discount-text font-weight-semi-bold pt-1 pb-1 m-0 ${
          animate ? "animate" : ""
        }`}
      >
        {message}
      </p>
    </div>
  </div>
);

const couponDiscountBar = ({
  cartList,
  appliedCoupon,
  collectionWiseNudgeMsg,
}) => {
  const { filteredFeaturedCoupons: featuredCoupons = [] } =
    useFeaturedCoupons();

  const [freeProduct = {}] = useFreeProducts({
    showNonApplicableFreeProducts: false,
  });

  const bxgyCoupon = featuredCoupons.find(
    ({ coupon }) =>
      coupon && coupon.couponType === "BUY_X_GET_Y" && coupon.autoApply
  );

  const bxayCoupon = featuredCoupons.find(
    ({ coupon }) =>
      coupon && coupon.couponType === "BUY_X_AT_Y" && coupon.autoApply
  );

  const hasCartItems = cartList?.length > 0;

  if (hasCartItems) {
    if (collectionWiseNudgeMsg) {
      const couponText =
        (appliedCoupon &&
          appliedCoupon?.getYAmount &&
          `Congrats, 'Buy ${appliedCoupon?.buyXQuantity} @ ₹${appliedCoupon?.getYAmount} Offer' can be availed!`) ||
        "";

      return (
        <CouponBanner
          message={couponText || collectionWiseNudgeMsg}
          animate={true}
        />
      );
    }
  }

  // if (hasCartItems) {
  //   if (
  //     bxgyCoupon &&
  //     (!appliedCoupon || appliedCoupon.code === bxgyCoupon.coupon.code)
  //   ) {
  //     const couponText = bxgyCoupon?.allowed
  //       ? `Congrats, your free product is added to cart!`
  //       : `Add more items to unlock 'Buy ${bxgyCoupon.coupon.buyXQuantity} get ${bxgyCoupon.coupon.getYQuantity} Offer'`;
  //     return (
  //       <CouponBanner message={couponText} animate={!!bxgyCoupon.allowed} />
  //     );
  //   } else if (
  //     bxayCoupon &&
  //     (!appliedCoupon || appliedCoupon.code === bxayCoupon.coupon.code)
  //   ) {
  //     const couponText = bxayCoupon?.allowed
  //       ? `Congrats, 'Buy ${bxayCoupon.coupon.buyXQuantity} @ ₹${bxayCoupon.coupon.getYAmount} Offer' can be availed!`
  //       : `Add more items to unlock 'Buy ${bxayCoupon.coupon.buyXQuantity} @ ₹${bxayCoupon.coupon.getYAmount} Offer'`;
  //     return (
  //       <CouponBanner message={couponText} animate={!!bxayCoupon.allowed} />
  //     );
  //   } else if (freeProduct?.allowed) {
  //     return (
  //       <CouponBanner
  //         message={
  //           <>
  //             <GiftBox />A surprise is added to your cart!
  //           </>
  //         }
  //         animate
  //       />
  //     );
  //   }
  // }

  return <></>;
};

function mapStateToProps(state) {
  return {
    cartList: state.cart.data ? state.cart.data : [],
    appliedCoupon: state.cart.coupon,
  };
}

export default connect(mapStateToProps)(couponDiscountBar);
