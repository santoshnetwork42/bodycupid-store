import React from "react";
import Reveal from "react-awesome-reveal";
import ALink from "~/components/features/custom-link";

import OwlCarousel from "~/components/features/owl-carousel";

import ProductTwo from "~/components/features/product/product-two";

import { productSlider } from "~/utils/data/carousel";
import { fadeIn } from "~/utils/data/keyframes";

function FeaturedCollection({ products = [] }) {
  return (
    <Reveal keyframes={fadeIn} delay={600} duration={1200} triggerOnce>
      <section className="product-wrapper product-collection container pt-6 mt-md-10 pt-4 mb-10 pb-2 product-card-wrapper">
        <div className="d-flex justify-content-between mb-5">
          <h2 className="capitalize-title m-0">Our Featured</h2>
          <ALink href="#">
            <p className="view-all  text-underline m-0">VIEW ALL</p>
          </ALink>
        </div>

        <OwlCarousel adClass="owl-theme owl-nav-full" options={productSlider}>
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
