import React from "react";
import Head from "next/head";
import { connect } from "react-redux";

import ShopBanner from "~/components/partials/shop/shop-banner";
import SidebarFilterOne from "~/components/partials/shop/sidebar/sidebar-filter-one";
import ProductListOne from "~/components/partials/shop/product-list/product-list-one";

function Shop({ store }) {
  const { name } = store;

  return (
    <main className="main">
      <Head>
        <title>{name} - Shop Page</title>
      </Head>

      <h1 className="d-none">{name} - Shop Page</h1>

      <ShopBanner />

      <div className="page-content mb-10 pb-3">
        <div className="container">
          <div className="row main-content-wrap gutter-lg">
            <SidebarFilterOne />

            <div className="col-lg-9 main-content">
              <ProductListOne />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function mapStateToProps(state) {
  return {
    store: state.system.store,
  };
}

export default connect(mapStateToProps)(React.memo(Shop));
