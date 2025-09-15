export const revalidate = 0;
export const dynamic = "force-dynamic";

import SearchPage from "~/components/pages/search-page";
import { STORE_ID } from "~/config";
import { findProducts } from "~/graphql/api";
import fetchData from "~/utils/fetchData";

async function getData() {
  const filter = {
    status: { eq: "ENABLED" },
    storeId: { eq: STORE_ID },
    collections: { eq: "best-seller" },
  };
  const { searchProducts } = await fetchData(findProducts, {
    filter,
    sort: [{ field: "position", direction: "asc" }],
    variantFilter: { status: { eq: "ENABLED" } },
    imageLimit: 1,
    limit: 16,
  });
  return { products: searchProducts, pageFilter: filter };
}

export default async function Page() {
  const data = await getData();
  return <SearchPage {...data} />;
}

export const metadata = {
  title: "Search",
};
