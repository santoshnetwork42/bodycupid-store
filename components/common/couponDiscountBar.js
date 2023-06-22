import React from "react";
import { connect } from "react-redux";

import { useFeaturedCoupons, useFreeProducts } from "~/utils/hooks/useCoupon";
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

const couponDiscountBar = ({ cartList }) => {
  const featuredCoupons = useFeaturedCoupons();
  const freeProductsResponse = useFreeProducts(false);

  const bxgyCoupon = featuredCoupons.find(
    (coupon) => coupon.couponType === "BUY_X_GET_Y" && coupon.autoApply
  );
  const [freeProduct] = freeProductsResponse;
  const hasCartItems = cartList?.length > 0;

  if (hasCartItems) {
    if (bxgyCoupon) {
      const couponText = bxgyCoupon.allowed
        ? `Congrats, your free product is added to cart!`
        : `Add more items to unlock 'Buy ${bxgyCoupon.buyXQuantity} get ${bxgyCoupon.getYQuantity} Offer'`;
      return (
        <CouponBanner message={couponText} animate={!!bxgyCoupon.allowed} />
      );
    } else if (freeProduct?.allowed) {
      return (
        <CouponBanner
          message={
            <>
              <GiftBox />A surprise is added to your cart!
            </>
          }
          animate
        />
      );
    }
  }

  return <></>;
};

function mapStateToProps(state) {
  return {
    cartList: state.cart.data ? state.cart.data : [],
  };
}

export default connect(mapStateToProps)(couponDiscountBar);
