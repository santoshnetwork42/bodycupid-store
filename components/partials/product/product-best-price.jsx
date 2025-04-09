import React from "react";

import { toDecimal } from "~/utils";
import ALink from "~/components/features/custom-link";
import { copyText } from "~/utils/helper";
import { Discount } from "~/components/icons";
import { useFreebie } from "@wow-star/utils";

function ProductBestPrice(props) {
  const { price, coupon, discount } = props;

  const isProductCoupon = coupon?.couponType === "PRODUCT";
  const freeProduct = useFreebie();

  const titles = coupon?.getYStoreProducts?.map((item) => item?.title) || [];
  const productTitlesCombine = titles.length
    ? titles.length > 1
      ? `${titles.slice(0, -1).join(", ")} and ${titles.at(-1)}`
      : titles[0]
    : "";

  const totalFreeProductsPrice = coupon?.getYStoreProducts?.reduce(
    (acc, getYStoreProduct) => {
      const { price = 0 } = getProductPrice(getYStoreProduct);
      acc += price;
      return acc;
    },
    0
  );

  return (
    <div>
      {freeProduct && (
        <div className="product-best-price-container wrap">
          <div className="product-top-content d-flex">
            <p className="ml-1 text-black mb-1">
              Free&nbsp;
              {freeProduct?.description ? (
                <span>{freeProduct?.description}</span>
              ) : (
                <span>
                  {freeProduct?.getYStoreProduct?.title} worth ₹
                  {freeProduct?.getYStoreProduct?.price} on orders above ₹
                  {freeProduct?.minOrderValue}
                </span>
              )}
            </p>
          </div>
        </div>
      )}
      <div className="product-best-price-container">
        <div
          className={`product-top-content d-flex ${
            isProductCoupon ? "" : "align-items-center"
          }`}
        >
          <Discount color="#17b31b" size={20} />
          {isProductCoupon ? (
            <p className="ml-1 text-black mb-1">
              Free Product:&nbsp;
              <span className="font-weight-semi-bold">
                {productTitlesCombine} worth ₹{totalFreeProductsPrice} on orders
                above ₹{coupon?.minOrderValue}
              </span>
            </p>
          ) : (
            <p className="ml-1 large-price-text">
              Best price:&nbsp;
              <span className="font-weight-semi-bold">
                ₹{toDecimal(price - discount)}
              </span>
            </p>
          )}
        </div>
        <div className="d-flex align-items-center flex-wrap">
          <span className="mr-1 text-primary">Use coupon </span>
          <p id="coupon-code" className="font-weight-semi-bold mr-1">
            {coupon?.code}
          </p>
          <ALink
            href="#"
            className="copy-code cursor-pointer"
            onClick={() => {
              copyText(coupon.code, `Coupon code copied: ${coupon?.code}`);
            }}
          >
            Copy code
          </ALink>
        </div>
      </div>
    </div>
  );
}

export default React.memo(ProductBestPrice);
