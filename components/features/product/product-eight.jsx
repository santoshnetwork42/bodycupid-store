import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { connect } from "react-redux";

import ALink from "~/components/features/custom-link";

import { cartActions } from "~/store/cart";
import { modalActions } from "~/store/modal";
import { wishlistActions } from "~/store/wishlist";

import { toDecimal } from "~/utils";
import { getPublicImageURL } from "~/utils/getPublicImageUrl";

function ProductEight(props) {
  const {
    product,
    adClass,
    toggleWishlist,
    wishlist,
    addToCart,
    openQuickview,
  } = props;
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

  const addToCartHandler = (e) => {
    e.preventDefault();
    // addToCart({ ...product, qty: 1, price: product.price[0] });
    addToCart({ ...product, qty: 1, price: product.price });
  };

  const discount = !!(product.listingPrice && product.price)
    ? parseInt(
        ((product.listingPrice - product.price) * 100) / product.listingPrice,
        10
      )
    : 0;

  const thumbImage =
    product.images.items.find((i) => i.isThumb) || product.images.items[0];

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
          <LazyLoadImage
            alt={thumbImage?.alt}
            src={getPublicImageURL(thumbImage?.imageKey)}
            threshold={500}
            effect="opacity"
            width="300"
            height="338"
          />

          {product.images.items.length >= 2 && (
            <LazyLoadImage
              alt={product.images.items[1].alt}
              src={getPublicImageURL(product.images.items[1].imageKey)}
              threshold={500}
              width="300"
              height="338"
              effect="opacity"
              wrapperClassName="product-image-hover"
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

        <div className="product-price">
          {/* {
                        product.price[0] !== product.price[1] ?
                            product.variants && product.variants.length === 0 || (product.variants && product.variants.length > 0 && !product.variants[0].price) ?
                                <>
                                    <ins className="new-price">₹{toDecimal(product.price[0])}</ins>
                                    <del className="old-price">₹{toDecimal(product.price[1])}</del>
                                </>
                                :
                                < del className="new-price">₹{toDecimal(product.price[0])} – ₹{toDecimal(product.price[1])}</del>
                            : <ins className="new-price">₹{toDecimal(product.price[0])}</ins>
                    } */}
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

          <ALink href={`/product/${product.slug}`} className="rating-reviews">
            ( {product?.totalRatings} reviews )
          </ALink>
        </div>

        <p className="product-short-desc">{product.productDescription}</p>

        <div className="product-action">
        
          <a
            href="#"
            className="btn-product btn-cart"
            title="Add to cart"
            onClick={addToCartHandler}
          >
            <i className="d-icon-bag"></i>
            <span>Add to cart</span>
          </a>
          <a
            href="#"
            className="btn-product-icon btn-wishlist"
            title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            onClick={wishlistHandler}
          >
            <i
              className={isWishlisted ? "d-icon-heart-full" : "d-icon-heart"}
            ></i>
          </a>

          <ALink
            href="#"
            className="btn-product-icon btn-quickview"
            title="Quick View"
            onClick={showQuickviewHandler}
          >
            <i className="d-icon-search"></i>
          </ALink>
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    wishlist: state.wishlist.data ? state.wishlist.data : [],
  };
}

export default connect(mapStateToProps, {
  toggleWishlist: wishlistActions.toggleWishlist,
  addToCart: cartActions.addToCart,
  ...modalActions,
})(ProductEight);
