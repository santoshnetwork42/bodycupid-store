import React from "react";
import Reveal from "react-awesome-reveal";
import ALink from "~/components/features/custom-link";

import OwlCarousel from "~/components/features/owl-carousel";
import ProductTwo from "~/components/features/product/product-two";
import { productSlider } from "~/utils/data/carousel";
import { fadeIn } from "~/utils/data/keyframes";

function ProductCollection({ products = [],title='',slug }) {
  return (
    <Reveal keyframes={fadeIn} delay={300} duration={1200} triggerOnce>
      <section className="product-wrapper product-collection container mt-6 mt-md-10 pt-4 product-card-wrapper">
        <div className="d-flex justify-content-between mb-5">
          <h2 className="capitalize-title m-0">{title}</h2>
          <ALink href={`/collections/${slug}`}>
            <p className="view-all  text-underline m-0">VIEW ALL</p>
          </ALink>
        </div>

        <OwlCarousel adClass="owl-theme owl-nav-full" options={productSlider}>
          {products.map((item) => (
            <ProductTwo
              tagSlug={slug}
              product={item}
              key={`top-selling-product-${item.id}`}
            />
          ))}
        </OwlCarousel>
      </section>
    </Reveal>
  );
}

export default React.memo(ProductCollection);
