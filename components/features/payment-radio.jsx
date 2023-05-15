import React from "react";
import { Cricle, CricleDot } from "../icons";
import { toDecimal } from "~/utils";
import ALink from "./custom-link";

const PaymentMethods = ({
  title,
  description,
  isSelected,
  tag,
  onClick,
  amount,
  disabled,
}) => {
  return (
    <div
      className={`bg-white border-regular payment-card mt-2 d-flex align-items-center justify-content-between ${
        disabled && "btn-disabled"
      }`}
      onClick={onClick}
    >
      <div>
        <div className="card-header d-flex align-items-center">
          {!!isSelected ? <CricleDot size={18} /> : <Cricle size={18} />}
          <span className="text-body text-normal ls-m ml-2 mr-2 checkout-payment-labels lh-default">
            {title}
          </span>
          {!!tag && <p className="extra-lable m-0">EXTRA 5% OFF</p>}
        </div>

        <div
          className={`card-body ls-m overflow-hidden payment-subtitle ml-0 d-flex align-items-center ${
            disabled && "payment-alert"
          }`}
        >
          <p>
            {description}
            {disabled && (
              <ALink href={"/pages/cart"} className="lh-1">
                Update coupon
              </ALink>
            )}
          </p>
        </div>
      </div>
      <p className="payment-card-amount m-0 font-weight-semi-bold">
        ₹{toDecimal(amount, 0)}
      </p>
    </div>
  );
};

export default PaymentMethods;
