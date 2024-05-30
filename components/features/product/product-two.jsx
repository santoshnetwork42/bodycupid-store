import { useProduct, useProductVariantGroups } from "@wow-star/utils";
import { Logger } from "aws-amplify";
import { useMemo } from "react";
import { connect } from "react-redux";
import Image from "~/components/image";

import ALink from "~/components/features/custom-link";
import Quantity from "~/components/features/quantity";
import { Star } from "~/components/icons";
import { PRODUCT_TAG_LIST } from "~/constant";
import { cartActions } from "~/store/cart";
import { modalActions } from "~/store/modal";
import { getCartCount, toDecimal } from "~/utils";
import { getRecordKey, getUpdatedCart } from "~/utils/helper";

const logger = new Logger("Product-details");

function ProductTwo(props) {
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
    isSearch,
  } = props;

  const [selectedVariant] = useProductVariantGroups(product);
  const productsNew = useProduct(product, selectedVariant?.id);

  const {
    title,
    slug,
    rating,
    totalRatings,
    collections,
    price,
    listingPrice,
    hasInventory,
    currentInventory,
    thumbImage,
    discount,
  } = productsNew || {};

  // const totalCartItems =
  //   getCartCount(cartList) + productsNew?.minimumOrderQuantity || 1;

  // const showCartModal =
  //   totalCartItems > 0 && totalCartItems % 8 !== 0 ? false : true;

  const showQuickviewHandler = () => {
    openQuickview(slug);
    logger.verbose("Opened quick view for product:", slug);
  };

  let selectedLabel = product?.collectionsList?.length
    ? product?.collectionsList?.find((col) => !!col.label)
    : "";
  product?.collectionsList?.map((item) => {
    if (!!item?.label?.trim() && item?.priority > selectedLabel?.priority) {
      selectedLabel = item;
    }
  });

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

  const productLabel = selectedLabel?.label?.trim() || tag;

  const addToCartHandler = (e) => {
    e?.preventDefault();
    addToCart({
      ...productsNew,
      section,
      qty: productsNew?.minimumOrderQuantity || 1,
    });
    // if (tagSlug === "bundle-offer") {
    //   showCartModal && setCartVisibility(true);
    // } else setCartVisibility(true);

    logger.verbose("Added product to cart");
    logger.debug("Added product to cart:", product);

    return false;
  };

  const cartItem = useMemo(() => {
    const recordKey = getRecordKey(productsNew);
    return cartList.find((cl) => cl.recordKey === recordKey);
  }, [cartList]);

  // const { thumbImage, discount } = getProductMeta(product);

  function changeQty(qty) {
    if (cartItem) {
      if (qty) {
        const recordKey = getRecordKey(product);
        const cartData = getUpdatedCart(cartList, recordKey, { qty });
        updateCart(cartData);
        // tagSlug === "bundle-offer" && showCartModal && setCartVisibility(true);
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
  // const imageKey = isSearch ? product.imageUrl : thumbImage?.imageKey;

  return (
    <div className={`product text-left ${adClass} product-card`}>
      {/* <figure className="product-media"> */}
      {!!thumbImage?.imageKey && (
        <ALink href={`/products/${slug}`}>
          <Image
            src={thumbImage?.imageKey}
            alt={title}
            height={280}
            width={280}
            quality={50}
            objectFit="contain"
            priority={!!priority}
          />
        </ALink>
      )}

      <div className="product-label-group">
        {discount > 0 && (
          <label className="product-label label-sale">-{discount}%</label>
        )}
      </div>

      {!!productLabel && (
        <div className="product-tags-group">
          <label className="product-label label-best-seller">
            {productLabel}
          </label>
        </div>
      )}

      {/* </figure> */}

      <div className="product-details card">
        <ALink href={`/products/${slug}`}>
          <div className="details-wrapper">
            <h3 className="product-name product-title-min-height text-uppercase product-card-title p-0 font-weight-semi-bold">
              {title}
            </h3>
            {/* <div className="product-tags lh-default">
            {product?.tags?.split(",").join(" | ") || <>&nbsp;</>}
          </div> */}
            {/* <div className="product-coupon">{selectedLabel?.label?.trim()}</div> */}
            {!!product?.benefits && (
              <div className="product-card-benefits">
                {product?.benefits.join(" | ")}
              </div>
            )}

            <div className="ratings-container mb-0">
              {!!totalRatings && totalRatings > 0 && (
                <>
                  <div className="ratings-full d-flex rating-product-list mr-1">
                    <Star size={18} color={"#FAB73B"} />
                  </div>
                  <span className="rating text-black font-weight-bold">
                    {rating}
                  </span>
                  ({totalRatings} reviews)
                </>
              )}
            </div>
            <div className="product-price product-sm mt-2 mb-2 lh-1">
              <ins className="new-price ">₹{toDecimal(price || 0)}</ins>
              {price < listingPrice && listingPrice && (
                <span className="old-price ml-1 ">
                  <del>₹{toDecimal(listingPrice || 0)}</del>
                </span>
              )}
            </div>
          </div>
        </ALink>
        <div className="product-action">
          {isSearch ? (
            <a
              href="#"
              className={`btn-product btn-primary btn-quickview m-0`}
              title="Add to cart"
              onClick={addToCartHandler}
              style={{ backgroundColor: price <= 0 ? "#ccc" : "" }}
            >
              View product{" "}
            </a>
          ) : (
            <>
              {!!hasInventory ? (
                <>
                  {!!cartItem ? (
                    <Quantity
                      isProductList={true}
                      qty={cartItem.qty}
                      max={currentInventory}
                      product={productsNew}
                      minimumOrderQuantity={
                        productsNew?.minimumOrderQuantity || 1
                      }
                      maximumOrderQuantity={
                        productsNew?.maximumOrderQuantity || 99
                      }
                      onChangeQty={changeQty}
                    />
                  ) : (
                    <a
                      href="#"
                      className={`btn-product btn-primary btn-quickview m-0 ${
                        price <= 0 ? "disabled" : ""
                      }`}
                      title="Add to cart"
                      onClick={addToCartHandler}
                      style={{ backgroundColor: price <= 0 ? "#ccc" : "" }}
                    >
                      Add to cart
                    </a>
                  )}
                </>
              ) : (
                <a
                  href="#"
                  className="btn-product btn-sold-out m-0"
                  title="Sold Out"
                >
                  Sold Out
                </a>
              )}
            </>
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
})(ProductTwo);
