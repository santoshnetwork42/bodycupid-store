import { getPublicImageURL } from "~/utils/getPublicImageUrl";
import fetchData from "~/utils/fetchData";
import { STORE_ID } from "~/config";
import {
  getHomePageCategories,
  findProducts,
  getStoreBanners,
} from "~/graphql/api";
import getRecommendedProducts from "../recommendedProduct";
import { setSoldOutLast } from "~/utils/products";

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

export const getStaticProps = async () => {
  try {
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
      recommendedProducts,
    ] = await Promise.all([
      getSearchProducts({ collections: { eq: "best-seller" } }),
      getSearchProducts({ collections: { eq: "featured" } }),
      getSearchProductSubCategories,
      getStoreData,
      getRecommendedProducts(),
    ]);

    const { items: bestSellerItems } = searchBestSellerProducts;
    const { items: featuredItems } = searchFeaturedProducts;
    const { items: categories } = searchProductSubCategories;
    const { banners } = store;

    const bestSellerProducts = setSoldOutLast(bestSellerItems);
    const featuredProducts = setSoldOutLast(featuredItems);
    const topProducts = setSoldOutLast(recommendedProducts);

    const brands = [
      "/images/brands/1.png",
      "/images/brands/2.png",
      "/images/brands/6.png",
      "/images/brands/7.png",
      "/images/brands/8.png",
      "/images/brands/9.png",
    ];

    const { title, name, description, webUrl, imageUrl } = store;

    return {
      props: {
        hero: { banners },
        bestSellerProducts,
        topProducts,
        featuredProducts,
        categories,
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
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
};
