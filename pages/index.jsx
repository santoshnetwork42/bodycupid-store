import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { API, graphqlOperation } from "aws-amplify";

// import Home Components
import NewsletterModal from "~/components/features/modals/newsletter-modal";
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

import { listProducts } from "~/graphql/queries";

function HomePage() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const bestSelling = [...products];
  const featured = [...products];
  const latest = [...products];
  const onSale = [...products];
  const posts = [];

  useEffect(() => {
    API.graphql(graphqlOperation(listProducts))
      .then((response) => {
        setProducts(response.data.listProducts.items);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
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

        <CategorySection />
        <BestCollection products={bestSelling} loading={loading} />
        <DealSection />
        <FeaturedCollection products={featured} loading={loading} />
        <CtaSection />
        <BlogSection posts={posts} />
        <BrandSection />
        <SmallCollection
          featured={featured}
          latest={latest}
          bestSelling={bestSelling}
          onSale={onSale}
          loading={loading}
        />
      </div>
      <NewsletterModal />
    </div>
  );
}

export default React.memo(HomePage);
