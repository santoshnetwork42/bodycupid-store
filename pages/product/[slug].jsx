import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { API, graphqlOperation } from "aws-amplify";
import { connect } from "react-redux";

import { STORE_ID } from "~/config";
import fetchData from "~/utils/fetchData";
import MediaOne from "~/components/partials/product/media/media-one";
import DetailOne from "~/components/partials/product/detail/detail-one";
import DescOne from "~/components/partials/product/desc/desc-one";
import {
  getProductBySlug,
  searchProductFaqs,
  getProductSlug,
  findProducts,
} from "~/graphql/api";
import LinkedProducts from "~/components/partials/product/linked-product";
import {
  optimizeProduct,
  variantImageOptimization,
} from "~/utils/getStaticData";
import { eventActions } from "~/store/events";
import ProductBreadcrumbs from "~/components/common/partials/product-breadcrumbs";
import ProductCollection from "~/components/partials/home/product-collection";
import { errorHandler } from "~/utils/errorHandler";

function ProductDefault(props) {
  const { product, productFAQs = [], viewItem, slug } = props;
  const router = useRouter();
  const { query, isReady } = router;
  const { variantId } = query;
  const [selectedVariant, setVariant] = useState(variantId);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    viewItem({
      ...product,
      section: { id: "product-detail", name: "Product Detail" },
    });
    if (!!isReady) {
      getRelatedProducts();
    }
  }, [slug]);

  const getRelatedProducts = useCallback(async () => {
    try {
      if (!!product) {
        const { id, categoryId, subCategoryId } = product || {};
        const filter = {
          id: { ne: id },
          storeId: { eq: STORE_ID },
          status: { eq: "ENABLED" },
        };
        if (subCategoryId) {
          filter.subCategoryId = { eq: subCategoryId };
        } else {
          filter.categoryId = { eq: categoryId };
        }
        const {
          data: {
            searchProducts: { items },
          },
        } = await API.graphql(
          graphqlOperation(findProducts, { filter, limit: 4 })
        );
        if (items.length) {
          setRelatedProducts(items);
        }
      }
    } catch (error) {
      errorHandler(error);
    }
  }, [product]);

  const { defaultVariantId } = useMemo(() => {
    const { variants = {} } = product || {};
    const { items = [] } = variants;
    if (items.length) {
      const [variants] = items.sort((a, b) => a.position - b.position);
      const { id } = variants || {};
      return {
        defaultVariantId: id,
      };
    }
    return {
      defaultVariantId: null,
    };
  }, [product?.slug]);

  return (
    <main className="main single-product">
      <Head>
        <title>{product?.title}</title>
      </Head>

      <h1 className="d-none">{product?.title}</h1>

      {!!product && (
        <>
          <div className="page-content bg-white">
            <div className="container vertical">
              <div className="product product-single row ">
                <div className="mt-3 d-sm-show">
                  <ProductBreadcrumbs {...product} />
                </div>
                <div className="col-md-6 sticky-sidebar-wrapper mt-3">
                  <MediaOne product={product} variantId={selectedVariant} />
                </div>

                <div className="col-md-6">
                  <DetailOne
                    data={product}
                    defaultVariant={defaultVariantId}
                    variantId={selectedVariant}
                    setVariant={setVariant}
                    isNav={true}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="page-content pb-10">
            <div className="container vertical pt-3 lh-default">
              <LinkedProducts product={product} />
              <DescOne product={product} productFAQs={productFAQs} />
              <ProductCollection
                products={relatedProducts}
                title="Related products"

              />
            </div>
          </div>
        </>
      )}
    </main>
  );
}

export const getStaticPaths = async () => {
  if (process.env.NODE_ENV === "development") {
    return {
      paths: [],
      fallback: "blocking",
    };
  }
  const {
    searchProducts: { items },
  } = await fetchData(getProductSlug, {
    filter: {
      status: { eq: "ENABLED" },
      storeId: { eq: STORE_ID },
    },
  });
  const paths = items.map((s) => ({
    params: { slug: s.slug },
  }));

  return {
    paths: paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async (context) => {
  try {
    const { params } = context;
    const { slug } = params;

    // get Product By Slug
    const {
      byslugProduct: {
        items: [product],
      },
    } = await fetchData(getProductBySlug, {
      slug,
      filter: { storeId: { eq: STORE_ID }, status: { eq: "ENABLED" } },
    });

    if (product) {
      const { id, variants } = product;

      const optimizedProduct = await optimizeProduct(product);
      const { variants: optimizedVariants } = await variantImageOptimization(
        variants
      );

      // get Product FAQ
      const {
        searchProductFaqs: { items: faqS },
      } = await fetchData(searchProductFaqs, {
        filter: {
          productId: { eq: id },
        },
      });

      return {
        props: {
          slug,
          product: { ...optimizedProduct, variants: optimizedVariants },
          productFAQs: faqS,
        },
      };
    }
  } catch (error) {
    console.log("slug", error);
  }
  return {
    notFound: true,
  };
};

function mapStateToProps(state) {
  return {
    store: state.system.store,
  };
}

const Component = connect(mapStateToProps, {
  viewItem: eventActions.viewItem,
})(ProductDefault);
// Component.showStickyCheckout = true;

export default Component;
