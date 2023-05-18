import React from "react";

import ALink from "~/components/features/custom-link";

import { getPublicImageURL } from "~/utils/getPublicImageUrl";

export default function WishListPopup(props) {
  const { product } = props;

  return (
    <div className="minipopup-area">
      <div className="minipopup-box show" style={{ top: "0" }}>
        <p className="minipopup-title">Added to wishlist.</p>

        <div className="product product-purchased  product-cart mb-0">
          <figure className="product-media pure-media">
            <ALink href={`/products/${product.slug}`}>
              <img
                src={getPublicImageURL(product.images.items[0]?.imageKey)}
                alt={product.images.items[0]?.alt}
                width="90"
                height="90"
              />
            </ALink>
          </figure>
          <div className="product-detail">
            <ALink href={`/products/${product.slug}`} className="product-name">
              {product.title}
            </ALink>
          </div>
        </div>

        <div className="action-group justify-content-end d-flex">
          <div />
          <ALink
            href={`/pages/wishlist`}
            className="btn btn-sm btn-primary btn-rounded"
          >
            View Wishlist
          </ALink>
        </div>
      </div>
    </div>
  );
}
