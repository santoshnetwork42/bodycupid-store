import React from "react";
import Image from "next/image";
import Reveal from "react-awesome-reveal";

import { fadeIn } from "~/utils/data/keyframes";

function BrandSection({ brands }) {
  return (
    <Reveal keyframes={fadeIn} duration={1200} delay={300} triggerOnce>
      <section className="mt-2 pb-6 pt-4 pb-md-10">
        <div className="container">
          <h2 className="title capitalize-title mb-2">As featured in</h2>
          <div className="row brand-carousel">
            {brands.map((brand) => (
              <div className="col-6 col-md-4 col-lg-2 " key={brand}>
                <figure>
                  <Image
                    src={brand}
                    width={200}
                    height={120}
                    objectFit="contain"
                    alt="Brand"
                  />
                </figure>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Reveal>
  );
}

export default React.memo(BrandSection);
