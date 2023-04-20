import React from "react";
import { toast } from "react-toastify";

import AlertPopup from "~/components/features/product/common/alert-popup";
import { toDecimal } from "~/utils";
import ALink from "~/components/features/custom-link";
import { copyText } from "~/utils/helper";

function ProductBestPrice(props) {
  const { price, code, totalDiscount } = props;

  return (
    <div className="product-best-price-container">
      <div className="product-top-content">
        <div className="d-flex align-items-center">
          <i>%</i>
          <p>
            Best price :{" "}
            <span className="font-weight-semi-bold">
              {toDecimal(price - totalDiscount)}
            </span>{" "}
          </p>
        </div>
        <p>T&C</p>
      </div>
      <div className="d-flex">
        Use coupon{" "}
        <p id="coupon-code" className="font-weight-semi-bold ml-1">
          {code}
        </p>{" "}
        <ALink
          href="#"
          className="copy-code  cursor-pointer ml-1"
          onClick={() => {
            copyText(code, `Coupon code copied: "${code}`);
          }}
        >
          Copy code
        </ALink>
      </div>
    </div>
  );
}

export default React.memo(ProductBestPrice);
