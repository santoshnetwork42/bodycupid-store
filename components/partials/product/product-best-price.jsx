import React, { useState } from "react";

import { toDecimal } from "~/utils";
import ALink from "~/components/features/custom-link";
import { copyText } from "~/utils/helper";
import Card from "~/components/features/accordion/card";

function ProductBestPrice(props) {
  const { price, code, discount, couponType, autoApply, message, couponList } =
    props;

  return (
    <div className="product-best-price-container">
      <div className="product-top-content">
        <div className="d-flex align-items-center">
          <i>%</i>
          <p>
            Best price:&nbsp;
            <span className=" font-weight-semi-bold">
              {couponType === "PRODUCT"
                ? toDecimal(price)
                : toDecimal(price - discount)}
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
      <p className="text-success">{message}</p>
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
              <>
                <hr className="mb-2" />
                <div
                  key={coupon.id}
                  className="d-flex w-full mb-2 lh-default align-items-center justify-content-between  pr-1"
                >
                  <div>
                    <span className="coupon-subtext text-primary">
                      BEST PRICE:&nbsp;
                      <span className="font-weight-semi-bold text-dark">
                        {coupon.couponType === "PRODUCT"
                          ? toDecimal(price)
                          : toDecimal(price - coupon.discount)}
                      </span>
                    </span>
                    <div className="d-flex align-items-center flex-wrap">
                      {!coupon.autoApply && (
                        <>
                          <span className="mr-1 text-primary">Use coupon</span>
                          <span className="text-dark font-weight-semi-bold mr-1">
                            {coupon.code}
                          </span>
                          <ALink
                            href="#"
                            className="copy-code  cursor-pointer"
                            onClick={() => {
                              copyText(
                                coupon.code,
                                `Coupon code copied: ${coupon.code}`
                              );
                            }}
                          >
                            Copy code
                          </ALink>
                        </>
                      )}
                    </div>
                    <p className="text-success">{coupon.message}</p>
                  </div>
                </div>
              </>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}

export default React.memo(ProductBestPrice);
