import { NextResponse } from "next/server";
export const runtime = 'edge';
import { STORE_ID, GOOGLE_VERIFICATION_TAG } from "~/config";
import { findProducts, getHomePageCategories, getStoreBanners, searchCollectionTypes } from "~/graphql/api";
import fetchData from "~/utils/fetchData";
import { getPublicImageURL } from "~/utils/getPublicImageUrl";

export async function GET() {
  try {
    const getSearchProducts = async (collectionSlug, limit) => {
      const { searchProducts } = await fetchData(findProducts, {
        filter: { storeId: { eq: STORE_ID }, status: { eq: "ENABLED" }, collections: { eq: collectionSlug } },
        limit,
        sort: [{ field: "position", direction: "asc" }],
        variantFilter: { status: { eq: "ENABLED" } },
        imageLimit: 1,
      });
      return searchProducts;
    };

    const getCollectionBySlug = async (slug) => {
      const { searchCollectionTypes: s } = await fetchData(searchCollectionTypes, { filter: { storeId: { eq: STORE_ID }, slug: { eq: slug } } });
      return s?.items?.[0] || null;
    };

    const getProductSubCategory = async (limit) => {
      const { searchProductCategories } = await fetchData(getHomePageCategories, {
        filter: { isFeatured: { eq: true }, storeId: { eq: STORE_ID }, isArchive: { eq: false } },
        limit,
        sort: [{ field: "priority", direction: "asc" }],
      });
      return searchProductCategories?.items || [];
    };

    const [bestSellerProducts, { getStore: store }, bestSellerCollection, featuredProducts, featuredCollection, productSubCategories, articles] = await Promise.all([
      getSearchProducts("best-seller", 8),
      fetchData(getStoreBanners, { id: STORE_ID, deviceType: "WEB" }),
      getCollectionBySlug("best-seller"),
      getSearchProducts("featured", 8),
      getCollectionBySlug("featured"),
      getProductSubCategory(8),
      (async () => {
        try {
          const url = `https://cdn.seobotai.com/${process.env.NEXT_PUBLIC_SEOBOT_API_KEY}/system/base.json`;
          const resp = await fetch(url, { cache: "no-store" });
          if (resp.ok) return await resp.json();
        } catch {}
        return [];
      })(),
    ]);

    const { title, name, description, webUrl, imageUrl, banners } = store || {};

    const mapDefaultSorting = (v) => {
      switch (v) {
        case "LATEST":
          return "latest";
        case "HIGHEST_RATED":
          return "highest-rated";
        case "PRICE_LOW_TO_HIGH":
          return "low-high";
        case "PRICE_HIGH_TO_LOW":
          return "high-low";
        case "AVAILABILITY":
          return "availability";
        case "BEST_SELLERS":
          return "best-sellers";
        default:
          return "recommended";
      }
    };

    const body = {
      store,
      hero: { banners },
      bestSellerProducts: bestSellerProducts?.items || [],
      featuredProducts: featuredProducts?.items || [],
      productSubCategories,
      pageMeta: {
        siteName: name,
        title,
        description,
        canonical: webUrl,
        image: getPublicImageURL(imageUrl),
        googleVerificationTag: GOOGLE_VERIFICATION_TAG ?? null,
      },
      bestSellerDefaultSorting: mapDefaultSorting(bestSellerCollection?.defaultSorting),
      featuredCollection,
      featuredblogs: articles || [],
    };

    return NextResponse.json(body, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: "Failed to load home" }, { status: 500 });
  }
}
