import React from "react";
import Head from "next/head";
import { connect } from "react-redux";

import IntroSection from "~/components/partials/home/intro-section";
import CategorySection from "~/components/partials/home/category-section";

import BlogSection from "~/components/partials/home/blog-section";

import {
  getHomePageBlogs,
  getHomePageCategories,
  findProducts,
  getStoreBanners,
} from "~/graphql/api";
import optimizeImage from "~/utils/optimizeImage";
import fetchData from "~/utils/fetchData";
import { STORE_ID } from "~/config";
import {
  optimizeCategory,
  optimizeProduct,
  optimizeStore,
  optimizedBlogs,
} from "~/utils/getStaticData";
import BrandSection from "~/components/partials/home/brand-section";
import ReviewSection from "~/components/partials/home/review-section";
import StorySection from "~/components/partials/home/story-section";
import ProductCollection from "~/components/partials/home/product-collection";
import { useWindowDimensions } from "~/utils/getWindowDimension";

function HomePage({
  hero,
  bestSellerProducts,
  featuredProducts,
  blogs,
  categories,
  brands,
  store,
}) {
  const { name } = store || {};
  const { isSmallSize } = useWindowDimensions();

  return (
    <main className="main home searchBar">
      <Head>
        <title>{name} - Home</title>
      </Head>

      <h1 className="d-none">{name} - Homepage</h1>
      <StorySection categories={categories} />
      <div className="page-content page-content-wrapper">
        <div className="intro-section">
          <IntroSection {...hero} />
        </div>
        <ProductCollection
          products={bestSellerProducts}
          title="Best sellers"
          disableCarousel={isSmallSize}
          slug="best-seller"
          redirectTo="/ranges/best-seller"
        />
        <ProductCollection
          products={featuredProducts}
          title="Our featured"
          slug="featured"
          redirectTo="/ranges/featured"
        />
        <CategorySection categories={categories} />
        {/* <DealSection /> */}
        <BlogSection posts={blogs} />
        {/* <CtaSection /> */}
        <ReviewSection />
        <BrandSection brands={brands} />
        {/* <SmallCollection  
          featured={featured}
          latest={latest}
          bestSelling={bestSelling}
          onSale={onSale}
          loading={loading}
        /> */}
      </div>
      {/* <NewsletterModal /> */}
    </main>
  );
}

export const getStaticProps = async () => {
  try {
    const optimizedLogoImage = await optimizeImage({
      src: "/images/logo.png",
      options: {
        resize: 150,
        blur: 2,
      },
      type: "self-hosted",
    });
    const optimizedFooterImage = await optimizeImage({
      src: "/images/logo-footer.png",
      options: {
        resize: 150,
        blur: 2,
      },
      type: "self-hosted",
    });

    const getSearchBlogs = fetchData(getHomePageBlogs, {
      filter: { storeId: { eq: STORE_ID }, isVisible: { eq: true } },
    });

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

    const getSearchProductSubCategories = fetchData(getHomePageCategories, {
      limit: 8,
      filter: { isFeatured: { eq: true }, storeId: { eq: STORE_ID } },
      sort: [{ field: "priority", direction: "asc" }],
    });

    const getStoreData = fetchData(getStoreBanners, { id: STORE_ID });

    const [
      { searchBlogs },
      { searchProducts: searchBestSellerProducts },
      { searchProducts: searchFeaturedProducts },
      { searchProductSubCategories },
      { getStore: store },
    ] = await Promise.all([
      getSearchBlogs,
      getSearchProducts({ collections: { eq: "best-seller" } }),
      getSearchProducts({ collections: { eq: "featured" } }),
      getSearchProductSubCategories,
      getStoreData,
    ]);

    const getOptimizedProduct = (items) =>
      Promise.all(
        (items || []).map((product) =>
          optimizeProduct(product, { partial: true })
        )
      );

    const { items: bestSellerItems } = searchBestSellerProducts;
    const { items: featuredItems } = searchFeaturedProducts;
    const { items: categoriesData } = searchProductSubCategories;
    const { items: blogsData } = searchBlogs;

    const blogs = await Promise.all((blogsData || []).map(optimizedBlogs));

    const { banners } = await optimizeStore(store);

    const bestSellerProducts = await getOptimizedProduct(bestSellerItems);
    const featuredProducts = await getOptimizedProduct(featuredItems);

    const categories = await Promise.all(
      (categoriesData || []).map(optimizeCategory)
    );

    const brands = [
      "/images/brands/1.png",
      "/images/brands/2.png",
      "/images/brands/6.png",
      "/images/brands/7.png",
      "/images/brands/8.png",
      "/images/brands/9.png",
    ];
    for (const brand in brands) {
      const optimizedBrand = await optimizeImage({
        src: brands[brand],
        type: "self-hosted",
        options: {
          resize: 200,
          blur: 3,
        },
      });
      brands[brand] = optimizedBrand;
    }

    return {
      props: {
        navbar: {
          logo: optimizedLogoImage,
        },
        hero: {
          banners,
        },
        bestSellerProducts,
        featuredProducts,
        blogs,
        categories,
        brands,
        footer: {
          logo: optimizedFooterImage,
        },
      },
      revalidate: 43200,
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
};

function mapStateToProps() {
  return {};
}
const Component = connect(mapStateToProps)(HomePage);
Component.showStickyCheckout = true;
Component.showTopRunner = true;
export default Component;
