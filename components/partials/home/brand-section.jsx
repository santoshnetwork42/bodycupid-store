import React from "react";
import Reveal from "react-awesome-reveal";
import OptimizedImage from "~/components/features/optimized-image";

import OwlCarousel from "~/components/features/owl-carousel";

import { brandSlider } from "~/utils/data/carousel";
import { fadeIn } from "~/utils/data/keyframes";

function BrandSection({ brands }) {
  return (
    <Reveal keyframes={fadeIn} duration={1200} delay={300} triggerOnce>
      <section className="mt-2 pb-6 pt-10 pb-md-10">
        <h2 className="title d-none">Our Brand</h2>

        <div className="container">
          <OwlCarousel adClass="owl-theme brand-carousel" options={brandSlider}>
            {brands.map((brand) => (
              <figure key={brand.originalUrl}>
                <OptimizedImage optimizedData={brand} alt="Brand" />
              </figure>
            ))}
          </OwlCarousel>
        </div>
      </section>
    </Reveal>
  );
}

export default React.memo(BrandSection);
