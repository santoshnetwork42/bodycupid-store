import React, { useMemo } from "react";
import { connect } from "react-redux";
import Image from "next/image";
import { Logger } from "aws-amplify";
import ALink from "~/components/features/custom-link";
import { Star, Eye } from "~/components/icons";
import { cartActions } from "~/store/cart";
import { modalActions } from "~/store/modal";
import { toDecimal } from "~/utils";
import { getPublicImageURL } from "~/utils/getPublicImageUrl";
import { getProductMeta, getProductInventory } from "~/utils/products";
import Quantity from "~/components/features/quantity";
import { getRecordKey, getUpdatedCart } from "~/utils/helper";
import { useProductPrice } from "~/utils/hooks/useProduct";
import { PRODUCT_TAG_LIST } from "~/constant";

const logger = new Logger("Product-details");

function ProductTwoV2(props) {
  const {
    setCartVisibility,
    cartList,
    product,
    adClass = "text-center",
    addToCart,
    openQuickview,
    updateCart,
    removeFromCart,
    slug: tagSlug,
    section,
    priority,
    isCart,
    isV2,
  } = props;

  const { title, slug, collections } = product || {};

  const { price, listingPrice } = useProductPrice(product);

  const showQuickviewHandler = () => {
    openQuickview(slug);
    logger.verbose("Opened quick view for product:", slug);
  };

  const { hasInventory, currentInventory } = useMemo(
    () => getProductInventory(product),
    [product]
  );

  const tag = useMemo(() => {
    if (PRODUCT_TAG_LIST.includes(tagSlug)) {
      return tagSlug.replace("-", " ").toUpperCase();
    }
    if (!collections) return;
    const [result] = collections.filter((c) => PRODUCT_TAG_LIST.includes(c));
    if (result) {
      return result.replace("-", " ").toUpperCase();
    }
    return;
  }, [collections]);

  const addToCartHandler = () => {
    setCartVisibility(true);
    addToCart({
      ...product,
      section,
      qty: 1,
    });
    logger.verbose("Added product to cart");
    logger.debug("Added product to cart:", product);
  };

  const cartItem = useMemo(() => {
    const recordKey = getRecordKey(product);
    return cartList.find((cl) => cl.recordKey === recordKey);
  }, [cartList]);

  const { thumbImage, discount } = getProductMeta(product);

  function changeQty(qty) {
    if (cartItem) {
      if (qty) {
        const recordKey = getRecordKey(product);
        const cartData = getUpdatedCart(cartList, recordKey, { qty });
        updateCart(cartData);
        logger.verbose("Updated product quantity in cart");
        logger.debug(
          "Updated product quantity in cart:",
          product,
          "New quantity:",
          qty
        );
      } else {
        removeFromCart({ ...cartItem });
        logger.verbose("Removed product from cart");
        logger.debug("Removed product from cart:", cartItem);
      }
    }
  }

  return (
    <div className={`product text-left ${adClass} product-card-v2`}>
      {/* <figure className="product-media"> */}

      <div className="d-flex justify-content-center align-items-center">
        <ALink href={`/products/${slug}`} className={"product-image-v2"}>
          <Image
            src={getPublicImageURL(thumbImage?.imageKey)}
            alt={title}
            height={180}
            width={180}
            quality={95}
            objectFit="contain"
            priority={!!priority}
          />
        </ALink>
      </div>

      {!!tag && (
        <div className="product-tags-group">
          <label className="product-label label-best-seller">{tag}</label>
        </div>
      )}

      <div className="product-action-vertical">
        <ALink
          href="#"
          className="btn-product-icon btn-cart"
          title="Quick View"
          onClick={showQuickviewHandler}
        >
          <Eye color="currentColor" size={18} />
        </ALink>
      </div>
      {/* </figure> */}

      <div className="product-details card-v2">
        <div className="details-wrapper-v2">
          <h3 className="product-name text-uppercase product-card-title p-0 font-weight-semi-bold">
            <ALink
              href={`/products/${slug}`}
              className="product-title-ellipsis"
            >
              {title}
            </ALink>
          </h3>
          {/* <div className="product-tags lh-default">
            {product?.tags?.split(",").join(" | ") || <>&nbsp;</>}
          </div> */}
        </div>

        <div className="d-flex justify-content-center align-items-center discount mt-2 mb-2">
          <label
            className={
              discount > 0 ? "discount-label" : "discount-without-label"
            }
          >
            {discount > 0 ? discount + "% off" : ""}
          </label>
        </div>

        <div className="product-price-v2 product-sm-v2 mt-2 mb-2 lh-1">
          {price < listingPrice && listingPrice && (
            <span className="old-price mr-3">
              <del>₹{toDecimal(listingPrice || 0)}</del>
            </span>
          )}
          <strong className="new-price-v2 ">₹{toDecimal(price || 0)}</strong>
        </div>
        <div className="product-action-v2 mr-auto ml-auto">
          {!!hasInventory ? (
            <>
              {!!cartItem ? (
                <Quantity
                  isProductList={true}
                  qty={cartItem.qty}
                  max={currentInventory}
                  product={product}
                  onChangeQty={changeQty}
                  isCart={isCart}
                  isV2={isV2}
                />
              ) : (
                <ALink
                  href="#"
                  className={`btn-product btn-primary btn-quickview m-0 ${
                    price <= 0 ? "disabled" : ""
                  } ${isCart && isV2 ? "btn-product-v2" : ""}`}
                  title="Add to cart"
                  onClick={price > 0 ? addToCartHandler : undefined}
                  style={{ backgroundColor: price <= 0 ? "#ccc" : "" }}
                >
                  <strong>Add</strong>
                </ALink>
              )}
            </>
          ) : (
            <ALink
              href="#"
              className={`"btn-product btn-sold-out m-0" ${
                isCart && isV2 ? "btn-product-v2" : ""
              }`}
              title="Sold Out"
            >
              Sold Out
            </ALink>
          )}
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    cartList: state.cart.data || [],
  };
}

export default connect(mapStateToProps, {
  addToCart: cartActions.addToCart,
  updateCart: cartActions.updateCart,
  removeFromCart: cartActions.removeFromCart,
  ...modalActions,
})(ProductTwoV2);
