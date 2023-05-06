import React, { useState } from "react";

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
            <span className=" font-weight-semi-bold">
              {toDecimal(price - totalDiscount)}
            </span>{" "}
          </p>
        </div>
      </div>
      <div className="d-flex align-items-center flex-wrap">
        <span className="mr-1">Use coupon </span>
        <p id="coupon-code" className="font-weight-semi-bold mr-1">
          {code}
        </p>{" "}
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
      {couponList.length > 0 && (
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
                className="d-flex w-full mb-2 lh-default align-items-center justify-content-between  pr-1"
              >
                <div>
                  <span className="coupon-subtext">
                    BEST PRICE:&nbsp;
                    <span className="font-weight-semi-bold text-dark">
                      {toDecimal(price - coupon.totalDiscount)}
                    </span>{" "}
                  </span>
                  <div className="d-flex align-items-center flex-wrap">
                    <span className="mr-1">Use coupon</span>
                    <span className="text-dark font-weight-semi-bold mr-1">
                      {" "}
                      {coupon.code}
                    </span>{" "}
                    <ALink
                      href="#"
                      className="copy-code  cursor-pointer"
                      onClick={() => {
                        copyText(code, `Coupon code copied: ${code}`);
                      }}
                    >
                      Copy code
                    </ALink>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}

export default React.memo(ProductBestPrice);