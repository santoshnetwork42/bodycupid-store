import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { API, graphqlOperation } from "aws-amplify";

import { STORE_ID } from "~/config";
import fetchData from "~/utils/fetchData";
import MediaOne from "~/components/partials/product/media/media-one";
import DetailOne from "~/components/partials/product/detail/detail-one";
import DescOne from "~/components/partials/product/desc/desc-one";
import RelatedProducts from "~/components/partials/product/related-products";
import {
  getProductBySlug,
  getHomePageProducts,
  searchProductFaqs,
  getProductSlug,
} from "~/graphql/api";
import LinkedProducts from "~/components/partials/product/linked-product";
import ProductBreadcrumbs from "~/components/common/partials/product-breadcrumbs";
import {
  optimizeProduct,
  variantImageOptimization,
} from "~/utils/getStaticData";

function ProductDefault(props) {
  const { product, productFAQs = [] } = props;
  const router = useRouter();
  const { query, isReady } = router;
  const { variantId } = query;
  const [selectedVariant, setVariant] = useState(variantId);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (!!isReady) {
      getRelatedProducts();
    }
  }, []);

  const getRelatedProducts = useCallback(async () => {
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
        graphqlOperation(getHomePageProducts, { filter, limit: 4 })
      );
      if (items.length) {
        setRelatedProducts(items);
      }
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
                  defaultVariant={defaultVariantId}
                  variantId={selectedVariant}
                  setVariant={setVariant}
                  isNav={true}
                />
              </div>
            </div>
            <LinkedProducts product={product} />
            <DescOne product={product} productFAQs={productFAQs} />

            <RelatedProducts products={relatedProducts} />
          </div>
        </div>
      )}
    </main>
  );
}

export const getStaticPaths = async () => {
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
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  try {
    const { params } = context;
    const { slug } = params;

    // get Product By Slug
    const {
      byslugProduct: { items },
    } = await fetchData(getProductBySlug, {
      slug,
      filter: { storeId: { eq: STORE_ID }, status: { eq: "ENABLED" } },
    });
    const [product] = items;
    if (!!product) {
      const { id, variants } = product || {};

      const [optimizedProducts] = await Promise.all(items.map(optimizeProduct));

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
          product: { ...optimizedProducts, variants: optimizedVariants },
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

export default ProductDefault;
