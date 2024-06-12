import React, { useEffect } from "react";
import Reveal from "react-awesome-reveal";

import ALink from "~/components/features/custom-link";
import EmblaCarousel from "~/components/features/react-embla";
import ProductTwo from "~/components/features/product/product-two";
import { productSlider, productSliderLarge } from "~/utils/data/carousel";
import { fadeIn } from "~/utils/data/keyframes";

function ProductCollection({
  products = [],
  title = "",
  slug,
  redirectTo,
  disableCarousel,
  large,
  addClass,
  priority,
}) {
  useEffect(() => {
    const ele = document.getElementById(`product-carousel-${slug}`);
    if (ele) {
      if (disableCarousel) {
        ele.classList.remove("owl-carousel");
        ele.classList.add("remove-carousel");
      } else {
        ele.classList.add("owl-carousel");
        ele.classList.remove("remove-carousel");
      }
    }
  }, [disableCarousel]);

  return (
    <Reveal
      keyframes={fadeIn}
      delay={300}
      duration={1200}
      triggerOnce
      className={`product-widget-wrapper ${addClass}`}
    >
      <section
        className={`product-wrapper product-collection container pt-6 pb-3`}
      >
        <div className="d-flex justify-content-between collection-title mb-4">
          <h2 className="capitalize-title m-0">{title}</h2>
          {!!redirectTo && (
            <ALink href={redirectTo}>
              <p className="view-all  text-underline m-0">VIEW ALL</p>
            </ALink>
          )}
        </div>

        <EmblaCarousel
          id={`product-carousel-${slug}`}
          options={{
            loop: false,
            align: "center",
            slidesToScroll: "auto",
          }}
          containerStyle={{ marginLeft: "-1rem" }}
        >
          {products.map((item, index) => (
            <div
              key={`top-selling-product-${item.id}`}
              style={{ paddingLeft: "1rem" }}
              className="product-collection-item"
            >
              <ProductTwo
                adClass="text-center mb-4"
                slug={slug}
                product={item}
                section={{
                  id: title.toLowerCase().replace(/\ /g, "-"),
                  name: title,
                }}
                priority={!!(priority && index < 4)}
              />
            </div>
          ))}
        </EmblaCarousel>
      </section>
    </Reveal>
  );
}

export default React.memo(ProductCollection);
