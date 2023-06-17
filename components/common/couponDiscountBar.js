import React from "react";
import { connect } from "react-redux";
import { useFeaturedCoupons } from "~/utils/hooks/useCoupon";

const couponDiscountBar = (props) => {
  const { cartList, couponBanner } = props;
  const featuredCoupons = useFeaturedCoupons();
  const b1g1Coupon = featuredCoupons.find((coupon) => coupon.code === "B1G1");

  if (couponBanner)
    return (
      <>
        {!!cartList.length ? (
          <div className="coupon-discount-bar ">
            <div className="coupon-discount">
              <p className="coupon-discount-text font-weight-semi-bold pt-1 pb-1 m-0">
                {!b1g1Coupon?.allowed
                  ? "Add 1 more item to unlock 'Buy 1 get 1 Offer'"
                  : "Congrats! You have unlocked B1G1 Offer"}
              </p>
            </div>
          </div>
        ) : (
          <></>
        )}
      </>
    );
  return <></>;
};

function mapStateToProps(state) {
  return {
    cartList: state.cart.data ? state.cart.data : [],
  };
}

export default connect(mapStateToProps)(couponDiscountBar);
