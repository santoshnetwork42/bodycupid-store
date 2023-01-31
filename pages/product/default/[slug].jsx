import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Helmet from 'react-helmet';
import imagesLoaded from 'imagesloaded';

import withApollo from '~/server/apollo';

import OwlCarousel from '~/components/features/owl-carousel';

import MediaOne from '~/components/partials/product/media/media-one';
import DetailOne from '~/components/partials/product/detail/detail-one';
import DescOne from '~/components/partials/product/desc/desc-one';
import RelatedProducts from '~/components/partials/product/related-products';

import { mainSlider17 } from '~/utils/data/carousel';

// import Api, { baseUrl } from '~/api';
import { API, graphqlOperation } from "aws-amplify";
import { getProduct } from '~/graphql/queries';

function ProductDefault() {
    const slug = useRouter().query.slug;
    // const { data, loading, error } = useQuery(GET_PRODUCT, { variables: { slug } });
    const [loaded, setLoadingState] = useState(false);
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState(null);
    const [related, setRelated] = useState(null);
    const [data, setData] = useState(null);

    useEffect(() => {
        // Api.get(`${baseUrl}/api/product/${slug}`)
        //     .then(response => {
        //         let responseData = response.data;
        //         setData(responseData);
        //         setProduct(responseData.product);
        //         setRelated(responseData.relatedProducts);
        //         setLoading(false);
        //     })
            const id = slug
            API.graphql(graphqlOperation(getProduct, { id })).then(
                response =>{
                    let data = response.data;
                    console.log(data);
                    // console.log(data.listProducts);
                    setData(data);
                    setProduct(data.getProduct);
                    setRelated(data.getProduct.variants.items);

                    // setTotalPage(parseInt(data.listProducts.items.total / perPage) + (data.listProducts.items.total % perPage ? 1 : 0));
                    setLoading(false);
                }
            )
    }, [])

    useEffect(() => {
        if (!loading && product)
            imagesLoaded('main').on('done', function () {
                setLoadingState(true);
            }).on('progress', function () {
                setLoadingState(false);
            });
        if (loading)
            setLoadingState(false)
    }, [loading, product])

    return (
        <main className="main mt-6 single-product">
            <Helmet>
                <title>Wow React eCommerce Template | Product Default</title>
            </Helmet>

            <h1 className="d-none">Wow React eCommerce Template - Product Default</h1>

            {
                product !== null ?
                    <div className={`page-content mb-10 pb-6`} >
                        <div className="container vertical">
                            <div className="product product-single row mb-7">
                                <div className="col-md-6 sticky-sidebar-wrapper">
                                    <MediaOne product={product} />
                                </div>

                                <div className="col-md-6">
                                    <DetailOne data={data} isNav={true} />
                                </div>
                            </div>

                            <DescOne product={product} />

                            <RelatedProducts products={related} />
                        </div>
                    </div> : ''
            }
            {
                !loading ? ''
                    :
                    <div className="skeleton-body container mb-10">
                        <div className="row mb-7">
                            <div className="col-md-6 pg-vertical">
                                <div className="skel-pro-gallery"></div>
                            </div>

                            <div className="col-md-6">
                                <div className="skel-pro-summary"></div>
                            </div>
                        </div>

                        <div className="skel-pro-tabs"></div>

                        <section className="pt-3 mt-4">
                            <h2 className="title justify-content-center">Related Products</h2>

                            <OwlCarousel adClass="owl-carousel owl-theme owl-nav-full" options={mainSlider17}>
                                {
                                    [1, 2, 3, 4, 5, 6].map((item) =>
                                        <div className="product-loading-overlay" key={'popup-skel-' + item}></div>
                                    )
                                }
                            </OwlCarousel>
                        </section>
                    </div>
            }
        </main>
    )
}

export default withApollo({ ssr: typeof window === 'undefined' })(ProductDefault);