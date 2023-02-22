import React from "react";

import ALink from "~/components/features/custom-link";

import { toDecimal } from "~/utils";
import { getPublicImageURL } from "~/utils/getPublicImageUrl";

export default function CartPopup(props) {
  const { product, isWishList } = props;

  return (
    <div className="minipopup-area">
      <div className="minipopup-box show" style={{ top: "0" }}>
        <p className="minipopup-title">Successfully added.</p>

        <div className="product product-purchased  product-cart mb-0">
          <figure className="product-media pure-media">
            <ALink href={`/product/${product.slug}`}>
              <img
                src={getPublicImageURL(product.images.items[0]?.imageKey)}
                alt={product.images.items[0]?.alt}
                width="90"
                height="90"
              />
            </ALink>
          </figure>
          <div className="product-detail">
            <ALink href={`/product/${product.slug}`} className="product-name">
              {product.title}
            </ALink>
            <span className="price-box">
              <span className="product-quantity">{product.qty}</span>
              <span className="product-price">₹{toDecimal(product.price)}</span>
            </span>
          </div>
        </div>

        <div className="action-group justify-between d-flex">
          <ALink
            href={`/pages/${isWishList ? "wishlist" : "Cart"}`}
            className="btn btn-sm btn-outline btn-primary btn-rounded"
          >
            View {isWishList ? "WishList" : "Cart"}
          </ALink>
          {!isWishList && (
            <ALink
              href="/pages/checkout"
              className="btn btn-sm btn-primary btn-rounded"
            >
              Check Out
            </ALink>
          )}
        </div>
      </div>
    </div>
  );
}
