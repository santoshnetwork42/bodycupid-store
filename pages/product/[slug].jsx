import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { API, graphqlOperation } from "aws-amplify";

import OwlCarousel from "~/components/features/owl-carousel";
import MediaOne from "~/components/partials/product/media/media-one";
import DetailOne from "~/components/partials/product/detail/detail-one";
import DescOne from "~/components/partials/product/desc/desc-one";
import RelatedProducts from "~/components/partials/product/related-products";
import { mainSlider17 } from "~/utils/data/carousel";
import { getProductBySlug, getHomePageProducts } from "~/graphql/api";
import { STORE_ID } from "~/config";
import LinkedProducts from "~/components/partials/product/linked-product";
import ProductBreadcrumbs from "~/components/common/partials/product-breadcrumbs";

function ProductDefault() {
  const router = useRouter();
  const { slug, variantId } = router.query;
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState(null);
  const [selectedVariant, setVariant] = useState(variantId);

  useEffect(() => {
    API.graphql(
      graphqlOperation(getProductBySlug, {
        slug,
        filter: { storeId: { eq: STORE_ID }, status: { eq: "ENABLED" } },
      })
    )
      .then(
        ({
          data: {
            byslugProduct: { items },
          },
        }) => {
          if (items.length) {
            let [product] = items;
            setProduct(product);
            setLoading(false);
          } else {
            router.push("/404");
          }
        }
      )
      .catch((e) => {
        console.log("e", e);
      });
  }, [slug]);

  useEffect(() => {
    if (product?.categoryId || product?.subCategoryId) {
      const filter = {
        id: { ne: product.id },
        storeId: { eq: STORE_ID },
        status: { eq: "ENABLED" },
      };
      if (product?.subCategoryId) {
        filter.subCategoryId = { eq: product.subCategoryId };
      } else {
        filter.categoryId = { eq: product.categoryId };
      }

      API.graphql(
        graphqlOperation(getHomePageProducts, { filter, limit: 4 })
      ).then((response) => {
        setRelated(response.data.searchProducts.items);
      });
    }
  }, [product?.id]);

  return (
    <main className="main single-product">
      <Head>
        <title>{product?.title}</title>
      </Head>

      <h1 className="d-none">{product?.title}</h1>

      {!!product && (
        <div className={`page-content mb-10 pb-6`}>
          <div className="container vertical">
            <div className="product product-single row mb-7">
              <div className="mb-2 mt-2">
                <ProductBreadcrumbs {...product} />
              </div>
              <div className="col-md-6 sticky-sidebar-wrapper">
                <MediaOne product={product} variantId={selectedVariant} />
              </div>

              <div className="col-md-6">
                <DetailOne
                  data={product}
                  defaultVariant={product.variants?.items[0]?.id}
                  variantId={selectedVariant}
                  setVariant={setVariant}
                  isNav={true}
                />
              </div>
            </div>
            <LinkedProducts product={product} />
            <DescOne product={product} />

            <RelatedProducts products={related} />
          </div>
        </div>
      )}

      {loading && (
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

            <OwlCarousel
              adClass="owl-carousel owl-theme owl-nav-full"
              options={mainSlider17}
            >
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  className="product-loading-overlay"
                  key={"popup-skel-" + item}
                ></div>
              ))}
            </OwlCarousel>
          </section>
        </div>
      )}
    </main>
  );
}

export default ProductDefault;
