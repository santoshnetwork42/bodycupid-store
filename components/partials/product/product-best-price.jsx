import React from "react";

import { toDecimal } from "~/utils";
import ALink from "~/components/features/custom-link";
import { copyText } from "~/utils/helper";
import Card from "~/components/features/accordion/card";
import { Copy } from "~/components/icons";

function ProductBestPrice(props) {
  const { price, code, totalDiscount, couponList } = props;

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
            copyText(code, `Coupon code copied: ${code}`);
          }}
        >
          Copy code
        </ALink>
      </div>
      <Card
        title={`${couponList.length} more coupons`}
        expanded={false}
        adClass="coupon-list"
        noDisplayStyle
        collapseEvent
      >
        <div>
          {couponList.map((coupon) => (
            <div
              key={coupon.key}
              className="d-flex w-full align-items-center justify-content-between pl-1 pr-1"
            >
              <div>
                <div className="text-dark">{coupon.code} </div>
                <span className="coupon-subtext">BEST PRICE: {toDecimal(price - coupon.totalDiscount)}</span>
              </div>
              <div
                className=" cursor-pointer"
                onClick={() => {
                  copyText(coupon.code, `Coupon code copied: ${coupon.code}`);
                }}
              >
                <Copy size={18} />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

export default React.memo(ProductBestPrice);
