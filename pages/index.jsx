import { cwd } from "process";
import path from "path";

import React from "react";
import Head from "next/head";

// import Home Components
// import NewsletterModal from "~/components/features/modals/newsletter-modal";
import IntroSection from "~/components/partials/home/intro-section";
import ServiceBox from "~/components/partials/home/service-section";
import CategorySection from "~/components/partials/home/category-section";
import BestCollection from "~/components/partials/home/best-collection";
import DealSection from "~/components/partials/home/deal-section";
import FeaturedCollection from "~/components/partials/home/featured-collection";
import CtaSection from "~/components/partials/home/cta-section";
import BrandSection from "~/components/partials/home/brand-section";
import BlogSection from "~/components/partials/home/blog-section";
import SmallCollection from "~/components/partials/product/small-collection";

import {
  listProducts as listProductsGql,
  listProductCategories as listProductCategoriesGql,
} from "~/graphql/queries";

import awsmobile from "~/aws-exports";
import optimizeImage from "~/utils/optimizeImage";

function HomePage({ products, categories, heroImagePlaceholder }) {
  return (
    <div className="main home">
      <Head>
        <title>Wow Life Science - Home</title>
      </Head>

      <h1 className="d-none">Wow Life Science - Homepage</h1>

      <div className="page-content">
        <div className="intro-section">
          <IntroSection
            data={{
              heroImagePlaceholder,
            }}
          />
          <ServiceBox />
        </div>

        <CategorySection categories={categories} />
        <BestCollection products={products} />
        <DealSection />
        <FeaturedCollection products={products} />
        <CtaSection />
        <BlogSection posts={[]} />
        <BrandSection />
        <SmallCollection
          featured={products}
          latest={products}
          bestSelling={products}
          onSale={products}
        />
      </div>
      {/* <NewsletterModal /> */}
    </div>
  );
}

export const getStaticProps = async () => {
  try {
    const fetchData = async (query = "", variables = {}) => {
      const response = await fetch(awsmobile.aws_appsync_graphqlEndpoint, {
        method: "POST",
        body: JSON.stringify({
          query,
          variables,
        }),
        headers: {
          "x-api-key": awsmobile.aws_appsync_apiKey,
          accept: "*/*",
          "content-type": "application/json; charset=UTF-8",
        },
      });

      const data = await response.json();

      return data.data;
    };

    const { listProducts } = await fetchData(listProductsGql);
    const { listProductCategories } = await fetchData(listProductCategoriesGql);

    const heroImagePath = path.join(
      cwd(),
      "public/images/home/slides/wow-min.jpg"
    );
    const { placeholder } = await optimizeImage({
      src: heroImagePath,
      type: "path",
    });

    return {
      props: {
        products: listProducts.items,
        categories: listProductCategories.items,
        heroImagePlaceholder: placeholder,
      },
      revalidate: 15,
    };
  } catch (e) {
    console.log("error >>", e);

    return {
      props: {},
      revalidate: 1,
    };
  }
};

export default HomePage;
