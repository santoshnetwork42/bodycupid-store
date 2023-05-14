import React from "react";
import Head from "next/head";
import { connect } from "react-redux";

import IntroSection from "~/components/partials/home/intro-section";
import CategorySection from "~/components/partials/home/category-section";
import {
  getHomePageCategories,
  findProducts,
  getStoreBanners,
} from "~/graphql/api";
import fetchData from "~/utils/fetchData";
import { STORE_ID } from "~/config";
import BrandSection from "~/components/partials/home/brand-section";
import ReviewSection from "~/components/partials/home/review-section";
import StorySection from "~/components/partials/home/story-section";
import ProductCollection from "~/components/partials/home/product-collection";
import { useWindowDimensions } from "~/utils/getWindowDimension";

function HomePage({
  hero,
  bestSellerProducts,
  featuredProducts,
  categories,
  brands,
  store,
}) {
  const { name } = store || {};
  const { isSmallSize } = useWindowDimensions();

  return (
    <main className="main home searchBar">
      <Head>
        <title>{name} - Home</title>
      </Head>

      <h1 className="d-none">{name} - Homepage</h1>
      <div className="page-content page-content-wrapper">
        <div className="intro-section">
          <StorySection categories={categories} />
          <IntroSection {...hero} />
        </div>
        <ProductCollection
          products={bestSellerProducts}
          title="Best sellers"
          disableCarousel={isSmallSize}
          slug="best-seller"
          redirectTo="/collections/best-seller"
        />
        <ProductCollection
          products={featuredProducts}
          title="Our featured"
          slug="featured"
          redirectTo="/collections/featured"
        />
        <CategorySection categories={categories} />
        <ReviewSection />
        <BrandSection brands={brands} />
      </div>
    </main>
  );
}

export const getStaticProps = async () => {
  try {
    const getSearchProducts = (filter) =>
      fetchData(findProducts, {
        filter: {
          storeId: { eq: STORE_ID },
          status: { eq: "ENABLED" },
          ...filter,
        },
        limit: 8,
        sort: [{ field: "position", direction: "asc" }],
        variantFilter: {
          status: { eq: "ENABLED" },
        },
        imageLimit: 1,
      });

    const getSearchProductSubCategories = fetchData(getHomePageCategories, {
      limit: 8,
      filter: { isFeatured: { eq: true }, storeId: { eq: STORE_ID } },
      sort: [{ field: "priority", direction: "asc" }],
    });

    const getStoreData = fetchData(getStoreBanners, { id: STORE_ID });

    const [
      { searchProducts: searchBestSellerProducts },
      { searchProducts: searchFeaturedProducts },
      { searchProductSubCategories },
      { getStore: store },
    ] = await Promise.all([
      getSearchProducts({ collections: { eq: "best-seller" } }),
      getSearchProducts({ collections: { eq: "featured" } }),
      getSearchProductSubCategories,
      getStoreData,
    ]);

    const { items: bestSellerItems } = searchBestSellerProducts;
    const { items: featuredItems } = searchFeaturedProducts;
    const { items: categories } = searchProductSubCategories;
    const { banners } = store;

    const bestSellerProducts = bestSellerItems;
    const featuredProducts = featuredItems;

    const brands = [
      "/images/brands/1.png",
      "/images/brands/2.png",
      "/images/brands/6.png",
      "/images/brands/7.png",
      "/images/brands/8.png",
      "/images/brands/9.png",
    ];

    return {
      props: {
        hero: { banners },
        bestSellerProducts,
        featuredProducts,
        categories,
        brands,
      },
      revalidate: 43200,
    };
  } catch (e) {
    console.log(e);
    return {
      notFound: true,
    };
  }
};

function mapStateToProps() {
  return {};
}
const Component = connect(mapStateToProps)(HomePage);
Component.showStickyCheckout = true;
Component.showTopRunner = true;
export default Component;
