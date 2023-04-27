import ALink from "~/components/features/custom-link";
import OwlCarousel from "~/components/features/owl-carousel";

import ProductTwo from "~/components/features/product/product-two";

import { mainSlider17 } from "~/utils/data/carousel";

export default function RelatedProducts(props) {
  const {
    products,
    adClass = "pt-3 mt-10",
    heading = "Related Products",
  } = props;

  return (
    products &&
    products.length > 0 && (
      <section className={`${adClass}`}>
        <div className="d-flex justify-content-between mb-5">
          <h2 className="capitalize-title m-0">{heading}</h2>
          <ALink href="#">
            <p className="view-all  text-underline m-0">VIEW ALL</p>
          </ALink>
        </div>

        <OwlCarousel
          adClass="owl-carousel owl-theme owl-nav-full"
          options={mainSlider17}
        >
          {products.slice(0, 5).map((item, index) => (
            <ProductTwo
              product={item}
              key={"product-two-" + index}
              adClass=""
            />
          ))}
        </OwlCarousel>
      </section>
    )
  );
}
