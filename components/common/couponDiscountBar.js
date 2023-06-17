import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useFeaturedCoupons } from "~/utils/hooks/useCoupon";

const CouponDiscountBar = (props) => {
  const { cartList, couponBanner } = props;
  const featuredCoupons = useFeaturedCoupons();
  const b1g1Coupon = featuredCoupons.find((coupon) => coupon.code === "B1G1");
  const [showBar, setShowBar] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    if (couponBanner && cartList.length > 0 && b1g1Coupon) {
      setShowBar(true);
      setText(!b1g1Coupon?.allowed ? "Add 1 more item to unlock 'Buy 1 get 1 Offer'" : "Congrats! You have unlocked B1G1 Offer");
    } else {
      setShowBar(false);
      setText("");
    }
  }, [couponBanner, cartList, b1g1Coupon]);

  return (
    <div className={`coupon-discount-bar ${showBar ? "show" : ""}`}>
      {showBar && (
        <div className="coupon-discount">
          <p className={`coupon-discount-text font-weight-semi-bold pt-1 pb-1 m-0 ${text === "Congrats! You have unlocked B1G1 Offer" ? "animate" : ""}`}>
            {text}
          </p>
        </div>
      )}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    cartList: state.cart.data ? state.cart.data : [],
  };
}

export default connect(mapStateToProps)(CouponDiscountBar);
