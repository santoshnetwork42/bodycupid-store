"use client";

import React, { useEffect } from "react";
import { connect } from "react-redux";
import ProductListOne from "~/components/partials/shop/product-list/product-list-one";
import { eventActions } from "~/store/events";

function CollectionListPage(props) {
  const {
    store,
    products,
    pageFilter,
    collections,
    categories,
    sectionId = "All",
    collectionViewed,
  } = props;
  const { name } = store || {};

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      collectionViewed({
        collectionId: "",
        title: sectionId.toLowerCase(),
        slug: sectionId.toLowerCase(),
        imageUrl: "",
      });
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [sectionId]);

  const filterItems = collections || categories;

  return (
    <main className="main">
      <h1 className="d-none">{name} - All Products</h1>
      <div className="page-content pb-3">
        <div className="container">
          <div className="row main-content-wrap gutter-lg">
            <div className="col-lg-12 main-content">
              <ProductListOne
                sectionId={sectionId}
                products={products}
                filterItems={filterItems}
                pageFilter={pageFilter}
                isToolbox={sectionId === "All Ranges"}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default connect((state) => ({ store: state.system.store }), {
  collectionViewed: eventActions.collectionViewed,
})(React.memo(CollectionListPage));

