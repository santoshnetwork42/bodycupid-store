export const revalidate = 1800;
export const dynamic = "force-dynamic";

import CollectionListPage from "~/components/pages/collection-list-page";
import { STORE_ID } from "~/config";
import { findProducts, getMenuCategories, getStoreBanners } from "~/graphql/api";
import fetchData from "~/utils/fetchData";
import { getPublicImageURL } from "~/utils/getPublicImageUrl";

export default async function Page() {
  const filter = { status: { eq: "ENABLED" }, storeId: { eq: STORE_ID } };

  const [{ searchProductCategories }, { getStore }, { searchProducts }] = await Promise.all([
    fetchData(getMenuCategories, {
      filter: { storeId: { eq: STORE_ID }, isArchive: { eq: false } },
      sort: [{ field: "priority", direction: "asc" }],
    }),
    fetchData(getStoreBanners, { id: STORE_ID, deviceType: "WEB" }),
    fetchData(findProducts, {
      filter,
      sort: [{ field: "position", direction: "asc" }],
      variantFilter: { status: { eq: "ENABLED" } },
      imageLimit: 1,
    }),
  ]);

  const categories = [
    { name: "all", path: "/collections/all" },
    ...searchProductCategories.items.map((cat) => ({ ...cat, path: `/collections/${cat.slug}` })),
  ];

  return (
    <CollectionListPage
      categories={categories}
      products={searchProducts}
      pageFilter={filter}
      sectionId="All"
    />
  );
}

export const metadata = { title: "All Products" };
