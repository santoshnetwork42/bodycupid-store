import { getPublicImageURL } from "~/utils/getPublicImageUrl";
import fetchData from "~/utils/fetchData";
import { STORE_ID } from "~/config";

import {
  getHomePageCategories,
  findProducts,
  getStoreBanners,
  getRecommendation,
} from "~/graphql/api";

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

    const getBestSellersPersonalized = fetchData(getRecommendation, {
      input: {
        storeId: STORE_ID,
        recommenderType: "BEST_SELLER",
        limit: 8,
      },
    });

    const [
      { searchProducts: searchBestSellerProducts },
      { getRecommendation: bestSellersPersonalized },
      { searchProducts: searchFeaturedProducts },
      { searchProductSubCategories },
      { getStore: store },
    ] = await Promise.all([
      getSearchProducts({ collections: { eq: "best-seller" } }),
      getBestSellersPersonalized,
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
        bestSellersPersonalized,
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
      revalidate: 60,
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
};
