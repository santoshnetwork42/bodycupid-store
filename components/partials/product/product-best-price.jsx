import React from "react";

import { toDecimal } from "~/utils";
import ALink from "~/components/features/custom-link";
import { copyText } from "~/utils/helper";
import { Discount } from "~/components/icons";

function ProductBestPrice(props) {
  const { price, code, discount } = props;

  return (
    <div className="product-best-price-container">
      <div className="product-top-content d-flex align-items-center">
          <Discount color="#17b31b" size={20} />
          <p className="ml-1 large-price-text">
            Best price:&nbsp;
            <span className="font-weight-semi-bold">
              ₹{toDecimal(price - discount)}
            </span>
          </p>
      </div>
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
    </div>
  );
}

export default React.memo(ProductBestPrice);
