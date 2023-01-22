import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

import { useQuery } from "@apollo/react-hooks";

// Import Apollo Server and Query
import withApollo from '../server/apollo';
import { GET_HOME_DATA } from '../server/queries';

import Api, { baseUrl } from '~/api';

// import Home Components
import NewsletterModal from '~/components/features/modals/newsletter-modal';
import IntroSection from '~/components/partials/home/intro-section';
import ServiceBox from '~/components/partials/home/service-section';
import CategorySection from '~/components/partials/home/category-section';
import BestCollection from '~/components/partials/home/best-collection';
import DealSection from '~/components/partials/home/deal-section';
import FeaturedCollection from '~/components/partials/home/featured-collection';
import CtaSection from '~/components/partials/home/cta-section';
import BrandSection from '~/components/partials/home/brand-section';
import BlogSection from '~/components/partials/home/blog-section';
import SmallCollection from '~/components/partials/product/small-collection';

function HomePage() {
    const { data, error } = useQuery(GET_HOME_DATA, { variables: { productsCount: 7 } });
    const [loading, setLoading] = useState(true);
    const [bestSelling, setBestSelling] = useState(null);
    const featured = data && data.specialProducts.featured;
    const latest = data && data.specialProducts.latest;
    const onSale = data && data.specialProducts.onSale;
    const posts = data && data.posts.data;

    useEffect(() => {
        Api.get(`${baseUrl}/api/products/best-selling`)
            .then(response => {
                setBestSelling(response.data);  
                setLoading(false);
            })
    }, [])


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

                <SmallCollection featured={featured} latest={latest} bestSelling={bestSelling} onSale={onSale} loading={loading} />
            </div>

            <NewsletterModal />
        </div>
    )
}

export default withApollo({ ssr: typeof window === 'undefined' })(HomePage);