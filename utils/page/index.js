import {
  GOOGLE_VERIFICATION_TAG,
  STORE_ID,
  WORDPRESS_AUTH,
  WORDPRESS_URL,
} from "~/config";
import {
  findProducts,
  getCollectionType,
  getHomePageCategories,
  getStoreBanners,
  getFeaturedBlogs,
} from "~/graphql/api";
import fetchData from "~/utils/fetchData";
import { getPublicImageURL } from "~/utils/getPublicImageUrl";
import { setSoldOutLast } from "~/utils/products";
import { getDefaultSorting } from "..";

export const getSearchProducts = async (filter, limit) => {
  const res = await fetchData(findProducts, {
    filter: {
      storeId: { eq: STORE_ID },
      status: { eq: "ENABLED" },
      ...filter,
    },
    limit: limit,
    sort: [{ field: "position", direction: "asc" }],
    variantFilter: {
      status: { eq: "ENABLED" },
    },
    imageLimit: 1,
  });

  return res;
};

const getCollectionBySlug = async (slug) => {
  const res = await fetchData(getCollectionType, {
    filter: {
      storeId: { eq: STORE_ID },
      slug: { eq: slug },
    },
  });
  return res;
};

const getProductSubCategory = async (limit) => {
  const res = await fetchData(getHomePageCategories, {
    filter: {
      isFeatured: { eq: true },
      storeId: { eq: STORE_ID },
      isArchive: { eq: false },
    },
    limit,
    sort: [{ field: "priority", direction: "asc" }],
  });

  return res;
};

export const getStaticProps = async () => {
  const [
    { searchProducts: searchBestSellerProducts },
    { getStore: store },
    { searchCollectionTypes: bestSellerCollectionItem },
    { searchProducts: searchFeaturedProducts },
    { searchCollectionTypes: featuredCollectionItem },
    { searchProductCategories: productSubCategoriesItem },
    blogRes,
  ] = await Promise.all([
    getSearchProducts({ collections: { eq: "best-seller" } }, 8),
    fetchData(getStoreBanners, { id: STORE_ID, deviceType: "WEB" }),
    getCollectionBySlug("best-seller"),
    getSearchProducts({ collections: { eq: "featured" } }, 8),
    getCollectionBySlug("featured"),
    getProductSubCategory(8),
    fetch(WORDPRESS_URL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: WORDPRESS_AUTH,
      },
      method: "POST",
      body: JSON.stringify({ query: getFeaturedBlogs }),
    }),
  ]);

  const blogData = await blogRes.json();

  const { items: bestSellerItems } = searchBestSellerProducts;
  const [bestSellerCollection] = bestSellerCollectionItem?.items;
  const { items: featuredItems } = searchFeaturedProducts;
  const [featuredCollection] = featuredCollectionItem?.items;
  const productSubCategories = productSubCategoriesItem?.items;
  const { title, name, description, webUrl, imageUrl, banners } = store;

  const bestSellerProducts = setSoldOutLast(bestSellerItems);
  const featuredProducts = setSoldOutLast(featuredItems);

  return {
    props: {
      store,
      hero: { banners },
      bestSellerProducts,
      featuredProducts,
      productSubCategories,
      pageMeta: {
        siteName: name,
        title,
        description,
        canonical: webUrl,
        image: getPublicImageURL(imageUrl),
        googleVerificationTag: GOOGLE_VERIFICATION_TAG ?? null,
      },
      bestSellerDefaultSorting: getDefaultSorting(
        bestSellerCollection?.defaultSorting
      ),
      featuredCollection,
      featuredblogs: blogData?.data?.posts?.edges || [],
    },
    revalidate: 1800,
  };
};
