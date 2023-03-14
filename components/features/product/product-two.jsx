import { useRouter } from "next/router";
import React, { useMemo } from "react";
import { connect } from "react-redux";

import ALink from "~/components/features/custom-link";

import { cartActions } from "~/store/cart";
import { modalActions } from "~/store/modal";
import { wishlistActions } from "~/store/wishlist";

import { toDecimal } from "~/utils";
import { getPublicImageURL } from "~/utils/getPublicImageUrl";
import { getProductMeta } from "~/utils/helper";
import OptimizedImage from "../optimized-image";

function ProductTwo(props) {
  const {
    cartList,
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

  const { thumbImage, discount } = getProductMeta(product);

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
          <ALink
            href="#"
            className="btn-product-icon btn-cart"
            title="Quick View"
            onClick={showQuickviewHandler}
          >
            <i className="d-icon-search"></i>
          </ALink>
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

        <h3 className="product-name p-0">
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
          {isCartItem ? (
            <ALink
              href="/pages/cart"
              className="btn-product btn-quickview m-0"
              title="View Cart"
            >
              View Cart
            </ALink>
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
})(ProductTwo);
