export const revalidate = 1800;
export const dynamic = "force-dynamic";

import CollectionListPage from "~/components/pages/collection-list-page";
import { STORE_ID } from "~/config";
import { findProducts, getStoreBanners, searchCollectionTypes } from "~/graphql/api";
import fetchData from "~/utils/fetchData";

export default async function Page() {
  const filter = {
    status: { eq: "ENABLED" },
    storeId: { eq: STORE_ID },
    collections: { exists: true },
  };

  const [{ getStore }, { searchCollectionTypes: collectionsResp }, { searchProducts }] = await Promise.all([
    fetchData(getStoreBanners, { id: STORE_ID, deviceType: "WEB" }),
    fetchData(searchCollectionTypes, {
      filter: { storeId: { eq: STORE_ID }, isArchive: { eq: false } },
      sort: [{ field: "priority", direction: "asc" }],
    }),
    fetchData(findProducts, {
      filter,
      sort: [{ field: "position", direction: "asc" }],
      variantFilter: { status: { eq: "ENABLED" } },
      imageLimit: 1,
    }),
  ]);

  const collections = [
    { name: "All", path: "/collections/all" },
    { name: "Ranges", path: "/collections/ranges" },
    ...collectionsResp.items.map((col) => ({ ...col, path: `/collections/${col.slug}` })),
  ];

  return (
    <CollectionListPage
      collections={collections}
      products={searchProducts}
      pageFilter={filter}
      sectionId="All Ranges"
    />
  );
}

export const metadata = { title: "Ranges" };
