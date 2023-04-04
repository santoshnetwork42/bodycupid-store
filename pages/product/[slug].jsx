import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import MediaOne from "~/components/partials/product/media/media-one";
import DetailOne from "~/components/partials/product/detail/detail-one";
import DescOne from "~/components/partials/product/desc/desc-one";
import RelatedProducts from "~/components/partials/product/related-products";
import {
  getProductBySlug,
  getHomePageProducts,
  searchProductFaqs,
  getReviews,
  getProductSlug,
} from "~/graphql/api";
import { STORE_ID } from "~/config";
import LinkedProducts from "~/components/partials/product/linked-product";
import ProductBreadcrumbs from "~/components/common/partials/product-breadcrumbs";
import fetchData from "~/utils/fetchData";
import optimizeImage from "~/utils/optimizeImage";

function ProductDefault(props) {
  const { product, relatedProducts, productFAQs = [], productReviews } = props;
  const router = useRouter();
  const { variantId } = router.query;
  console.log("pro", product);
  const [selectedVariant, setVariant] = useState(variantId);

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

  useEffect(() => {
    test();
  }, []);
  const test = async () => {};

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
            <DescOne
              product={product}
              productFAQs={productFAQs}
              productReviews={productReviews}
            />

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

    const { id, images } = product || {};
    console.log("ima", images.items);
    // Optimized Product Image
    for (const img in images?.items) {
      const optimizedProductImage = await optimizeImage({
        src: images.items[img].imageKey,
        type: "self-hosted",
      });
    }

    // get Related Product By Category
    let relatedProducts = [];
    if (product?.categoryId || product?.subCategoryId) {
      const filter = {
        id: { ne: id },
        storeId: { eq: STORE_ID },
        status: { eq: "ENABLED" },
      };
      if (product?.subCategoryId) {
        filter.subCategoryId = { eq: product.subCategoryId };
      } else {
        filter.categoryId = { eq: product.categoryId };
      }

      const {
        searchProducts: { items },
      } = await fetchData(getHomePageProducts, {
        filter,
        limit: 4,
      });

      relatedProducts = items;
    }

    // get Product FAQ
    const {
      searchProductFaqs: { items: faqS },
    } = await fetchData(searchProductFaqs, {
      filter: {
        productId: { eq: id },
      },
    });

    // get Product Reviews
    const {
      searchReviews: { items: reviews, total, nextToken },
    } = await fetchData(getReviews, {
      filter: {
        productId: { eq: id },
      },
      sort: [{ field: "createdAt", direction: "desc" }],
    });

    return {
      props: {
        product: product,
        relatedProducts: relatedProducts,
        productFAQs: faqS,
        productReviews: {
          reviews,
          total,
          nextToken,
        },
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default ProductDefault;
