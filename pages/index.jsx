import React from "react";
import dynamic from "next/dynamic";

import { useWindowDimensions } from "~/utils/getWindowDimension";

import NextHead from "~/components/common/next-head";
import IntroSection from "~/components/partials/home/intro-section";
import ProductCollection from "~/components/partials/home/product-collection";
import Fomo from "~/components/common/fomo";

const CategorySection = dynamic(() =>
  import("~/components/partials/home/category-section")
);
const BrandSection = dynamic(() =>
  import("~/components/partials/home/brand-section")
);
const ReviewSection = dynamic(() =>
  import("~/components/partials/home/review-section")
);
const RenderProductCollection = dynamic(() =>
  import("~/components/partials/home/render-product-collection")
);

export { getStaticProps } from "~/utils/page";

function HomePage({
  hero,
  bestSellerProducts,
  featuredProducts,
  store,
  pageMeta,
  bestSellerDefaultSorting,
  featuredCollection,
  productSubCategories,
}) {
  const { name } = store || {};
  const { isSmallSize } = useWindowDimensions();

  return (
    <main className="main home searchBar">
      <NextHead {...pageMeta} />
      <Fomo />
      <h1 className="d-none">{name} - Homepage</h1>
      <div className="page-content page-content-wrapper">
        <div className="intro-section">
          <IntroSection {...hero} />
        </div>

        <ProductCollection
          products={bestSellerProducts}
          title="Best sellers"
          disableCarousel={isSmallSize}
          slug="best-seller"
          redirectTo={`/collections/best-seller?sortby=${bestSellerDefaultSorting}`}
          priority
        />

        {/* <RenderProductCollection
          title="Top products"
          disableCarousel={isSmallSize}
          slug="top-products"
          filter={{ collections: { eq: "top-products" } }}
        /> */}

        <RenderProductCollection
          title="Our featured"
          slug="featured"
          products={featuredProducts}
          collection={featuredCollection}
        />

        <CategorySection categories={productSubCategories} />
        <ReviewSection />
        <BrandSection
          brands={[
            "/images/brands/1.png",
            "/images/brands/2.png",
            "/images/brands/6.png",
            "/images/brands/7.png",
            "/images/brands/8.png",
            "/images/brands/9.png",
          ]}
        />
      </div>
    </main>
  );
}

HomePage.showStickyCheckout = true;
HomePage.showTopRunner = true;
HomePage.showTimer = true;
export default HomePage;
