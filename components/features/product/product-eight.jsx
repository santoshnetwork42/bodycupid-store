import React, { useMemo } from "react";
import { connect } from "react-redux";

import ALink from "~/components/features/custom-link";
import { Bag, Heart, HeartFilled, MagnifyingGlass } from "~/components/icons";
import { cartActions } from "~/store/cart";
import { modalActions } from "~/store/modal";
import { wishlistActions } from "~/store/wishlist";
import { toDecimal } from "~/utils";
import { getPublicImageURL } from "~/utils/getPublicImageUrl";
import { getProductMeta, getProductInventory } from "~/utils/products";
import OptimizedImage from "../optimized-image";

function ProductEight(props) {
  const {
    product,
    cartList,
    adClass,
    toggleWishlist,
    wishlist,
    addToCart,
    openQuickview,
  } = props;

  const { hasInventory } = useMemo(
    () => getProductInventory(product),
    [product]
  );

  const isCartItem = useMemo(
    () => cartList.some((cl) => cl.id === product.id),
    [cartList]
  );

  // decide if the product is wishlisted
  let isWishlisted;
  isWishlisted =
    wishlist.findIndex((item) => item.slug === product.slug) > -1
      ? true
      : false;

  const showQuickviewHandler = () => {
    openQuickview(product.slug);
  };

  const wishlistHandler = (e) => {
    if (toggleWishlist) {
      toggleWishlist(product);
    }

    e.preventDefault();
    let currentTarget = e.currentTarget;
    currentTarget.classList.add("load-more-overlay", "loading");

    setTimeout(() => {
      currentTarget.classList.remove("load-more-overlay", "loading");
    }, 1000);
  };

  const addToCartHandler = () => {
    addToCart({ ...product, qty: 1, price: product.price });
  };

  const { thumbImage, secondaryImage, discount } = getProductMeta(product);

  return (
    <div
      className={`product product-list ${adClass} ${
        product.variants && product.variants.items.length > 0
          ? "product-variable"
          : ""
      }`}
    >
      <figure className="product-media">
        <ALink href={`/product/${product.slug}`}>
          <OptimizedImage
            optimizedData={thumbImage.image}
            src={getPublicImageURL(thumbImage.imageKey)}
            alt={thumbImage.alt}
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
          {product.isNew ? (
            <label className="product-label label-new">New</label>
          ) : (
            ""
          )}
          {product.isTop ? (
            <label className="product-label label-top">Top</label>
          ) : (
            ""
          )}
          {!!discount ? (
            product.variants.items.length === 0 ? (
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
      </figure>

      <div className="product-details">
        <div className="product-cat">
          {product.categories
            ? product.categories.map((item, index) => (
                <React.Fragment key={item.name + "-" + index}>
                  <ALink
                    href={{ pathname: "/shop", query: { category: item.slug } }}
                  >
                    {item.name}
                    {index < product.categories.length - 1 ? ", " : ""}
                  </ALink>
                </React.Fragment>
              ))
            : ""}
        </div>

        <h3 className="product-name">
          <ALink href={`/product/${product.slug}`}>{product.title}</ALink>
        </h3>

        {!!product?.tags && (
          <label className="product-tag">
            {product?.tags.split(",").join(" | ")}
          </label>
        )}

        <div className="product-price">
          <ins className="new-price">₹{toDecimal(product.price || 0)}</ins>
        </div>

        <div className="ratings-container">
          <div className="ratings-full">
            <span
              className="ratings"
              style={{ width: Math.min(20 * product.rating, 100) + "%" }}
            ></span>
            <span className="tooltiptext tooltip-top">
              {toDecimal(product.ratings)}
            </span>
          </div>

          {!!product.totalRatings && (
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

        <p className="product-short-desc">{product.productDescription}</p>

        <div className="product-action">
          <div className="product-form-group cart-button-wrapper">
            {!!hasInventory ? (
              <>
                {isCartItem ? (
                  <ALink
                    href="/pages/cart"
                    className="btn-product btn-cart"
                    title="View Cart"
                  >
                    <i>
                      <Bag size={18} color="currentColor" />
                    </i>
                    <span>View Cart</span>
                  </ALink>
                ) : (
                  <ALink
                    href="#"
                    className="btn-product btn-cart"
                    title="Add to cart"
                    onClick={addToCartHandler}
                  >
                    <i>
                      <Bag size={18} color="currentColor" />
                    </i>
                    <span>Add to cart</span>
                  </ALink>
                )}
                <a
                  href="#"
                  className="btn-product-icon btn-wishlist"
                  title={
                    isWishlisted ? "Remove from wishlist" : "Add to wishlist"
                  }
                  onClick={wishlistHandler}
                >
                  <i>
                    {isWishlisted ? (
                      <HeartFilled size={20} color="currentColor" />
                    ) : (
                      <Heart size={20} color="currentColor" />
                    )}
                  </i>
                </a>
                <ALink
                  href="#"
                  className="btn-product-icon btn-quickview"
                  title="Quick View"
                  onClick={showQuickviewHandler}
                >
                  <i>
                    <MagnifyingGlass size={20} color="currentColor" />
                  </i>
                </ALink>
              </>
            ) : (
              <ALink
                href="#"
                className="btn-product btn-cart"
                title="Out of stock"
                onClick={showQuickviewHandler}
              >
                <span>Out of stock</span>
              </ALink>
            )}
          </div>
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
  ...modalActions,
})(ProductEight);
