import React, { useMemo, useState } from "react";
import { connect } from "react-redux";

import ALink from "~/components/features/custom-link";
import { Star, MagnifyingGlass, Heart, HeartFilled } from "~/components/icons";
import { cartActions } from "~/store/cart";
import { modalActions } from "~/store/modal";
import { wishlistActions } from "~/store/wishlist";
import { toDecimal } from "~/utils";
import { getPublicImageURL } from "~/utils/getPublicImageUrl";
import {
  getProductMeta,
  getProductInventory,
  getFirstVariantId,
} from "~/utils/products";
import OptimizedImage from "../optimized-image";
import Quantity from "../quantity";

function ProductTwo(props) {
  const {
    cartList,
    product,
    adClass = "text-center",
    toggleWishlist,
    wishlist,
    addToCart,
    openQuickview,
    updateCart,
    removeFromCart,
    slug:tagSlug,
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

  const [quantity, setQuantity] = useState(1);
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

  const wishlistHandler = (e) => {
    if (toggleWishlist) {
      toggleWishlist({ ...product, notWishlisted: !isWishlisted });
    }

    e.preventDefault();
    let currentTarget = e.currentTarget;
    currentTarget.classList.add("load-more-overlay", "loading");

    setTimeout(() => {
      currentTarget.classList.remove("load-more-overlay", "loading");
    }, 1000);
  };

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
      qty: 1,
      price: price,
    });
  };

  const isCartItem = useMemo(
    () => cartList.some((cl) => cl.id === id),
    [cartList]
  );

  const { thumbImage, secondaryImage, discount } = getProductMeta(product);

  function changeQty(qty) {
    setQuantity(qty);
    if (isCartItem) {
      if (qty) {
        updateCart(
          cartList.map((item) => {
            return item.id === product.id ? { ...item, qty: qty } : item;
          })
        );
      } else {
        const id = getFirstVariantId(product);
        removeFromCart({ ...product, variantId: id });
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
              <label className="product-label label-sale">{discount}%</label>
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
          <a
            href="#"
            className="btn-product-icon btn-wishlist"
            title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            onClick={wishlistHandler}
          >
            {isWishlisted ? (
              <HeartFilled color="currentColor" size={18} />
            ) : (
              <Heart color="currentColor" size={18} />
            )}
          </a>
        </div>
      </figure>

      <div className="product-details">
        {/* <div className="product-tags">
          {product?.tags?.split(",").join(" | ") || <>&nbsp;</>}
        </div> */}

        <h3 className="product-name text-uppercase product-card-title p-0">
          <ALink href={`/product/${slug}`}>{title}</ALink>
        </h3>

        <div className="product-tags">
          {product?.tags?.split(",").join(" | ") || <>&nbsp;</>}
        </div>

        <div className="product-price product-sm mt-1 lh-1">
          <ins className="new-price mr-2">
            <span>MRP</span> ₹{toDecimal(price || 0)}
          </ins>
          {price < listingPrice && listingPrice && (
            <del className="old-price">₹{toDecimal(listingPrice || 0)}</del>
          )}
        </div>

        <div className="ratings-container">
          <div className="ratings-full d-flex rating-product-list">
            <Star size={20} color={"#d26e4b"} />
          </div>
          <span className="rating">{rating}</span>
          <ALink
            href={{
              pathname: `/product/${slug}`,
              query: { review: true },
            }}
            className="rating-reviews"
          >
            ( {totalRatings || 0} reviews )
          </ALink>
        </div>
        <div className="product-action">
          {!!hasInventory ? (
            <>
              {isCartItem ? (
                <Quantity
                  isProductList={true}
                  qty={quantity}
                  max={currentInventory}
                  product={product}
                  onChangeQty={changeQty}
                />
              ) : (
                <ALink
                  href="#"
                  className="btn-product btn-quickview m-0"
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
