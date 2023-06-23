import React from "react";
import dynamic from "next/dynamic";

import { getPublicImageURL } from "~/utils/getPublicImageUrl";
import { useWindowDimensions } from "~/utils/getWindowDimension";
import fetchData from "~/utils/fetchData";
import { STORE_ID } from "~/config";

import {
  getHomePageCategories,
  findProducts,
  getStoreBanners,
} from "~/graphql/api";

import NextHead from "~/components/common/next-head";
import IntroSection from "~/components/partials/home/intro-section";
// import StorySection from "~/components/partials/home/story-section";

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

function V1Page({
  hero,
  bestSellerProducts,
  featuredProducts,
  categories,
  // storyCategories,
  brands,
  store,
  pageMeta,
}) {
  const { name } = store || {};
  const { isSmallSize } = useWindowDimensions();

  return (
    <main className="main home searchBar">
      <NextHead {...pageMeta} />

      <h1 className="d-none">{name} - V1Page</h1>
      <div className="page-content page-content-wrapper product-collection-large">
        <div className="intro-section">
          {/* <StorySection categories={storyCategories} /> */}
          <IntroSection {...hero} />
          <script
            async
            type="text/javascript"
            src="//asset.fwcdn3.com/js/embed-feed.js"
          ></script>
          <fw-embed-feed
            channel="body_cupid"
            playlist="gYeK2g"
            mode="row"
            open_in="default"
            max_videos="0"
            placement="middle"
            player_placement="bottom-right"
          ></fw-embed-feed>
        </div>

        <ProductCollection
          products={bestSellerProducts}
          title="Best sellers"
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

    const { title, name, description, webUrl, imageUrl } = store;

    // const storyCategories = [
    //   {
    //     category: {
    //       slug: "combos-and-gifts",
    //     },
    //     slug: "combos-and-gifts",
    //     id: "combos-and-gifts",
    //     name: "Combos and Gifts",
    //     staticImage: "/images/categories/combos-and-gifts.jpg",
    //     priority: 0,
    //   },

    //   ...categories,
    // ];

    return {
      props: {
        hero: { banners },
        bestSellerProducts,
        featuredProducts,
        categories,
        // storyCategories,
        brands,
        pageMeta: {
          siteName: name,
          title,
          description,
          canonical: webUrl,
          image: getPublicImageURL(imageUrl),
        },
      },
      revalidate: 43200,
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
};

V1Page.showStickyCheckout = true;
V1Page.showTopRunner = true;
V1Page.couponBanner = true;
export default V1Page;
