import React from "react";

import { useFeaturedCoupons, useFreeProducts } from "~/utils/hooks/useCoupon";
import { GiftBox } from "~/components/icons";

const CouponBanner = (message) => (
  <div className="coupon-discount-bar">
    <div className="coupon-discount">
      <p className={`coupon-discount-text font-weight-semi-bold pt-1 pb-1 m-0 ${bxgyCoupon?.allowed ? "animate" : ""}`}>
        {message}
      </p>
    </div>
  </div>
)

const couponDiscountBar = () => {
  const featuredCoupons = useFeaturedCoupons();
  const freeProductsResponse = useFreeProducts(true);
  const bxgyCoupon = featuredCoupons.find((coupon) => coupon.couponType === "BUY_X_GET_Y" && coupon.autoApply);
  const [freeProduct] = freeProductsResponse;

  if (bxgyCoupon) {
    const couponText = bxgyCoupon.allowed ?
      `Congrats, your free product is added to cart!` : `Add more items to unlock 'Buy ${bxgyCoupon.buyXQuantity} get ${bxgyCoupon.getYQuantity} Offer'`;
    return <CouponBanner message={couponText} />
  } else if (freeProduct?.allowed) {
    return (
      <CouponBanner message={(
        <>
          <GiftBox />
          A surprise is added to your cart!
        </>
      )}
      />
    );
  }

  return <></>
};

export default couponDiscountBar;
