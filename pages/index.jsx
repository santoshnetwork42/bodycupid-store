import React from "react";
import Head from "next/head";

import IntroSection from "~/components/partials/home/intro-section";
import ServiceBox from "~/components/partials/home/service-section";
import CategorySection from "~/components/partials/home/category-section";
import BestCollection from "~/components/partials/home/best-collection";
import DealSection from "~/components/partials/home/deal-section";
import FeaturedCollection from "~/components/partials/home/featured-collection";
import CtaSection from "~/components/partials/home/cta-section";
import BrandSection from "~/components/partials/home/brand-section";
// import BlogSection from "~/components/partials/home/blog-section";

import { getHomePageCategories, getHomePageProducts } from "~/graphql/api";
import optimizeImage from "~/utils/optimizeImage";
import { getPublicImageURL } from "~/utils/getPublicImageUrl";
import fetchData from "~/utils/fetchData";
import { STORE_ID } from "~/config";

function HomePage({ hero, products, categories, brands }) {
  return (
    <main className="main home">
      <Head>
        <title>Wow Life Science - Home</title>
      </Head>

      <h1 className="d-none">Wow Life Science - Homepage</h1>

      <div className="page-content">
        <div className="intro-section">
          <IntroSection data={hero} />
          <ServiceBox />
        </div>

        <CategorySection categories={categories} />
        <BestCollection products={products} />
        <DealSection />
        <FeaturedCollection products={products} />
        <CtaSection />
        {/* <BlogSection /> */}
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

    const optimizedHeroImage = await optimizeImage({
      src: "/images/home/slides/wow.jpg",
      type: "self-hosted",
    });

    const optimizedMobileHeroImage = await optimizeImage({
      src: "/images/home/slides/wow-mobile.jpg",
      type: "self-hosted",
    });

    const { searchProducts } = await fetchData(getHomePageProducts, {
      filter: { storeId: { eq: STORE_ID }, status: { eq: "ENABLED" } },
      limit: 8,
    });
    const { searchProductSubCategories } = await fetchData(
      getHomePageCategories,
      {
        limit: 4,
        filter: { isFeatured: { eq: true }, storeId: { eq: STORE_ID } },
        sort: [{ field: "priority", direction: "asc" }],
      }
    );

    for (const category of searchProductSubCategories.items) {
      if (category.imageUrl) {
        const imageUrl = getPublicImageURL(category.imageUrl);

        const optimizedCategoryImage = await optimizeImage({
          src: imageUrl,
          options: {
            resize: 200,
            blur: 3,
          },
        });

        delete category.imageUrl;
        category.image = optimizedCategoryImage;
      }
    }

    for (const product of searchProducts.items) {
      for (const image in product.images.items) {
        const imageUrl = getPublicImageURL(
          product.images.items[image].imageKey
        );

        const optimizedProductImage = await optimizeImage({
          src: imageUrl,
          options: {
            resize: 200,
            blur: 3,
          },
        });

        product.images.items[image].image = optimizedProductImage;
      }

      const imageUrl = getPublicImageURL(product.thumbImages);
      const optimizedProductImage = await optimizeImage({
        src: imageUrl,
        options: {
          resize: 200,
          blur: 3,
        },
      });

      product.image = optimizedProductImage;
    }

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
          banner: optimizedHeroImage,
          mobileBanner: optimizedMobileHeroImage,
        },
        products: searchProducts.items,
        categories: searchProductSubCategories.items,
        brands,
        footer: {
          logo: optimizedFooterImage,
        },
      },
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
};

export default HomePage;
