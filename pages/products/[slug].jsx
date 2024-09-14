import { useProduct, useProductVariantGroups } from "@wow-star/utils";
import { Logger } from "aws-amplify";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import { connect } from "react-redux";

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
import { scrollWithOffset } from "~/utils/helper";
import { getSearchProducts } from "~/utils/page";
import { getProductMeta, setSoldOutLast } from "~/utils/products";

const RenderProductCollection = dynamic(() =>
  import("~/components/partials/home/render-product-collection")
);

const logger = new Logger("Products");

function ProductDefault(props) {
  const { product, pageMeta, viewItem, relatedProducts, slug, productViewed } =
    props;

  const router = useRouter();
  const { query } = router;
  const { variantId } = query;

  const isInteractive = useIsInteractive();

  const [selectedVariant, variantGroup, onVariantChange] =
    useProductVariantGroups(product, variantId);
  const packageProduct = useProduct(product, selectedVariant?.id);

  const handleVariantChange = (groupId, variantId) => {
    onVariantChange(groupId, variantId);
  };

  useEffect(() => {
    if (isInteractive) {
      viewItem({
        ...product,
        section: { id: "product-detail", name: "Product Detail" },
      });
    }
  }, [product, isInteractive]);

  const scrollToReviews = () => {
    scrollWithOffset("product-tab-reviews", 10, (ele) => {
      ele.click();
    });
  };

  useEffect(() => {
    if (query.reviews) {
      setTimeout(() => {
        scrollToReviews();
      }, 1000);
    }
  }, [query.reviews, slug]);

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
    const { id, price, title, slug, images } = product;

    const imageUrl = getPublicImageURL(
      selectedVariant?.images?.items?.[0]?.imageKey ||
        images?.items?.[0]?.imageKey
    );
    productViewed({
      productId: id,
      slug,
      title,
      price,
      variantId: selectedVariant?.id || "",
      imageUrl,
    });
  }, [selectedVariant]);

  return (
    <main className="main single-product">
      {/* <NextHead {...pageMeta} /> */}

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
                    data={packageProduct}
                    isNav={true}
                    onVariantChange={handleVariantChange}
                    variantGroup={variantGroup}
                    variantId={selectedVariant?.id}
                    selectedVariant={selectedVariant}
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

            {!!relatedProducts && (
              <RenderProductCollection
                title="Related products"
                products={relatedProducts}
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
  const { params } = context;
  const { slug } = params;

  const { getStore } = await fetchData(getStoreBanners, {
    id: STORE_ID,
    deviceType: "WEB",
  });
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

    //get related product's filter
    let relatedProductsFilter = {};
    if (!!product) {
      const { id, categoryId, subCategoryId } = product || {};
      relatedProductsFilter = {
        id: { ne: id },
      };

      //remove slob product collection
      relatedProductsFilter.collections = {
        ne: "slob",
      };

      if (subCategoryId) {
        relatedProductsFilter.subCategoryId = { eq: subCategoryId };
      } else {
        relatedProductsFilter.categoryId = { eq: categoryId };
      }
    }

    const [{ searchProducts: searchRelatedProducts }] = await Promise.all([
      getSearchProducts(relatedProductsFilter, 10),
    ]);

    const { items: relatedProductItems } = searchRelatedProducts;
    const relatedProducts = setSoldOutLast(relatedProductItems);

    return {
      props: {
        slug,
        product,
        relatedProducts,
        pageMeta: {
          siteName: name,
          title: metadata?.title || title || pageTitle,
          description: metadata?.description || productDescription,
          keywords: metadata?.keywords || [],
          canonical: metadata?.canonical || `${webUrl}/products/${slug}`,
          image: getPublicImageURL(metadata?.image || thumbImage?.imageKey),
          noIndex: metadata?.noIndex || false,
        },
      },
      revalidate: 1800,
    };
  }

  return await handleRedirect(`/products/${slug}`, `/`);
};

function mapStateToProps() {
  return {};
}

const Component = connect(mapStateToProps, {
  viewItem: eventActions.viewItem,
  productViewed: eventActions.productViewed,
})(ProductDefault);

Component.showTopRunner = true;
Component.showTimer = true;

export default Component;
