import React from "react";

import ALink from "~/components/features/custom-link";

import OwlCarousel from "~/components/features/owl-carousel";
import ProductTwo from "~/components/features/product/product-two";
import { productSlider } from "~/utils/data/carousel";

function ProductCollection({ products = [], title = "", slug, redirectTo }) {
  return (
    <section className="product-wrapper product-collection container mt-md-10 pt-4 pb-2">
      <div className="d-flex justify-content-between mb-4">
        <h2 className="capitalize-title m-0">{title}</h2>
        <ALink href={redirectTo}>
          <p className="view-all  text-underline m-0">VIEW ALL</p>
        </ALink>
      </div>

      <OwlCarousel adClass="owl-theme owl-nav-full" options={productSlider}>
        {products.map((item) => (
          <ProductTwo
            slug={slug}
            product={item}
            key={`top-selling-product-${item.id}`}
            section={{
              id: title.toLowerCase().replace(/\ /g, "-"),
              name: title,
            }}
          />
        ))}
      </OwlCarousel>
    </section>
  );
}

export default React.memo(ProductCollection);
