import React from "react";
import { connect } from "react-redux";
import { useFeaturedCoupons } from "~/utils/hooks/useCoupon";

const couponDiscountBar = (props) => {
  const { cartList } = props;
  const featuredCoupons = useFeaturedCoupons();
  console.log(featuredCoupons)
  const bxgyCoupon = featuredCoupons.find((coupon) => coupon.couponType === "BUY_X_GET_Y");

  const couponText = !bxgyCoupon?.allowed
    ? `Add more items to unlock 'Buy ${bxgyCoupon?.buyXQuantity} get ${bxgyCoupon?.getYQuantity} Offer'`
    : `Congrats! You have unlocked ${bxgyCoupon?.code} Offer`;

  const isCongrats = couponText.includes("Congrats");

    return (
      <>
        {!!cartList.length && bxgyCoupon ? (
          <div className="coupon-discount-bar ">
            <div className="coupon-discount">
            <p className={`coupon-discount-text font-weight-semi-bold pt-1 pb-1 m-0 
              ${isCongrats ? "animate" : ""}`}>
              {couponText}
              </p>
            </div>
          </div>
        ) : (
          <></>
        )}
      </>
    );
};

function mapStateToProps(state) {
  return {
    cartList: state.cart.data ? state.cart.data : [],
  };
}

export default connect(mapStateToProps)(couponDiscountBar);