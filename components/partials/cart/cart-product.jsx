import React, { useMemo } from "react";
import { connect } from "react-redux";
import { Logger } from "aws-amplify";

import ALink from "~/components/features/custom-link";
import Quantity from "~/components/features/quantity";
import { Delete, Free } from "~/components/icons";

import { cartActions } from "~/store/cart";
import {
  getProductInventory,
  productDiscountPercentage,
} from "~/utils/products";
import { toDecimal } from "~/utils";
import { getPublicImageURL } from "~/utils/getPublicImageUrl";
import { getUpdatedCart } from "~/utils/helper";
import LimitedTimeProductDeal from "~/components/partials/cart/limited-time-product-deal";
import LimitedTimeProduct from "~/components/partials/cart/limited-time-product";
import useWindowDimensions from "~/utils/getWindowDimension";

const logger = new Logger("Cart-products");

function CartProduct({
  item,
  inventory = 99,
  cartList,
  removeFromCart,
  updateCart,
  ltoProducts,
  removeCoupon
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
    couponMessage,
    ltoProduct,
    ltoRecordKey,
  } = item;

  const { isSmallSize } = useWindowDimensions();

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

    const cartData = getUpdatedCart(cartList, recordKey, {
        qty: finalQty,
      });
    updateCart(cartData);
    if (!finalQty) {
      if(item.cartItemSource === "COUPON") removeCoupon()
      removeFromCart(item);
    }
  };

  const onRemove = () => {
    onChangeQty(0);
  };

  const isFreeProduct =
    cartItemType === "FREE_PRODUCT" || cartItemType === "AUTO_FREE_PRODUCT";

  const outOfStock = qty > inventory;

  const matchingLTOProduct = ltoProducts.find(
    (product) => product.id === ltoProduct
  );

  const ltoDealProduct = cartList.find(
    (cartItem) => cartItem.recordKey === ltoRecordKey
  );

  const { hasInventory, currentInventory } = useMemo(
    () => getProductInventory(item, variantId),
    [variantId, slug]
  );

  return (
    <div className="m-0 p-0 border-no">
      <div
        className={`cart-product-card mb-2 ${
          matchingLTOProduct || ltoDealProduct ? "cart-product-padding" : "pb-0"
        }`}
      >
        <div className="mobile-specific-cart-product-container mobile-specific-cart d-flex p-relative">
          <div className="image-container">
            {isFreeProduct && (
              <div className="svg-overlay">
                <Free size={isSmallSize ? 40 : 48} />
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
            } ${
              isFreeProduct || cartItemType === "AUTO_FREE_PRODUCT_DISABLED"
                ? "free-product"
                : ""
            }`}
          >
            <div className="text-left text-primary w-100 pr-2 ml-2">
              <div
                className="cart-product-title cart-product-size"
                title={title}
              >
                <ALink
                  className="p-0 overflow-ellipsis2"
                  href={"/products/" + slug}
                >
                  {title}
                </ALink>
              </div>
              {cartItemType !== "AUTO_FREE_PRODUCT_DISABLED" && (
                <div className="mt-1 d-flex align-items-center">
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
                          <div>
                            <span
                              className={`discount-percentage discount-card pl-1 pr-1 font-weight-bolder`}
                            >
                              {productDiscountPercentage(item)}% off
                            </span>
                          </div>
                        )}
                      </p>
                    </>
                  )}
                </div>
              )}

              {cartItemType === "FREE_PRODUCT" && (
                <>
                  {!!qty && <p className="text-grey mb-2 lh-1 ">Qty:{qty}</p>}
                </>
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
            {!outOfStock && !isSmallSize && !isFreeProduct && (
              <div className="cart-item-quantity">
                {!!item?.variants?.items.length && !disableChange && (
                  <div className="card-margin-bottom ml-2">
                    <select
                      name={`${recordKey}`}
                      className="form-control-drop-down"
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
                  <div className="product-quantity mb-0">
                    {cartItemType === "FREE_PRODUCT" ? (
                      <>
                        {!!qty && (
                          <p className="text-grey mb-2 lh-1 text-alignment">
                            Qty:{qty}
                          </p>
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
        {isSmallSize && !isFreeProduct && !outOfStock && (
          <div className="d-flex justify-content-between mr-1">
            <div>
              {!!item?.variants?.items.length && !disableChange && (
                <div className="card-margin-bottom ml-2">
                  <select
                    name={`${recordKey}`}
                    className="form-control-drop-down"
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
                      <p className="text-grey mb-2 lh-1 text-alignment">
                        Qty:{qty}
                      </p>
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

        {!cartItemType && (
          <>
            {!!matchingLTOProduct && !outOfStock && (
              <LimitedTimeProductDeal
                parentRecordKey={recordKey}
                product={matchingLTOProduct}
                addedAt={item.addedAt}
              />
            )}
            {!!ltoDealProduct && !outOfStock && (
              <LimitedTimeProduct product={ltoDealProduct} />
            )}
          </>
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
  removeCoupon: cartActions.removeCoupon
})(CartProduct);
