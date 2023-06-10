import React, { useState } from "react";

import { toDecimal } from "~/utils";
import ALink from "~/components/features/custom-link";
import { copyText } from "~/utils/helper";
import Card from "~/components/features/accordion/card";
import { Discount } from "~/components/icons";

function ProductBestPrice(props) {
  const { price, code, discount, couponType, autoApply, message } = props;

  return (
    <div className="product-best-price-container">
      <div className="product-top-content">
        <div className="d-flex align-items-center">
          <Discount color="#17b31b" size={20} />
          <p className="ml-1">
            Best price:&nbsp;
            <span className=" font-weight-semi-bold">
              ₹{toDecimal(price - discount)}
            </span>
          </p>
        </div>
      </div>
      {!autoApply && (
        <div className="d-flex align-items-center flex-wrap">
          <span className="mr-1 text-primary">Use coupon </span>
          <p id="coupon-code" className="font-weight-semi-bold mr-1">
            {code}
          </p>
          <ALink
            href="#"
            className="copy-code cursor-pointer"
            onClick={() => {
              copyText(code, `Coupon code copied: ${code}`);
            }}
          >
            Copy code
          </ALink>
        </div>
      )}
      <p className="text-success text-uppercase">{message}</p>
    </div>
  );
}

export default React.memo(ProductBestPrice);
