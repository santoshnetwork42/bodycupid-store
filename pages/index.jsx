import React from "react";
import Head from "next/head";
import { connect } from "react-redux";

import IntroSection from "~/components/partials/home/intro-section";
import ServiceBox from "~/components/partials/home/service-section";
import CategorySection from "~/components/partials/home/category-section";
import BestCollection from "~/components/partials/home/best-collection";
import FeaturedCollection from "~/components/partials/home/featured-collection";
import BlogSection from "~/components/partials/home/blog-section";

import {
  getHomePageBlogs,
  getHomePageCategories,
  getHomePageProducts,
  getStoreBanners,
} from "~/graphql/api";
import optimizeImage from "~/utils/optimizeImage";
import fetchData from "~/utils/fetchData";
import { STORE_ID } from "~/config";
import { HOME_REVALIDATE_DURATION } from "~/constant";
import {
  optimizeCategory,
  optimizeProduct,
  optimizeStore,
  optimizedBlogs,
} from "~/utils/getStaticData";


function HomePage({ hero, products, blogs, categories, brands, store }) {
  const { name } = store;

  return (
    <main className="main home searchBar">
      <Head>
        <title>{name} - Home</title>
      </Head>

      <h1 className="d-none">{name} - Homepage</h1>

      <div className="page-content">
        <div className="intro-section">
          <IntroSection {...hero} />
          <ServiceBox />
        </div>

        <CategorySection categories={categories} />
        <BestCollection products={products} />
        {/* <DealSection /> */}
        <BlogSection posts={blogs} />
        <FeaturedCollection products={products} />
        {/* <CtaSection /> */}
        {/* <BrandSection brands={brands} /> */}

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

    const getSearchProducts = fetchData(getHomePageProducts, {
      filter: { storeId: { eq: STORE_ID }, status: { eq: "ENABLED" } },
      limit: 8,
    });
    const getSearchProductSubCategories = fetchData(getHomePageCategories, {
      limit: 4,
      filter: { isFeatured: { eq: true }, storeId: { eq: STORE_ID } },
      sort: [{ field: "priority", direction: "asc" }],
    });

    const getStoreData = fetchData(getStoreBanners, { id: STORE_ID });

    const [
      { searchBlogs },
      { searchProducts },
      { searchProductSubCategories },
      { getStore: store },
    ] = await Promise.all([
      getSearchBlogs,
      getSearchProducts,
      getSearchProductSubCategories,
      getStoreData,
    ]);

    const { banners = [] } = store;
    const { items } = searchProducts;
    const { items: categoriesData } = searchProductSubCategories;
    const { items: blogsData } = searchBlogs;

    const blogs = await Promise.all((blogsData || []).map(optimizedBlogs));
    const optimizedStoreBanners = await Promise.all(
      (banners || []).map(optimizeStore)
    );

    const products = await Promise.all((items || []).map(optimizeProduct));

    const categories = await Promise.all(
      (categoriesData || []).map(optimizeCategory)
    );

    const brands = [
      "/images/brands/1.png",
      "/images/brands/2.png",
      "/images/brands/3.png",
      "/images/brands/4.png",
      "/images/brands/5.png",
      "/images/brands/6.png",
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
          banners: optimizedStoreBanners,
        },
        products,
        blogs,
        categories,
        brands,
        footer: {
          logo: optimizedFooterImage,
        },
      },
      revalidate: HOME_REVALIDATE_DURATION,
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
};

function mapStateToProps(state) {
  return {};
}
const Component = connect(mapStateToProps)(HomePage);
Component.showMobileSearchBar = true;
export default Component;
