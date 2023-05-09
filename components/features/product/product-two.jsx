import React, { useMemo } from "react";
import { connect } from "react-redux";

import ALink from "~/components/features/custom-link";
import { Star, MagnifyingGlass } from "~/components/icons";
import { cartActions } from "~/store/cart";
import { modalActions } from "~/store/modal";
import { wishlistActions } from "~/store/wishlist";
import { toDecimal } from "~/utils";
import { getPublicImageURL } from "~/utils/getPublicImageUrl";
import { getProductMeta, getProductInventory } from "~/utils/products";
import OptimizedImage from "../optimized-image";
import Quantity from "../quantity";
import { getRecordKey, getUpdatedCart } from "~/utils/helper";

function ProductTwo(props) {
  const {
    cartList,
    product,
    adClass = "text-center",
    wishlist,
    addToCart,
    openQuickview,
    updateCart,
    removeFromCart,
    slug: tagSlug,
    section,
  } = props;

  const {
    id,
    price,
    listingPrice,
    title,
    slug,
    isFeatured,
    rating,
    totalRatings,
    collections,
  } = product || {};

  // decide if the product is wishlisted
  let isWishlisted;
  isWishlisted =
    wishlist.findIndex((item) => item.id === id) > -1 ? true : false;

  const showQuickviewHandler = () => {
    openQuickview(slug);
  };

  const { hasInventory, currentInventory } = useMemo(
    () => getProductInventory(product),
    [product]
  );

  const tag = useMemo(() => {
    if (!collections) return;
    const result = collections.find((c) => c !== tagSlug);
    if (result) {
      return result.replace("-", " ").toUpperCase();
    }
    return;
  }, [collections]);

  const addToCartHandler = () => {
    addToCart({
      ...product,
      section,
      qty: 1,
      price: price,
    });
  };

  const cartItem = useMemo(() => {
    const recordKey = getRecordKey(product);
    return cartList.find((cl) => cl.recordKey === recordKey);
  }, [cartList]);

  const { thumbImage, secondaryImage, discount } = getProductMeta(product);

  function changeQty(qty) {
    if (cartItem) {
      if (qty) {
        const recordKey = getRecordKey(product);
        const cartData = getUpdatedCart(cartList, recordKey, { qty });
        updateCart(cartData);
      } else {
        removeFromCart({ ...cartItem });
      }
    }
  }

  return (
    <div className={`product text-left ${adClass} product-card`}>
      <figure className="product-media">
        <ALink href={`/product/${slug}`}>
          <OptimizedImage
            optimizedData={thumbImage?.image}
            src={getPublicImageURL(thumbImage?.imageKey)}
            alt={thumbImage?.alt}
          />
          {!!secondaryImage && (
            <OptimizedImage
              optimizedData={secondaryImage.image}
              src={getPublicImageURL(secondaryImage.imageKey)}
              alt={secondaryImage.alt}
              spanAttributes={{
                className: "product-image-hover",
              }}
            />
          )}
        </ALink>

        <div className="product-label-group">
          {isFeatured ? (
            <label className="product-label label-new">New</label>
          ) : (
            ""
          )}
          {isFeatured ? (
            <label className="product-label label-top">Top</label>
          ) : (
            ""
          )}
          {discount > 0 ? (
            product.variants?.items?.length < 2 ? (
              <label className="product-label label-sale">-{discount}%</label>
            ) : (
              <label className="product-label label-sale">Sale</label>
            )
          ) : (
            ""
          )}
        </div>
        {tag && (
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
            <MagnifyingGlass color="currentColor" size={18} />
          </ALink>
        </div>
      </figure>

      <div className="product-details">
        <div className="details-wrapper">
          <h3 className="product-name text-uppercase product-card-title p-0 font-weight-semi-bold">
            <ALink href={`/product/${slug}`}>{title}</ALink>
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
                pathname: `/product/${slug}`,
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
                  className="btn-product btn-primary btn-quickview m-0"
                  title="Add to cart"
                  onClick={addToCartHandler}
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
    wishlist: state.wishlist.data ? state.wishlist.data : [],
    cartList: state.cart.data || [],
  };
}

export default connect(mapStateToProps, {
  toggleWishlist: wishlistActions.toggleWishlist,
  addToCart: cartActions.addToCart,
  updateCart: cartActions.updateCart,
  removeFromCart: cartActions.removeFromCart,
  ...modalActions,
})(ProductTwo);
