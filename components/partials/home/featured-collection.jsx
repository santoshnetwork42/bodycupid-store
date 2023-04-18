import React from "react";
import Reveal from "react-awesome-reveal";

import OwlCarousel from "~/components/features/owl-carousel";

import ProductTwo from "~/components/features/product/product-two";

import { productSlider } from "~/utils/data/carousel";
import { fadeIn } from "~/utils/data/keyframes";

function FeaturedCollection({ products = [] }) {
  return (
    <Reveal keyframes={fadeIn} delay={600} duration={1200} triggerOnce>
      <section className="product-wrapper product-collection container mt-6 mt-md-10 pt-4 mb-10 pb-2">
        <h2 className="title title-center">Our Featured</h2>

        <OwlCarousel adClass="owl-theme owl-nav-full" options={productSlider}>
          {products.map((item) => (
            <ProductTwo product={item} key={`featured-product-${item.id}`} />
          ))}
        </OwlCarousel>
      </section>
    </Reveal>
  );
}

export default React.memo(FeaturedCollection);
