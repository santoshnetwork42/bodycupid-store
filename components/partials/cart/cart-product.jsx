import React, { Fragment } from "react";
import ALink from "~/components/features/custom-link";
import Quantity from "~/components/features/quantity";
import { Close } from "~/components/icons";
import { toDecimal } from "~/utils";
import { getPublicImageURL } from "~/utils/getPublicImageUrl";

export default function CartProduct({ item,removeFromCart }) {
  const productDiscountPercentage = ({ price, listingPrice }) => {
    return Math.round(((listingPrice - price) / listingPrice) * 100);
  };

  const onChangeQty = (item, qty) => {
    if (qty) {
      const cartData = getUpdatedCart(cartList, item.recordKey, { qty });
      updateCart(cartData);
    } else {

      removeFromCart(item);
    }
  };

  const getVariantSelect = (item) => {
    return (
      <select
        name={`${item.recordKey}`}
        className="form-control"
        value={item.variantId}
        onChange={(e) => {
          changeVariant(e, item);
        }}
      >
        {item?.variants?.items.map((v) => (
          <option key={v.id} value={v.id}>
            {v.title}
          </option>
        ))}
      </select>
    );
  };

  if (!item) return <></>;

  return (
    <div>
      <Fragment key={item.recordKey}>
        <div className="m-0 p-0 border-no ">
          <div className="m-0 p-0">
            <div className="mobile-specific-cart-product-container border-regular bg-white mb-2 d-flex p-relative">
              <figure>
                <ALink href={"/product/" + item.slug}>
                  <img
                    src={getPublicImageURL(item.images.items[0]?.imageKey)}
                    width="100"
                    height="100"
                    alt={item.images.items[0]?.alt}
                  />
                </ALink>
              </figure>
              <div className="text-left text-primary w-100  mr-1 ml-2">
                <div className="mr-5 ">
                  <ALink href={"/product/" + item.slug}>{item.title}</ALink>
                </div>
                <div className="product-subtotal mt-1 d-flex mb-1 align-items-center">
                  {item.isBogo ? (
                    <>
                      <del className="summary-subtotal-listingprice">
                        ₹{toDecimal(item.listingPrice)}
                      </del>
                      <span className="text-success ml-1">Free</span>
                    </>
                  ) : (
                    <>
                      <span className="sm-product-amount mr-2">
                        ₹{toDecimal(item.price)}
                      </span>

                      <p className="m-0 product-discount-listing">
                        {item.price < item.listingPrice && (
                          <del className="summary-subtotal-listingprice">
                            ₹{toDecimal(item.listingPrice)}
                          </del>
                        )}
                        <span className={`discount-percetage ml-2`}>
                          {productDiscountPercentage(item) > 0 &&
                            `${productDiscountPercentage(item)}% off`}
                        </span>
                      </p>
                    </>
                  )}
                </div>
                <div className="d-flex">
                  {!item.isBogo && (
                    <div className="product-quantity w-0">
                      <Quantity
                        product={item}
                        qty={item.qty}
                        max={item.inventory}
                        onChangeQty={(qty) => onChangeQty(item, qty)}
                      />
                    </div>
                  )}

                  {!!item?.variants?.items.length && getVariantSelect(item)}
                </div>
              </div>
              <div className="product-close">
                <ALink
                  href="#"
                  className="sm-product-remove"
                  title="Remove this product"
                  onClick={() => removeFromCart(item)}
                >
                  <Close size={18} color="grey" />
                </ALink>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    </div>
  );
}
