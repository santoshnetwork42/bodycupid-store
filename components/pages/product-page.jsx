"use client";

import { useProduct, useProductVariantGroups } from "@wow-star/utils";
import { Logger } from "aws-amplify";
import dynamic from "next/dynamic";
import { useEffect, useMemo } from "react";
import { connect } from "react-redux";

import ProductBreadcrumbs from "~/components/common/partials/product-breadcrumbs";
import DescOne from "~/components/partials/product/desc/desc-one";
import DetailOne from "~/components/partials/product/detail/detail-one";
import LinkedProducts from "~/components/partials/product/linked-product";
import MediaOne from "~/components/partials/product/media/media-one";
import { eventActions } from "~/store/events";
import { useIsInteractive } from "~/utils/contexts/navbar";
import { getPublicImageURL } from "~/utils/getPublicImageUrl";
import { scrollWithOffset } from "~/utils/helper";
import { useAppRouter } from "~/utils/navigation";

const RenderProductCollection = dynamic(() =>
  import("~/components/partials/home/render-product-collection")
);

const logger = new Logger("Products");

function ProductPage(props) {
  const { product, pageMeta, viewItem, relatedProducts, slug, productViewed } =
    props;

  const router = useAppRouter();
  const { query } = router;
  const { variantId } = query || {};

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
    if (query?.reviews) {
      setTimeout(() => {
        scrollToReviews();
      }, 1000);
    }
  }, [query?.reviews, slug]);

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
    const timeoutId = setTimeout(() => {
      productViewed({
        productId: id,
        slug,
        title,
        price,
        variantId: selectedVariant?.id || "",
        imageUrl,
      });
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [selectedVariant, slug]);

  return (
    <main className="main single-product">
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
                    product={product}
                    variantId={selectedVariant?.id || undefined}
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

export default connect(null, {
  viewItem: eventActions.viewItem,
  productViewed: eventActions.productViewed,
})(ProductPage);

