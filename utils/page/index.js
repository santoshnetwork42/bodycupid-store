import { getPublicImageURL } from "~/utils/getPublicImageUrl";
import fetchData from "~/utils/fetchData";
import { STORE_ID, GOOGLE_VERIFICATION_TAG } from "~/config";
import {
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
    const getStoreData = fetchData(getStoreBanners, { id: STORE_ID });

    const [
      { searchProducts: searchBestSellerProducts },
      { getStore: store },
      { searchCollectionTypes: bestSellerCollectionItem },
    ] = await Promise.all([
      getSearchProducts({ collections: { eq: "best-seller" } }, 8),
      getStoreData,
      getCollectionBySlug("best-seller"),
    ]);

    const { items: bestSellerItems } = searchBestSellerProducts;
    const [bestSellerCollection] = bestSellerCollectionItem.items;

    const { title, name, description, webUrl, imageUrl, banners } = store;

    const bestSellerProducts = setSoldOutLast(bestSellerItems);

    return {
      props: {
        hero: { banners },
        bestSellerProducts,
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
      },
      revalidate: 1800,
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
};
