import React from "react";
import Reveal from "react-awesome-reveal";

import OwlCarousel from "~/components/features/owl-carousel";

import ProductTwo from "~/components/features/product/product-two";

import { productSlider2 } from "~/utils/data/carousel";
import { fadeIn } from "~/utils/data/keyframes";

function FeaturedCollection({ products = [] }) {
  return (
    <Reveal keyframes={fadeIn} delay={600} duration={1200} triggerOnce>
      <section className="product-wrapper container mt-6 mt-md-10 pt-4 mb-10 pb-2">
        <h2 className="title title-center">Our Featured</h2>

        <OwlCarousel adClass="owl-theme" options={productSlider2}>
          {products &&
            products.map((item, index) => (
              <ProductTwo product={item} key={`featured-product-${index}`} />
            ))}
        </OwlCarousel>
      </section>
    </Reveal>
  );
}

export default React.memo(FeaturedCollection);
