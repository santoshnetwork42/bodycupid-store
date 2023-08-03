import React, { useMemo } from "react";
import { connect } from "react-redux";
import { Logger } from "aws-amplify";

import ALink from "~/components/features/custom-link";
import Quantity from "~/components/features/quantity";
import { Close } from "~/components/icons";

import { cartActions } from "~/store/cart";

import { toDecimal } from "~/utils";
import { getPublicImageURL } from "~/utils/getPublicImageUrl";
import { getUpdatedCart } from "~/utils/helper";

const logger = new Logger("Cart-products");

function CartProduct({
  item,
  inventory = 99999,
  cartList,
  removeFromCart,
  updateCart,
  appliedCoupon,
  removeCoupon,
  isSmall,
}) {
  const {
    id,
    variants,
    recordKey,
    qty,
    slug,
    images,
    thumbImage,
    title,
    price,
    listingPrice,
    variantId,
    cartItemType,
    extraQty = 0,
    disableChange = false,
    hideRemove = false,
    cartItemSource,
    couponMessage,
  } = item;

  const productDiscountPercentage = ({ price, listingPrice }) => {
    return Math.round(((listingPrice - price) / listingPrice) * 100);
  };

  const changeVariant = (e) => {
    const variant = variants.items.find((c) => c.id === e.target.value);
    const newRecordKey = `${id}-${e.target.value}`;

    const cartItem = cartList.find((c) => c.recordKey === newRecordKey);
    if (cartItem) {
      const updatedCart = [...cartList]
        .filter((c) => c.recordKey !== recordKey)
        .map((c) => {
          if (c.recordKey === newRecordKey) return { ...c, qty: c.qty + qty };
          return c;
        });
      updateCart(updatedCart);
    } else {
      const updatedCart = getUpdatedCart(cartList, recordKey, {
        recordKey: newRecordKey,
        listingPrice: variant.listingPrice,
        price: variant.price,
        variantId: e.target.value,
      });
      updateCart(updatedCart);
    }
  };

  const onChangeQty = (newQty) => {
    const finalQty = newQty + extraQty;
    if (finalQty) {
      const cartData = getUpdatedCart(cartList, recordKey, {
        qty: finalQty,
      });
      updateCart(cartData);
    } else {
      removeFromCart(item);
    }
  };

  const onRemove = () => {
    onChangeQty(0);
    if (cartItemSource === "COUPON" && appliedCoupon?.getYProduct === id) {
      removeCoupon();
    }
  };

  useMemo(() => {
    logger.verbose("Rendering CartProduct");
    logger.debug("Item:", item);
    logger.debug("CartList:", cartList);
  }, [item, cartList]);

  const isFreeProduct = useMemo(
    () =>
      cartItemType === "FREE_PRODUCT" || cartItemType === "AUTO_FREE_PRODUCT",
    [cartItemType]
  );

  const outOfStock = qty > inventory;

  if (isSmall)
    return (
      <div className="m-0 p-0 border-no">
        <div className="mobile-specific-cart-product-container border-regular bg-white mb-2 d-flex p-relative pr-1 pl-4">
          {isFreeProduct && (
            <span className="ribbon top-left ribbon-success font-weight-bold">
              <small>FREE</small>
            </span>
          )}
          <figure>
            <ALink href={"/products/" + slug} className="p-0 border-2">
              <img
                src={getPublicImageURL(thumbImage)}
                width="80"
                height="80"
                alt={images?.items[0]?.alt}
              />
            </ALink>
          </figure>
          <div className="text-left text-primary w-100 mr-1 ml-2">
            <div className="mr-6 cart-product-title " title={title}>
              <ALink
                className="p-0 overflow-ellipsis font-weight-normal"
                href={"/products/" + slug}
              >
                {title}
              </ALink>
            </div>
            {cartItemType !== "AUTO_FREE_PRODUCT_DISABLED" && (
              <div className="mt-1 d-flex mb-1 align-items-center">
                {cartItemType === "FREE_PRODUCT" ||
                cartItemType === "AUTO_FREE_PRODUCT" ? (
                  <>
                    {!!price && (
                      <del className="summary-subtotal-listingprice">
                        ₹{toDecimal(price)}
                      </del>
                    )}
                    <span className="discount-percentage ml-1">Free</span>
                  </>
                ) : (
                  <>
                    <span className="sm-product-amount mr-2  font-weight-semi-bold ">
                      ₹{toDecimal(price)}
                    </span>

                    <p className="m-0 product-discount-listing">
                      {price < listingPrice && (
                        <del className="summary-subtotal-listingprice">
                          ₹{toDecimal(listingPrice)}
                        </del>
                      )}
                      <span className={`discount-percentage ml-2`}>
                        {productDiscountPercentage(item) > 0 &&
                          `${productDiscountPercentage(item)}% off`}
                      </span>
                    </p>
                  </>
                )}
              </div>
            )}
            {cartItemType === "AUTO_FREE_PRODUCT_DISABLED" && (
              <div className="mt-1 d-flex mb-1 align-items-center text-alert">
                {couponMessage}
              </div>
            )}
            {outOfStock ? (
              <div className="outofstock-tag">
                <p className="m-0 outofstock-label">out of stock</p>
              </div>
            ) : (
              <div>
                {!disableChange && (
                  <div className="product-quantity w-0 mb-1">
                    {cartItemType === "FREE_PRODUCT" ? (
                      <>
                        {!!qty && (
                          <p className="text-grey mb-2 lh-1 ">Qty:{qty}</p>
                        )}
                      </>
                    ) : (
                      <Quantity
                        product={item}
                        qty={qty}
                        max={inventory}
                        onChangeQty={onChangeQty}
                      />
                    )}
                  </div>
                )}
                {!!item?.variants?.items.length && !disableChange && (
                  <select
                    name={`${recordKey}`}
                    className="form-control"
                    value={variantId}
                    onChange={(e) => {
                      changeVariant(e);
                    }}
                  >
                    {variants.items.map((v) => (
                      <option key={v.id} value={v.id}>
                        {v.title}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            )}
          </div>

          {!hideRemove && (
            <div className="product-close">
              <ALink
                href="#"
                className="small-product-remove"
                title="Remove this product"
                onClick={onRemove}
              >
                <Close size={18} color="grey" />
              </ALink>
            </div>
          )}
        </div>
      </div>
    );

  return (
    <div className="m-0 p-0 border-no">
      <div className="mobile-specific-cart-product-container border-regular bg-white mb-2 d-flex p-relative">
        {isFreeProduct && (
          <span className="ribbon top-left ribbon-success font-weight-bold">
            <small>FREE</small>
          </span>
        )}
        <figure>
          <ALink href={"/products/" + slug}>
            <img
              src={getPublicImageURL(images.items[0]?.imageKey)}
              width="100"
              height="100"
              alt={images.items[0]?.alt}
            />
          </ALink>
        </figure>
        <div className="text-left text-primary w-100 mr-1 ml-2">
          <div className="mr-5 cart-product-title" title={title}>
            <ALink href={"/products/" + slug}>{title}</ALink>
          </div>
          {cartItemType !== "AUTO_FREE_PRODUCT_DISABLED" && (
            <div className="mt-1 d-flex mb-1 align-items-center">
              {cartItemType === "FREE_PRODUCT" ||
              cartItemType === "AUTO_FREE_PRODUCT" ? (
                <>
                  {!!price && (
                    <del className="summary-subtotal-listingprice">
                      ₹{toDecimal(price)}
                    </del>
                  )}
                  <span className="discount-percentage ml-1">Free</span>
                </>
              ) : (
                <>
                  <span className="sm-product-amount mr-2  font-weight-semi-bold ">
                    ₹{toDecimal(price)}
                  </span>

                  <p className="m-0 product-discount-listing">
                    {price < listingPrice && (
                      <del className="summary-subtotal-listingprice">
                        ₹{toDecimal(listingPrice)}
                      </del>
                    )}
                    <span className={`discount-percentage ml-2`}>
                      {productDiscountPercentage(item) > 0 &&
                        `${productDiscountPercentage(item)}% off`}
                    </span>
                  </p>
                </>
              )}
            </div>
          )}
          {cartItemType === "AUTO_FREE_PRODUCT_DISABLED" && (
            <div className="mt-1 d-flex mb-1 align-items-center text-alert">
              {couponMessage}
            </div>
          )}
          {outOfStock ? (
            <div className="outofstock-tag">
              <p className="m-0 outofstock-label">out of stock</p>
            </div>
          ) : (
            <div>
              {!disableChange && (
                <div className="product-quantity w-0 mb-1">
                  {cartItemType === "FREE_PRODUCT" ? (
                    <>
                      {!!qty && (
                        <p className="text-grey mb-2 lh-1 ">Qty:{qty}</p>
                      )}
                    </>
                  ) : (
                    <Quantity
                      product={item}
                      qty={qty}
                      max={inventory}
                      onChangeQty={onChangeQty}
                    />
                  )}
                </div>
              )}
              {!!item?.variants?.items.length && !disableChange && (
                <select
                  name={`${recordKey}`}
                  className="form-control ios-select"
                  value={variantId}
                  onChange={(e) => {
                    changeVariant(e);
                  }}
                >
                  {variants.items.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.title}
                    </option>
                  ))}
                </select>
              )}
            </div>
          )}
        </div>

        {!hideRemove && (
          <div className="product-close">
            <ALink
              href="#"
              className="sm-product-remove"
              title="Remove this product"
              onClick={onRemove}
            >
              <Close size={18} color="grey" />
            </ALink>
          </div>
        )}
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    cartList: state.cart.data,
    appliedCoupon: state.cart.coupon,
  };
}

export default connect(mapStateToProps, {
  updateCart: cartActions.updateCart,
  removeFromCart: cartActions.removeFromCart,
  removeCoupon: cartActions.removeCoupon,
})(CartProduct);
