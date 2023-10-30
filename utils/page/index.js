import { getPublicImageURL } from "~/utils/getPublicImageUrl";
import fetchData from "~/utils/fetchData";
import { STORE_ID, GOOGLE_VERIFICATION_TAG } from "~/config";
import {
  getHomePageCategories,
  findProducts,
  getStoreBanners,
  getCollectionType,
} from "~/graphql/api";
import { setSoldOutLast } from "~/utils/products";
import { getDefaultSorting } from "..";

const getSearchProducts = (filter, limit) =>
  fetchData(findProducts, {
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

const getCollectionBySlug = (slug) => {
  return fetchData(getCollectionType, {
    filter: {
      storeId: { eq: STORE_ID },
      slug: { eq: slug },
    },
  });
};

export const getStaticProps = async () => {
  try {
    const getSearchProductSubCategories = fetchData(getHomePageCategories, {
      limit: 8,
      filter: {
        isFeatured: { eq: true },
        storeId: { eq: STORE_ID },
        isArchive: { eq: false },
      },
      sort: [{ field: "priority", direction: "asc" }],
    });

    const getStoreData = fetchData(getStoreBanners, { id: STORE_ID });

    const [
      { searchProducts: searchBestSellerProducts },
      { searchProducts: searchFeaturedProducts },
      { searchProducts: searchTopProducts },
      { searchProductSubCategories },
      { getStore: store },
      { searchCollectionTypes: bestSellerCollectionItem },
      { searchCollectionTypes: featuredCollectionItem },
    ] = await Promise.all([
      getSearchProducts({ collections: { eq: "best-seller" } }, 8),
      getSearchProducts({ collections: { eq: "featured" } }, 8),
      getSearchProducts({ collections: { eq: "top-products" } }, 12),
      getSearchProductSubCategories,
      getStoreData,
      getCollectionBySlug("best-seller"),
      getCollectionBySlug("featured"),
    ]);

    const { items: bestSellerItems } = searchBestSellerProducts;
    const { items: featuredItems } = searchFeaturedProducts;
    const { items: recommendedTopProducts } = searchTopProducts;
    const { items: categories } = searchProductSubCategories;
    const [bestSellerCollection] = bestSellerCollectionItem.items;
    const [featuredCollection] = featuredCollectionItem.items;

    const { title, name, description, webUrl, imageUrl, banners } = store;

    const excludeItems = bestSellerItems.map((b) => b.id);
    const filteredTopProducts = recommendedTopProducts.filter(
      ({ id }) => !excludeItems.includes(id)
    );

    const bestSellerProducts = setSoldOutLast(bestSellerItems);
    const featuredProducts = setSoldOutLast(featuredItems);
    const topProducts = setSoldOutLast(filteredTopProducts);

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
          googleVerificationTag: GOOGLE_VERIFICATION_TAG ?? null,
        },
        bestSellerDefaultSorting: getDefaultSorting(
          bestSellerCollection.defaultSorting
        ),
        featuredDefaultSorting: getDefaultSorting(
          featuredCollection.defaultSorting
        ),
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
