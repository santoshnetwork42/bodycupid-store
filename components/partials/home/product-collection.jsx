import React, { useEffect } from "react";
import Reveal from "react-awesome-reveal";

import ALink from "~/components/features/custom-link";

import OwlCarousel from "~/components/features/owl-carousel";
import ProductTwo from "~/components/features/product/product-two";
import ProductTwoV2 from "~/components/features/product/product-two-v2";
import {
  productSlider,
  productSliderLarge,
  cartProductSlider,
  cartProductSliderV2,
} from "~/utils/data/carousel";
import { fadeIn } from "~/utils/data/keyframes";

function ProductCollection({
  products = [],
  title = "",
  slug,
  redirectTo,
  disableCarousel,
  large,
  isCart,
  addClass,
  isV2,
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
        className={`product-wrapper product-collection container pt-6 pb-3 ${addClass}`}
      >
        <div className="d-flex justify-content-between collection-title mb-4">
          <h2 className="capitalize-title m-0">{title}</h2>
          {!!redirectTo && (
            <ALink href={redirectTo}>
              <p className="view-all  text-underline m-0">VIEW ALL</p>
            </ALink>
          )}
        </div>

        {isCart && isV2 && (
          <OwlCarousel
            id={`product-carousel-${slug}`}
            adClass="owl-theme owl-nav-full"
            options={
              isCart
                ? cartProductSliderV2
                : large
                ? productSliderLarge
                : productSlider
            }
          >
            {products.map((item) => (
              <ProductTwoV2
                adClass="abc mb-4 text-center"
                slug={slug}
                product={item}
                key={`top-selling-product-${item.id}`}
                section={{
                  id: title.toLowerCase().replace(/\ /g, "-"),
                  name: title,
                }}
                isCart={isCart}
                isV2={isV2}
              />
            ))}
          </OwlCarousel>
        )}

        {!isV2 && (
          <OwlCarousel
            id={`product-carousel-${slug}`}
            adClass="owl-theme owl-nav-full"
            options={
              isCart
                ? cartProductSlider
                : large
                ? productSliderLarge
                : productSlider
            }
          >
            {products.map((item) => (
              <ProductTwo
                adClass="mb-4 text-center"
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
        )}
      </section>
    </Reveal>
  );
}

export default React.memo(ProductCollection);
