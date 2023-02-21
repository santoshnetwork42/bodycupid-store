import React from "react";

export default function CouponPopup(props) {
  const { coupon } = props;

  return (
    <div className="minipopup-area">
      <div className="minipopup-box show" style={{ top: "0" }}>
        <p className="minipopup-title">{coupon.code} successfully applied.</p>
      </div>
    </div>
  );
}
