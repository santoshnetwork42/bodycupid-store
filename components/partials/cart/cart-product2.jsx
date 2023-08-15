import React, { useMemo, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Logger } from "aws-amplify";

import ALink from "~/components/features/custom-link";
import Quantity from "~/components/features/quantity";
import { Close, Delete, Free } from "~/components/icons";

import { cartActions } from "~/store/cart";

import { getProductInventory } from "~/utils/products";
import { toDecimal } from "~/utils";
import { getPublicImageURL } from "~/utils/getPublicImageUrl";
import { getUpdatedCart } from "~/utils/helper";
import LimitedTimeProduct from "~/components/partials/cart/limited-time-product";
import { LIMITED_TIME_DEAL_DURATION } from "~/constant";
import useWindowDimensions from "~/utils/getWindowDimension";

const logger = new Logger("Cart-products");

function CartProduct2({
  item,
  inventory = 99999,
  cartList,
  removeFromCart,
  updateCart,
  appliedCoupon,
  removeCoupon,
  isSmall,
  ltoProducts,
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
    ltoProduct,
    addedAt,
  } = item;

  const [showMatchingLTOProduct, setShowMatchingLTOProduct] = useState(false);
  const { isSmallSize } = useWindowDimensions();

  useEffect(() => {
    const matchingLTOProduct = ltoProducts.find(
      (product) => product.id === item.ltoProduct
    );

    if (matchingLTOProduct) {
      const addedAtTimestamp = new Date(item.addedAt).getTime();
      const nowTimestamp = Date.now();
      const timeDifference = nowTimestamp - addedAtTimestamp;

      if (timeDifference <= 2 * 60 * 1000) {
        setShowMatchingLTOProduct(true);

        const timeoutId = setTimeout(() => {
          setShowMatchingLTOProduct(false);
        }, LIMITED_TIME_DEAL_DURATION * 60 * 1000 - timeDifference);

        return () => {
          clearTimeout(timeoutId);
        };
      }
    }

    setShowMatchingLTOProduct(false);
  }, [item, ltoProducts]);

  const productDiscountPercentage = ({ price, listingPrice }) => {
    return Math.round(((listingPrice - price) / listingPrice) * 100);
  };
  const savingPerProduct =
    cartItemSource === "COUPON" ? listingPrice : listingPrice - price;

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

  let matchingLTOProduct = ltoProducts.find(
    (product) => product.id === ltoProduct
  );

  const { hasInventory, currentInventory } = useMemo(
    () => getProductInventory(item, variantId),
    [variantId, slug]
  );

  if (isSmall)
    return (
      <div className="m-0 p-0 border-no">
        <div
          className={`cart-product-card mb-2 ${
            showMatchingLTOProduct ? "cart-product-padding" : "pb-0"
          }`}
        >
          <div className="mobile-specific-cart-product-container mobile-specific-cart d-flex p-relative">
            <div className="image-container">
              {isFreeProduct && (
                <div className="svg-overlay">
                  <Free />
                </div>
              )}
              {outOfStock && (
                <div class="overlay1">
                  <span class="overlay-text1">Out Of Stock</span>
                </div>
              )}
              <figure>
                <ALink href={"/products/" + slug} className="p-0 border-2">
                  <img
                    className="img2"
                    src={getPublicImageURL(thumbImage)}
                    width={isSmallSize ? "80" : "147"}
                    height={isSmallSize ? "80" : "147"}
                    alt={images?.items[0]?.alt}
                  />
                </ALink>
              </figure>
            </div>
            <div
              className={`cart-item-container ${
                isSmallSize ? "small-size" : ""
              }`}
            >
              <div className="text-left text-primary w-100 mr-1 ml-2">
                <div
                  className="cart-product-title cart-product-size"
                  title={title}
                >
                  <ALink
                    className="p-0 overflow-ellipsis "
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
                        <span className="discount-percentage ml-1 discount-card pl-1 pr-1">
                          Free
                        </span>
                      </>
                    ) : (
                      <>
                        <p className="m-0 product-discount-listing">
                          {price < listingPrice && (
                            <del className="summary-subtotal-listingprice mr-1">
                              ₹{toDecimal(listingPrice)}
                            </del>
                          )}
                          <span className="sm-product-amount font-weight-semi-bold">
                            ₹{toDecimal(price)}
                          </span>

                          {productDiscountPercentage(item) > 0 && (
                            <span
                              className={`discount-percentage discount-card ml-1`}
                            >
                              {productDiscountPercentage(item)}% off
                            </span>
                          )}
                        </p>
                      </>
                    )}
                  </div>
                )}
                {savingPerProduct > 0 &&
                  cartItemType !== "AUTO_FREE_PRODUCT_DISABLED" && (
                    <div className="product-savings">
                      You saved ₹
                      {isFreeProduct
                        ? toDecimal(price)
                        : toDecimal(savingPerProduct)}
                    </div>
                  )}
                {hasInventory && currentInventory < 10 && (
                  <>
                    <div className="text-secondary font-weight-semi-bold pt-1">
                      Only {currentInventory} left!
                    </div>
                  </>
                )}

                {cartItemType === "AUTO_FREE_PRODUCT_DISABLED" && (
                  <div className="mt-1 d-flex mb-1 align-items-center text-alert">
                    {couponMessage}
                  </div>
                )}
              </div>
              {!outOfStock && !isSmallSize && (
                <div className="cart-item-quantity">
                  {!!item?.variants?.items.length && !disableChange && (
                    <div className="card-margin-bottom ml-2">
                      <select
                        name={`${recordKey}`}
                        className="form-control variant-selection-form p-0"
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
                    </div>
                  )}
                  {!disableChange && (
                    <div className="product-quantity w-0">
                      {cartItemType === "FREE_PRODUCT" ? (
                        <>
                          {!!qty && (
                            <p className="text-grey mb-2 lh-1">Qty:{qty}</p>
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
                </div>
              )}
            </div>

            {/* <div className="text-left text-primary w-100 mr-1 ml-2">
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
          </div> */}

            {!hideRemove && (
              <div className="product-close">
                <ALink
                  href="#"
                  className="small-product-remove"
                  title="Remove this product"
                  onClick={onRemove}
                >
                  <Delete />
                </ALink>
              </div>
            )}
          </div>
          {isSmallSize && (
            <div className="d-flex justify-content-between mr-1">
              <div>
                {!!item?.variants?.items.length && !disableChange && (
                  <div className="card-margin-bottom ml-2">
                    <select
                      name={`${recordKey}`}
                      className="form-control variant-selection-form-small p-0"
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
                  </div>
                )}
              </div>
              {!disableChange && (
                <div className="product-quantity w-0">
                  {cartItemType === "FREE_PRODUCT" ? (
                    <>
                      {!!qty && (
                        <p className="text-grey mb-2 lh-1">Qty:{qty}</p>
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
            </div>
          )}
          {matchingLTOProduct && showMatchingLTOProduct && (
            <LimitedTimeProduct product={matchingLTOProduct} />
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
                <div className="product-quantity mb-0 w-0">
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
    ltoProducts: state.cart.ltoProducts,
  };
}

export default connect(mapStateToProps, {
  updateCart: cartActions.updateCart,
  removeFromCart: cartActions.removeFromCart,
  removeCoupon: cartActions.removeCoupon,
})(CartProduct2);
