import React from "react";
import { Cricle, CricleDot } from "../icons";
import { toInteger } from "~/utils";

const PaymentMethods = ({
  title,
  description,
  isSelected,
  tag,
  onClick,
  amount,
}) => {
  return (
    <div
      className="bg-white border-regular payment-card mt-2 d-flex align-items-center"
      onClick={onClick}
    >
      <div>
        <div className="card-header d-flex align-items-center">
          {!!isSelected ? <CricleDot size={18} /> : <Cricle size={18} />}
          <span className="text-body text-normal ls-m ml-2 mr-2 checkout-payment-lables lh-default">
            {title}
          </span>
          {!!tag && <p className="extra-lable m-0">EXTRA 5% OFF</p>}
        </div>

        <div className="card-body ls-m overflow-hidden payment-subtitle ml-0 d-flex align-items-center">
          {description}
        </div>
      </div>
      <p className="payment-card-amount m-0 font-weight-semi-bold">
        ₹{toInteger(amount)}
      </p>
    </div>
  );
};

export default PaymentMethods;
