import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { API, graphqlOperation } from "aws-amplify";

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

function HomePage() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const bestSelling = [...products];
  const featured = [...products];

  useEffect(() => {
    (async function () {
      await Promise.all([
        API.graphql(graphqlOperation(getHomePageProducts, { limit: 8 }))
          .then((response) => {
            setProducts(response.data.searchProducts.items);
          })
          .catch((err) => {
            console.log(err);
          }),
        API.graphql(
          graphqlOperation(getHomePageCategories, {
            limit: 4,
            filter: { isFeatured: { eq: true } },
            sort: [{ field: "priority", direction: "asc" }],
          })
        )
          .then((response) => {
            setCategories(response.data.searchProductSubCategories.items);
          })
          .catch((err) => {
            console.log(err);
          }),
      ]);
      setLoading(false);
    })();
  }, []);

  return (
    <div className="main home">
      <Helmet>
        <title>Wow Life Science - Home</title>
      </Helmet>

      <h1 className="d-none">Wow Life Science - Homepage</h1>

      <div className="page-content">
        <div className="intro-section">
          <IntroSection />
          <ServiceBox />
        </div>

        <CategorySection categories={categories} />
        <BestCollection products={bestSelling} loading={loading} />
        <DealSection />
        <FeaturedCollection products={featured} loading={loading} />
        <CtaSection />
        {/* <BlogSection /> */}
        <BrandSection />
        {/* <SmallCollection
          featured={featured}
          latest={latest}
          bestSelling={bestSelling}
          onSale={onSale}
          loading={loading}
        /> */}
      </div>
      {/* <NewsletterModal /> */}
    </div>
  );
}

export default React.memo(HomePage);
