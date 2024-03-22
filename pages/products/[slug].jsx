import { Logger } from "aws-amplify";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";

import NextHead from "~/components/common/next-head";
import ProductBreadcrumbs from "~/components/common/partials/product-breadcrumbs";
import DescOne from "~/components/partials/product/desc/desc-one";
import DetailOne from "~/components/partials/product/detail/detail-one";
import LinkedProducts from "~/components/partials/product/linked-product";
import MediaOne from "~/components/partials/product/media/media-one";
import { STORE_ID } from "~/config";
import {
  getProductBySlug,
  getProductSlug,
  getStoreBanners,
} from "~/graphql/api";
import { eventActions } from "~/store/events";
import { useIsInteractive } from "~/utils/contexts/navbar";
import fetchData from "~/utils/fetchData";
import { getPublicImageURL } from "~/utils/getPublicImageUrl";
import handleRedirect from "~/utils/handleRedirect";
import { getProductMeta } from "~/utils/products";

const RenderProductCollection = dynamic(() =>
  import("~/components/partials/home/render-product-collection")
);

const logger = new Logger("Products");

function ProductDefault(props) {
  const { product, pageMeta, viewItem } = props;

  const router = useRouter();
  const { query } = router;
  const { variantId } = query;

  const [selectedVariant, setVariant] = useState(variantId);
  const isInteractive = useIsInteractive();

  useEffect(() => {
    if (isInteractive) {
      viewItem({
        ...product,
        section: { id: "product-detail", name: "Product Detail" },
      });
    }
  }, [product, isInteractive]);

  const relatedProductFilter = useMemo(() => {
    if (!!product) {
      const { id, categoryId, subCategoryId } = product || {};
      const filter = {
        id: { ne: id },
      };
      if (subCategoryId) {
        filter.subCategoryId = { eq: subCategoryId };
      } else {
        filter.categoryId = { eq: categoryId };
      }
      return filter;
    }

    return null;
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
      <NextHead {...pageMeta} />

      <h1 className="d-none">{product?.title}</h1>

      {!!product && (
        <>
          <div className="page-content bg-white">
            <div className="container vertical">
              <div className="product product-single row ">
                <div className="mt-3 d-sm-show">
                  <ProductBreadcrumbs key={`br-${product.id}`} {...product} />
                </div>
                <div className="col-md-6 sticky-sidebar-wrapper mt-3">
                  <MediaOne
                    key={`media-${product.id}`}
                    product={product}
                    variantId={selectedVariant || defaultVariantId}
                  />
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
          <div className="page-content pb-10 bg-white">
            <div className="container  vertical pt-3 lh-default bg-white ">
              <LinkedProducts product={product} />
              <DescOne key={`desc-one=${product.id}`} product={product} />
            </div>

            {!!relatedProductFilter && (
              <RenderProductCollection
                filter={relatedProductFilter}
                title="Related products"
              />
            )}
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

    const { getStore } = await fetchData(getStoreBanners, { id: STORE_ID });
    const { webUrl, name } = getStore;

    // get Product By Slug
    const {
      byslugProduct: {
        items: [product],
      },
    } = await fetchData(getProductBySlug, {
      slug,
      filter: { storeId: { eq: STORE_ID }, status: { eq: "ENABLED" } },
      variantFilter: { status: { eq: "ENABLED" } },
    });

    if (product) {
      const { pageTitle, productDescription, title, metadata } = product;
      const { thumbImage } = getProductMeta(product);

      return {
        props: {
          slug,
          product,
          pageMeta: {
            siteName: name,
            title: metadata?.title || title || pageTitle,
            description: metadata?.description || productDescription,
            keywords: metadata?.keywords || [],
            canonical: metadata?.canonical || `${webUrl}/products/${slug}`,
            image: getPublicImageURL(metadata?.image || thumbImage?.imageKey),
          },
        },
        revalidate: 1800,
      };
    }

    return await handleRedirect(`/products/${slug}`, `/`);
  } catch (error) {
    logger.error("error while fetching product based on slug", error);
  }
  return {
    notFound: true,
  };
};

function mapStateToProps() {
  return {};
}

const Component = connect(mapStateToProps, {
  viewItem: eventActions.viewItem,
})(ProductDefault);

Component.showTopRunner = true;

export default Component;
