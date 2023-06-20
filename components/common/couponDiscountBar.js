import React from "react";
import { connect } from "react-redux";
import { useFeaturedCoupons, useProductCoupons, useFreeProducts } from "~/utils/hooks/useCoupon";
import { GiftBox } from "../icons";

const couponDiscountBar = (props) => {
  const { cartList } = props;
  const featuredCoupons = useFeaturedCoupons();
  const freeProductsResponse = useFreeProducts(true);
  const bxgyCoupon = featuredCoupons.find((coupon) => coupon.couponType === "BUY_X_GET_Y");

  let couponText = "";

  if (bxgyCoupon) {
    couponText = bxgyCoupon.allowed ?
      `Congrats, your free product is added to cart!` : `Add more items to unlock 'Buy ${bxgyCoupon.buyXQuantity} get ${bxgyCoupon.getYQuantity} Offer'`;  
  } else if (freeProductsResponse[0]?.allowed) {
    couponText = (
      <>
       <GiftBox />
       A surprise is added to your cart!
      </>
    );
  }

  return (
    <>
      {!!cartList.length && (!!bxgyCoupon || freeProductsResponse[0]?.allowed) && (
        <div className="coupon-discount-bar">
          <div className="coupon-discount">
            <p className={`coupon-discount-text font-weight-semi-bold pt-1 pb-1 m-0 ${bxgyCoupon?.allowed ? "animate" : ""}`}>
              {couponText}
            </p>
          </div>
        </div>
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
