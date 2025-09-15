"use client";

import { useEffect } from "react";
import { connect } from "react-redux";

import CategoryHeader from "~/components/common/category-header";
import Image from "~/components/image";
import ProductListOne from "~/components/partials/shop/product-list/product-list-one";
import { getPublicImageURL } from "~/utils/getPublicImageUrl";
import { getSource } from "~/utils/helper";
import { eventActions } from "~/store/events";

function CollectionPage(props) {
  const {
    store,
    products,
    sectionId,
    pageFilter,
    filterItems = [],
    data,
    pageMeta,
    categoryViewed,
    sortBy,
    collectionViewed,
  } = props;
  const { name } = store || {};
  const source = getSource();

  useEffect(() => {
    if (data?.name) {
      categoryViewed({
        URL: window.location.href,
        "Category Name": data.name,
        "Item Count": products.items.length,
        Source: source,
      });
    }
    const { slug, name, title, id, bannerUrl } = data;
    const timeoutId = setTimeout(() => {
      collectionViewed({
        collectionId: id,
        title: title || name,
        slug,
        imageUrl: getPublicImageURL(bannerUrl),
      });
    }, 1000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [data]);

  const imageUrl = data.hasOwnProperty("bannerUrl")
    ? data.bannerUrl
    : data.imageUrl;

  return (
    <main className="main searchBar">
      <h1 className="d-none">
        {name} - {data?.name}
      </h1>

      <div className="page-content  pb-3">
        <div className="container">
          <CategoryHeader {...data} />
          {imageUrl && (
            <div className="text-center pt-4">
              <Image
                src={imageUrl}
                alt="Category Image"
                width={1200}
                height={305}
              />
            </div>
          )}
          <div className="row main-content-wrap gutter-lg">
            <div className="col-lg-12 main-content">
              <ProductListOne
                isToolbox
                sectionId={sectionId}
                products={products}
                pageFilter={pageFilter}
                filterItems={filterItems}
                defaultSorting={data?.defaultSorting}
                nextToken={products?.nextToken}
                sortBy={sortBy}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default connect(
  (state) => ({ store: state.system.store }),
  {
    categoryViewed: eventActions.categoryViewed,
    collectionViewed: eventActions.collectionViewed,
  }
)(CollectionPage);

