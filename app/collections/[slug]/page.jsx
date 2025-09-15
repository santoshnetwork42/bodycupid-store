export const revalidate = 1800;
export const dynamic = "force-dynamic";

import CollectionPage from "~/components/pages/collection-page";
import { STORE_ID } from "~/config";
import {
  findProducts,
  getStoreBanners,
  searchCollectionTypes,
} from "~/graphql/api";
import fetchData from "~/utils/fetchData";
import { getPublicImageURL } from "~/utils/getPublicImageUrl";

async function getData(slug) {
  // store for metadata
  const { getStore } = await fetchData(getStoreBanners, {
    id: STORE_ID,
    deviceType: "WEB",
  });
  const { webUrl, name } = getStore || {};

  const collection = await fetchData(searchCollectionTypes, {
    filter: {
      slug: { eq: slug },
      storeId: { eq: STORE_ID },
      isArchive: { eq: false },
    },
  }).then((resp) =>
    resp?.searchCollectionTypes?.items?.find((item) => item.slug === slug)
  );

  if (!collection) return { data: null };

  const {
    title,
    description,
    imageUrl,
    name: collectionName,
    metadata,
    showOutOfStockProducts = true,
  } = collection;

  const otherCollections = await fetchData(searchCollectionTypes, {
    filter: {
      storeId: { eq: STORE_ID },
      slug: { ne: slug },
      isArchive: { eq: false },
    },
    sort: [{ field: "priority", direction: "asc" }],
  }).then((res) => res.searchCollectionTypes.items);

  const collections = [
    { name: "All", path: "/collections/ranges" },
    { name: collectionName, path: `/collections/${slug}` },
    ...otherCollections.map((col) => ({ ...col, path: `/collections/${col.slug}` })),
  ];
  if (slug !== "combos-and-gifts") {
    collections.push({ name: "Combos & Gifts", path: "/collections/combos-and-gifts" });
  }

  // Build filter and sort
  const filter = { status: { eq: "ENABLED" }, storeId: { eq: STORE_ID } };
  const sortBy = [];
  switch (collection.defaultSorting) {
    case "LATEST":
      sortBy.push({ field: "createdAt", direction: "desc" });
      break;
    case "HIGHEST_RATED":
      sortBy.push({ field: "rating", direction: "desc" });
      break;
    case "PRICE_LOW_TO_HIGH":
      sortBy.push({ field: "defaultPrice", direction: "asc" });
      break;
    case "PRICE_HIGH_TO_LOW":
      sortBy.push({ field: "defaultPrice", direction: "desc" });
      break;
    case "AVAILABILITY":
      sortBy.push({ field: "defaultInventory", direction: "desc" });
      break;
    case "BEST_SELLERS":
      sortBy.push({ field: "totalOrders", direction: "desc" });
      break;
    default:
      sortBy.push({ field: "position", direction: "asc" });
  }

  filter.collections = { eq: slug };
  if (!showOutOfStockProducts) {
    filter.defaultInventory = { gt: 0 };
  }

  const { searchProducts } = await fetchData(findProducts, {
    filter,
    sort: sortBy,
    variantFilter: { status: { eq: "ENABLED" } },
    imageLimit: 1,
  });

  const pageMeta = {
    siteName: name,
    title: metadata?.title || title || collectionName,
    description: metadata?.description || description,
    canonical: metadata?.canonical || `${webUrl}/collections/${slug}`,
    image: getPublicImageURL(metadata?.image || imageUrl),
    noIndex: metadata?.noIndex || false,
  };

  return {
    slug,
    data: collection,
    pageType: "COLLECTION",
    sectionId: slug,
    products: searchProducts,
    pageFilter: filter,
    filterItems: collections,
    sortBy,
    pageMeta,
  };
}

export default async function Page({ params }) {
  const { slug } = params;
  const data = await getData(slug);
  if (!data?.data) {
    // fallback similar to old handleRedirect default
    return null;
  }
  return <CollectionPage {...data} />;
}

export async function generateMetadata({ params }) {
  const { slug } = params;
  const { getStore } = await fetchData(getStoreBanners, { id: STORE_ID, deviceType: "WEB" });
  const collection = await fetchData(searchCollectionTypes, {
    filter: { slug: { eq: slug }, storeId: { eq: STORE_ID }, isArchive: { eq: false } },
  }).then((resp) => resp?.searchCollectionTypes?.items?.find((i) => i.slug === slug));
  if (!collection) return {};
  const { title, description, imageUrl, name: collectionName, metadata } = collection;
  const baseUrl = getStore?.webUrl || "";
  return {
    title: metadata?.title || title || collectionName,
    description: metadata?.description || description,
    alternates: { canonical: metadata?.canonical || `${baseUrl}/collections/${slug}` },
    openGraph: { images: metadata?.image ? [metadata?.image] : imageUrl ? [imageUrl] : [] },
    robots: metadata?.noIndex ? { index: false, follow: false } : undefined,
  };
}
