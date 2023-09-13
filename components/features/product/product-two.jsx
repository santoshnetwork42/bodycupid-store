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

  const { title, slug, rating, totalRatings, collections } = product || {};

  const { price, listingPrice } = useProductPrice(product);

  const showQuickviewHandler = () => {
    openQuickview(slug);
    logger.verbose("Opened quick view for product:", slug);
  };

  const { hasInventory, currentInventory } = useMemo(
    () => getProductInventory(product),
    [product]
  );

  const label = product.collectionsList?.length
    ? product.collectionsList?.find((col) => !!col.label)?.label
    : null;

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
    if (isSearch) {
      showQuickviewHandler();
    } else {
      setCartVisibility(true);
      addToCart({
        ...product,
        section,
        qty: 1,
      });
      logger.verbose("Added product to cart");
      logger.debug("Added product to cart:", product);
    }
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
    <div className={`product text-left ${adClass} product-card`}>
      {/* <figure className="product-media"> */}
      <ALink href={`/products/${slug}`}>
        <Image
          src={getPublicImageURL(thumbImage?.imageKey)}
          alt={title}
          height={280}
          width={280}
          quality={95}
          objectFit="contain"
          priority={!!priority}
        />
      </ALink>

      <div className="product-label-group">
        {
          discount > 0 && (
            // (product.variants?.items?.length < 2 ? (
            <label className="product-label label-sale">-{discount}%</label>
          )
          // ) : (
          //   <label className="product-label label-sale">Sale</label>
          // ))
        }
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

      <div className="product-details card">
        <div className="details-wrapper">
          <h3 className="product-name text-uppercase product-card-title p-0 font-weight-semi-bold">
            <ALink href={`/products/${slug}`}>{title}</ALink>
          </h3>
          {/* <div className="product-tags lh-default">
            {product?.tags?.split(",").join(" | ") || <>&nbsp;</>}
          </div> */}
          <div className="ratings-container mb-0">
            <div className="ratings-full d-flex rating-product-list mr-1">
              <Star size={20} color={"#FAB73B"} />
            </div>
            <span className="rating">{rating}</span>
            <ALink
              href={{
                pathname: `/products/${slug}`,
                query: { review: true },
              }}
              className="rating-reviews"
            >
              ({totalRatings || 0} reviews)
            </ALink>
          </div>
        </div>
        <div className="product-price product-sm mt-2 mb-2 lh-1">
          <ins className="new-price ">₹{toDecimal(price || 0)}</ins>
          {price < listingPrice && listingPrice && (
            <span className="old-price ml-1 ">
              <del>₹{toDecimal(listingPrice || 0)}</del>
            </span>
          )}
        </div>
        <div className="product-action">
          {!!hasInventory ? (
            <>
              {!!cartItem ? (
                <Quantity
                  isProductList={true}
                  qty={cartItem.qty}
                  max={currentInventory}
                  product={product}
                  onChangeQty={changeQty}
                />
              ) : (
                <ALink
                  href="#"
                  className={`btn-product btn-primary btn-quickview m-0 ${
                    price <= 0 ? "disabled" : ""
                  }`}
                  title="Add to cart"
                  onClick={price > 0 ? addToCartHandler : undefined}
                  style={{ backgroundColor: price <= 0 ? "#ccc" : "" }}
                >
                  Add to cart
                </ALink>
              )}
            </>
          ) : (
            <ALink
              href="#"
              className="btn-product btn-sold-out m-0"
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
})(ProductTwo);
