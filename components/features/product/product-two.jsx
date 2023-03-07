import React from "react";
import { connect } from "react-redux";

import ALink from "~/components/features/custom-link";

import { cartActions } from "~/store/cart";
import { modalActions } from "~/store/modal";
import { wishlistActions } from "~/store/wishlist";

import { toDecimal } from "~/utils";
import { getPublicImageURL } from "~/utils/getPublicImageUrl";
import OptimizedImage from "../optimized-image";

function ProductTwo(props) {
  const {
    product,
    adClass = "text-center",
    toggleWishlist,
    wishlist,
    addToCart,
    openQuickview,
    isCategory = true,
  } = props;

  // decide if the product is wishlisted
  let isWishlisted;
  isWishlisted =
    wishlist.findIndex((item) => item.id === product.id) > -1 ? true : false;

  const showQuickviewHandler = () => {
    openQuickview(product.slug);
  };

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

  const addToCartHandler = (e) => {
    e.preventDefault();
    addToCart({
      ...product,
      qty: 1,
      price: product.price,
    });
  };

  const discount = !!(product.listingPrice && product.price)
    ? parseInt(
        ((product.listingPrice - product.price) * 100) / product.listingPrice,
        10
      )
    : 0;

  const images = product?.images.items.sort((a, b) => a.position - b.position);

  const thumbImage = images?.find((i) => i.isThumb) ||
    images[0] || { imageKey: product.imageUrl };

  return (
    <div className={`product text-left ${adClass}`}>
      <figure className="product-media">
        <ALink href={`/product/${product.slug}`}>
          {thumbImage?.image ? (
            <OptimizedImage
              optimizedData={thumbImage.image}
              alt={thumbImage.alt}
            />
          ) : (
            <span>
              <img src={getPublicImageURL(thumbImage?.imageKey)} />
            </span>
          )}

          {product.images.items.length > 1 ? (
            <>
              {product.images.items[1].image ? (
                <OptimizedImage
                  optimizedData={product.images.items[1].image}
                  alt={product.images.items[1].alt}
                  spanAttributes={{
                    className: "product-image-hover",
                  }}
                />
              ) : (
                <span className="product-image-hover">
                  <img
                    src={getPublicImageURL(product.images.items[1].imageKey)}
                    alt={product.images.items[1].alt}
                  />
                </span>
              )}
            </>
          ) : null}
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
          <a
            href="#"
            className="btn-product-icon btn-cart"
            title="Add to cart"
            onClick={addToCartHandler}
          >
            <i className="d-icon-bag"></i>
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
        </div>

        <div className="product-action">
          <ALink
            href="#"
            className="btn-product btn-quickview"
            title="Quick View"
            onClick={showQuickviewHandler}
          >
            Quick View
          </ALink>
        </div>
      </figure>

      <div className="product-details">
        {isCategory ? (
          <div className="product-cat">
            {product.categories
              ? product.categories.map((item, index) => (
                  <React.Fragment key={item.name + "-" + index}>
                    <ALink
                      href={{
                        pathname: "/collections/[category]",
                        query: { category: item.slug },
                      }}
                    >
                      {item.name}
                      {index < product.categories.length - 1 ? ", " : ""}
                    </ALink>
                  </React.Fragment>
                ))
              : ""}
          </div>
        ) : (
          ""
        )}

        <h3 className="product-name">
          <ALink href={`/product/${product.slug}`}>{product.title}</ALink>
        </h3>

        {!!product?.tags && (
          <label className="product-tag">
            {product?.tags.split(",").join(" | ")}
          </label>
        )}

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
          {/* <ins className="new-price">₹{toDecimal(product.price)}</ins> */}
          <ins className="new-price">₹{toDecimal(product.price || 0)}</ins>
        </div>

        <div className="ratings-container">
          <div className="ratings-full">
            {/* // TODO  we have to consider about this */}
            {/* <span className="ratings" style={{ width: Math.min(20 * product.rating, 100)s + '%' }}></span>
                        <span className="tooltiptext tooltip-top">{toDecimal(product.ratings)}</span> */}
            <span
              className="ratings"
              style={{ width: Math.min(20 * product.rating, 100) + "%" }}
            ></span>
            <span className="tooltiptext tooltip-top">
              {toDecimal(product.rating)}
            </span>
          </div>

          {!!product?.totalRatings && (
            <ALink href={`/product/${product.slug}`} className="rating-reviews">
              ( {product?.totalRatings} reviews )
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
  };
}

export default connect(mapStateToProps, {
  toggleWishlist: wishlistActions.toggleWishlist,
  addToCart: cartActions.addToCart,
  ...modalActions,
})(ProductTwo);
