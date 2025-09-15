"use client";

import dynamic from "next/dynamic";
const IntroSection = dynamic(() => import("~/components/partials/home/intro-section"), { ssr: false });
const ProductCollection = dynamic(() => import("~/components/partials/home/product-collection"), { ssr: false });
import { useWindowDimensions } from "~/utils/getWindowDimension";

const CategorySection = dynamic(() => import("~/components/partials/home/category-section"), { ssr: false });
const BrandSection = dynamic(() => import("~/components/partials/home/brand-section"), { ssr: false });
const ExploreBlogSection = dynamic(() => import("~/components/partials/home/explore-blog-section"), { ssr: false });
const ReviewSection = dynamic(() => import("~/components/partials/home/review-section"), { ssr: false });
const RenderProductCollection = dynamic(() => import("~/components/partials/home/render-product-collection"), { ssr: false });

export default function HomePage({
  hero,
  bestSellerProducts,
  featuredProducts,
  store,
  pageMeta,
  bestSellerDefaultSorting,
  featuredblogs,
  featuredCollection,
  productSubCategories,
}) {
  const { name } = store || {};
  const { isSmallSize } = useWindowDimensions();

  return (
    <main className="main home searchBar">
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

        <RenderProductCollection
          title="Our featured"
          slug="featured"
          products={featuredProducts}
          collection={featuredCollection}
        />

        <CategorySection categories={productSubCategories} />
        <ReviewSection />
        <ExploreBlogSection blogs={featuredblogs} />
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
