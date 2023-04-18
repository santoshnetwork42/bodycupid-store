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
  } = props;

  const [quantity, setQuantity] = useState(1);
  // decide if the product is wishlisted
  let isWishlisted;
  isWishlisted =
    wishlist.findIndex((item) => item.id === product.id) > -1 ? true : false;

  const showQuickviewHandler = () => {
    openQuickview(product.slug);
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

  const addToCartHandler = () => {
    addToCart({
      ...product,
      qty: 1,
      price: product.price,
    });
  };

  const isCartItem = useMemo(
    () => cartList.some((cl) => cl.id === product.id),
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
        <ALink href={`/product/${product.slug}`}>
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
          {product.isFeatured ? (
            <label className="product-label label-new">New</label>
          ) : (
            ""
          )}
          {product.isFeatured ? (
            <label className="product-label label-top">Top</label>
          ) : (
            ""
          )}
          {discount > 0 ? (
            product.variants?.items?.length < 2 ? (
              <label className="product-label label-sale">
                {discount}% OFF
              </label>
            ) : (
              <label className="product-label label-sale">Sale</label>
            )
          ) : (
            ""
          )}
        </div>

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

        <h3 className="product-name product-card-title p-0">
          <ALink href={`/product/${product.slug}`}>{product.title}</ALink>
        </h3>

        <div className="product-price">
          <ins className="new-price">₹{toDecimal(product.price || 0)}</ins>
        </div>

        <div className="ratings-container">
          <div className="ratings-full">
            {Array.from({ length: 5 }).map((_, index) => {
              const isFilled = index + 1 <= product.rating;

              return <Star size={13} color={isFilled ? "#d26e4b" : "#999"} />;
            })}
            <span className="tooltiptext tooltip-top">
              {toDecimal(product.rating)}
            </span>
          </div>

          {!!product?.totalRatings && (
            <ALink
              href={{
                pathname: `/product/${product.slug}`,
                query: { review: true },
              }}
              className="rating-reviews"
            >
              ( {product?.totalRatings} reviews )
            </ALink>
          )}
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
              className="btn-product btn-quickview m-0"
              title="Out of stock"
              onClick={showQuickviewHandler}
            >
              Out of stock
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
