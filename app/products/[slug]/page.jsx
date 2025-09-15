export const revalidate = 1800;
export const dynamic = "force-dynamic";

import ProductPage from "~/components/pages/product-page";
import { STORE_ID } from "~/config";
import {
  getProductBySlug,
  getStoreBanners,
} from "~/graphql/api";
import fetchData from "~/utils/fetchData";
import { getPublicImageURL } from "~/utils/getPublicImageUrl";
import { findProducts } from "~/graphql/api";
import { getProductMeta, setSoldOutLast } from "~/utils/products";
import { notFound, redirect } from "next/navigation";

async function getData(slug) {
  const { getStore } = await fetchData(getStoreBanners, {
    id: STORE_ID,
    deviceType: "WEB",
  });

  const { webUrl, name } = getStore || {};

  const byslugResp = await fetchData(getProductBySlug, {
    slug,
    filter: { storeId: { eq: STORE_ID }, status: { eq: "ENABLED" } },
    variantFilter: { status: { eq: "ENABLED" } },
  });

  const product = byslugResp?.byslugProduct?.items?.[0];
  if (!product) return { product: null };

  const { pageTitle, productDescription, title, metadata } = product;
  const { thumbImage } = getProductMeta(product);

  // related products
  let relatedProductsFilter = {};
  if (product) {
    const { id, categoryId, subCategoryId } = product || {};
    relatedProductsFilter = { id: { ne: id }, collections: { ne: "slob" } };
    if (subCategoryId) {
      relatedProductsFilter.subCategoryId = { eq: subCategoryId };
    } else {
      relatedProductsFilter.categoryId = { eq: categoryId };
    }
  }

  const { searchProducts: searchRelatedProducts } = await fetchData(findProducts, {
    filter: {
      storeId: { eq: STORE_ID },
      status: { eq: "ENABLED" },
      ...relatedProductsFilter,
    },
    limit: 10,
    sort: [{ field: "position", direction: "asc" }],
    variantFilter: { status: { eq: "ENABLED" } },
    imageLimit: 1,
  });

  const { items: relatedProductItems } = searchRelatedProducts || { items: [] };
  const relatedProducts = setSoldOutLast(relatedProductItems);

  const pageMeta = {
    siteName: name,
    title: metadata?.title || title || pageTitle,
    description: metadata?.description || productDescription,
    canonical: metadata?.canonical || `${webUrl}/products/${slug}`,
    image: getPublicImageURL(metadata?.image || thumbImage?.imageKey),
    noIndex: metadata?.noIndex || false,
  };

  return { product, relatedProducts, pageMeta, slug };
}

export default async function Page({ params }) {
  const { slug } = params;
  const data = await getData(slug);
  if (!data?.product) {
    // mimic old redirect to home if product missing
    redirect("/");
  }
  return <ProductPage {...data} />;
}

export async function generateMetadata({ params }) {
  const { slug } = params;
  const { getStore } = await fetchData(getStoreBanners, { id: STORE_ID, deviceType: "WEB" });
  const byslugResp = await fetchData(getProductBySlug, {
    slug,
    filter: { storeId: { eq: STORE_ID }, status: { eq: "ENABLED" } },
    variantFilter: { status: { eq: "ENABLED" } },
  });
  const product = byslugResp?.byslugProduct?.items?.[0];
  if (!product) return {};
  const { pageTitle, productDescription, title, metadata } = product;
  const baseUrl = getStore?.webUrl || "";
  return {
    title: metadata?.title || title || pageTitle,
    description: metadata?.description || productDescription,
    alternates: { canonical: metadata?.canonical || `${baseUrl}/products/${slug}` },
    openGraph: { images: metadata?.image ? [metadata?.image] : [] },
    robots: metadata?.noIndex ? { index: false, follow: false } : undefined,
  };
}
