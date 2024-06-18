import { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";

import ALink from "~/components/features/custom-link";
import Quantity from "~/components/features/quantity";
import { Delete, Free } from "~/components/icons";

import { useProductVariantGroups } from "@wow-star/utils";
import NextImage from "~/components/image";
import LimitedTimeProduct from "~/components/partials/cart/limited-time-product";
import LimitedTimeProductDeal from "~/components/partials/cart/limited-time-product-deal";
import { cartActions } from "~/store/cart";
import { toDecimal } from "~/utils";
import useWindowDimensions from "~/utils/getWindowDimension";
import { getUpdatedCart } from "~/utils/helper";
import {
  getProductInventory,
  productDiscountPercentage,
} from "~/utils/products";

function CartProduct({
  item,
  inventory = 99,
  cartList,
  removeFromCart,
  updateCart,
  removeCoupon,
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
    ltoDeal,
    cartItemSource,
    itemKey,
  } = item;

  const { isSmallSize } = useWindowDimensions();

  const [selectedVariant, variantGroup, onVariantChange] =
    useProductVariantGroups(item, variantId);

  const [variantUpdate, setVariantUpdate] = useState(false);

  const onChangeQty = (newQty) => {
    const finalQty = newQty + extraQty;
    const cartData = getUpdatedCart(cartList, recordKey, {
      qty: finalQty,
    });
    updateCart(cartData);
    if (!finalQty) {
      item.cartItemSource === "COUPON" ? removeCoupon() : removeFromCart(item);
    }
  };

  const onRemove = () => {
    onChangeQty(0);
  };

  const isFreeProduct =
    cartItemType === "FREE_PRODUCT" || cartItemType === "AUTO_FREE_PRODUCT";

  const outOfStock = qty > inventory;

  const { hasInventory, currentInventory } = useMemo(
    () => getProductInventory(item, variantId),
    [variantId, slug]
  );

  const handleOnChangeVariant = (v1, v2) => {
    onVariantChange(v1, v2);
  };

  useEffect(() => {
    if (selectedVariant && variantUpdate) {
      const {
        id: selectedId,
        listingPrice,
        price,
        minimumOrderQuantity,
        maximumOrderQuantity,
      } = selectedVariant;
      const newRecordKey = `${id}-${selectedId}`;
      const cartItem = cartList.find((c) => c.recordKey === newRecordKey);

      if (!cartItem) {
        const updatedCart = getUpdatedCart(cartList, recordKey, {
          qty: minimumOrderQuantity || 1,
          recordKey: newRecordKey,
          listingPrice: listingPrice,
          price: price,
          variantId: selectedId,
        });
        updateCart(updatedCart);
      } else {
        let finalQty = cartItem.qty + qty;
        if (maximumOrderQuantity) {
          finalQty =
            cartItem.qty + qty <= maximumOrderQuantity
              ? cartItem.qty + qty
              : maximumOrderQuantity;
        }

        const updatedCart = getUpdatedCart(cartList, cartItem.recordKey, {
          qty: finalQty,
          listingPrice: listingPrice,
          price: price,
          variantId: selectedId,
        });
        updateCart(updatedCart);
        removeFromCart(item);
      }
    }
    setVariantUpdate(false);
  }, [selectedVariant]);

  const [selectedVariantGroupOptions, setSelectedVariantGroupOptions] =
    useState([]);

  useEffect(() => {
    if (selectedVariant && variantGroup) {
      const { productVariantOptionIds } = selectedVariant;
      const finalGroup = productVariantOptionIds?.reduce((result, v1Item) => {
        const v2Item = variantGroup.find(
          (item) => item.id === v1Item.variantGroupId
        );
        if (v2Item) {
          const option = v2Item.variantOptions.find(
            (option) => option.id === v1Item.variantGroupOptionId
          );
          if (option) {
            result.push({
              variantGroupId: v1Item.variantGroupId,
              variantGroupOptionId: v1Item.variantGroupOptionId,
              label: option.label,
            });
          }
        }
        return result;
      }, []);
      setSelectedVariantGroupOptions([...(finalGroup || [])]);
    }
  }, [variantGroup, selectedVariant]);

  return (
    <div className="m-0 p-0 border-no">
      <div
        className={`cart-product-card mb-2 ${
          ltoDeal || ltoProduct ? "cart-product-padding" : "pb-0"
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
                <NextImage
                  className="img"
                  src={thumbImage}
                  width={isSmallSize ? 80 : 147}
                  height={isSmallSize ? 80 : 147}
                  alt={images?.items[0]?.alt}
                  priority
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
                      <p className="d-flex gap-8 m-0 product-discount-listing">
                        <div>
                          {price < listingPrice && (
                            <del className="summary-subtotal-listingprice mr-1">
                              ₹{toDecimal(listingPrice)}
                            </del>
                          )}
                          <span className="sm-product-amount font-weight-semi-bold">
                            ₹{toDecimal(price)}
                          </span>
                        </div>
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
                {!!variantGroup && !disableChange && (
                  <>
                    {variantGroup.map((v1, index) => {
                      const selectedOptionValue =
                        selectedVariantGroupOptions?.find(
                          (item) => item.variantGroupId === v1.id
                        )?.variantGroupOptionId ??
                        selectedVariantGroupOptions[index]
                          ?.variantGroupOptionId;

                      return (
                        <div className="card-margin-bottom ml-2" key={v1.id}>
                          <select
                            name={`${v1.id}`}
                            className="form-control-drop-down"
                            value={`${selectedOptionValue}`}
                            onChange={(e) => {
                              setVariantUpdate(true);
                              handleOnChangeVariant(v1.id, e.target.value);
                            }}
                          >
                            {v1.variantOptions.map((v) => {
                              return v.active ? (
                                <option key={v.id} value={v.id}>
                                  {v.title || v.label}
                                </option>
                              ) : null;
                            })}
                          </select>
                        </div>
                      );
                    })}
                  </>
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
                      <div className="d-flex-col gap-8">
                        <Quantity
                          product={item}
                          minimumOrderQuantity={
                            selectedVariant?.minimumOrderQuantity ||
                            item?.minimumOrderQuantity
                          }
                          maximumOrderQuantity={
                            selectedVariant?.maximumOrderQuantity ||
                            item?.maximumOrderQuantity
                          }
                          qty={qty}
                          max={inventory}
                          onChangeQty={onChangeQty}
                        />
                        {(selectedVariant?.minimumOrderQuantity ||
                          item?.minimumOrderQuantity) &&
                          (selectedVariant?.minimumOrderQuantity > 1 ||
                            item?.minimumOrderQuantity > 1) && (
                            <p className="text-primary lh-1 font-size-12 mb-0 min-order-msg">
                              Minimum Order Quantity:{" "}
                              {selectedVariant?.minimumOrderQuantity ||
                                item?.minimumOrderQuantity}
                            </p>
                          )}
                      </div>
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
              {!!variantGroup && !disableChange && (
                <>
                  {variantGroup.map((v1, index) => {
                    const selectedOptionValue =
                      selectedVariantGroupOptions?.find(
                        (item) => item.variantGroupId === v1.id
                      )?.variantGroupOptionId ??
                      selectedVariantGroupOptions[index]?.variantGroupOptionId;
                    return (
                      <>
                        <div className="card-margin-bottom ml-2" key={v1.id}>
                          <select
                            name={`${v1.id}`}
                            className="form-control-drop-down"
                            value={`${selectedOptionValue}`}
                            onChange={(e) => {
                              setVariantUpdate(true);
                              handleOnChangeVariant(v1.id, e.target.value);
                            }}
                          >
                            {v1.variantOptions.map((v) => {
                              return (
                                <option key={v.id} value={v.id}>
                                  {v.title || v.label}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </>
                    );
                  })}
                </>
              )}
            </div>
            {!disableChange && (
              <div className="product-quantity">
                {cartItemType === "FREE_PRODUCT" ? (
                  <>
                    {!!qty && (
                      <p className="text-grey mb-2 lh-1 text-alignment">
                        Qty:{qty}
                      </p>
                    )}
                  </>
                ) : (
                  <div className="d-flex-col gap-8">
                    <Quantity
                      product={item}
                      minimumOrderQuantity={
                        selectedVariant?.minimumOrderQuantity ||
                        item?.minimumOrderQuantity
                      }
                      maximumOrderQuantity={
                        selectedVariant?.maximumOrderQuantity ||
                        item?.maximumOrderQuantity
                      }
                      qty={qty}
                      max={inventory}
                      onChangeQty={onChangeQty}
                    />
                    {(selectedVariant?.minimumOrderQuantity ||
                      item?.minimumOrderQuantity) &&
                      (selectedVariant?.minimumOrderQuantity > 1 ||
                        item?.minimumOrderQuantity > 1) && (
                        <p className="text-primary lh-1 font-size-12 mb-0 min-order-msg-mobile">
                          Minimum Order Quantity:{" "}
                          {selectedVariant?.minimumOrderQuantity ||
                            item?.minimumOrderQuantity}
                        </p>
                      )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        {(!cartItemType || cartItemType === "CART") && (
          <>
            {!!ltoDeal && !outOfStock && (
              <LimitedTimeProductDeal
                parentRecordKey={recordKey}
                product={ltoDeal}
                addedAt={item.addedAt}
              />
            )}
            {!!ltoProduct && !outOfStock && (
              <LimitedTimeProduct product={ltoProduct} />
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
  };
}

export default connect(mapStateToProps, {
  updateCart: cartActions.updateCart,
  removeFromCart: cartActions.removeFromCart,
  removeCoupon: cartActions.removeCoupon,
})(CartProduct);
