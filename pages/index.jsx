import React from "react";
import dynamic from "next/dynamic";

import { useWindowDimensions } from "~/utils/getWindowDimension";

import NextHead from "~/components/common/next-head";
import IntroSection from "~/components/partials/home/intro-section";

const CategorySection = dynamic(() =>
  import("~/components/partials/home/category-section")
);
const BrandSection = dynamic(() =>
  import("~/components/partials/home/brand-section")
);
const ReviewSection = dynamic(() =>
  import("~/components/partials/home/review-section")
);
const ProductCollection = dynamic(() =>
  import("~/components/partials/home/product-collection")
);

export { getStaticProps } from "~/utils/page";

function HomePage({
  hero,
  bestSellerProducts,
  topProducts,
  featuredProducts,
  categories,
  brands,
  store,
  pageMeta,
  bestSellerDefaultSorting,
  featuredDefaultSorting,
}) {
  const { name } = store || {};
  const { isSmallSize } = useWindowDimensions();

  return (
    <main className="main home searchBar">
      <NextHead {...pageMeta} />

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
        />

        {!!topProducts?.length && (
          <ProductCollection
            products={topProducts}
            title="Top products"
            disableCarousel={isSmallSize}
            slug="top-products"
            redirectTo="/collections/top-products"
          />
        )}

        <ProductCollection
          products={featuredProducts}
          title="Our featured"
          slug="featured"
          redirectTo={`/collections/featured?sortby=${featuredDefaultSorting}`}
        />
        <CategorySection categories={categories} />
        <ReviewSection />
        <BrandSection brands={brands} />
      </div>
    </main>
  );
}

HomePage.showStickyCheckout = true;
HomePage.showTopRunner = true;
export default HomePage;
