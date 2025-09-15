import React, { useEffect } from "react";
import Reveal from "react-awesome-reveal";

import ALink from "~/components/features/custom-link";
import dynamic from "next/dynamic";
const OwlCarousel = dynamic(() => import("~/components/features/owl-carousel"), {
  ssr: false,
});
import ProductTwo from "~/components/features/product/product-two";
import { getDefaultSorting } from "~/utils";

import { productSlider, productSliderLarge } from "~/utils/data/carousel";
import { fadeIn } from "~/utils/data/keyframes";

function RenderProductCollection({
  title = "",
  slug,
  disableCarousel,
  large,
  addClass,
  products,
  collection,
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
          {!!collection && (
            <ALink
              href={`/collections/${slug}?sortby=${getDefaultSorting(
                collection.defaultSorting
              )}`}
            >
              <p className="view-all  text-underline m-0">VIEW ALL</p>
            </ALink>
          )}
        </div>

        <OwlCarousel
          id={`product-carousel-${slug}`}
          adClass="owl-theme owl-nav-full"
          options={!large ? productSlider : productSliderLarge}
        >
          {products?.map((item) => (
            <ProductTwo
              adClass="mb-4 text-center"
              slug={slug}
              product={item}
              key={`${slug}-${item.id}`}
              section={{
                id: title.toLowerCase().replace(/\ /g, "-"),
                name: title,
              }}
            />
          ))}
        </OwlCarousel>
      </section>
    </Reveal>
  );
}

export default React.memo(RenderProductCollection);
