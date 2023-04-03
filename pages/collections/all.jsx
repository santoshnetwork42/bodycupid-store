import React from "react";
import Head from "next/head";
import { connect } from "react-redux";

import ShopBanner from "~/components/partials/shop/shop-banner";
import SidebarFilterOne from "~/components/partials/shop/sidebar/sidebar-filter-one";
import ProductListOne from "~/components/partials/shop/product-list/product-list-one";

function All(props) {
  const { store } = props;
  const { name } = store;

  return (
    <main className="main">
      <Head>
        <title>
          {"All Products"} - {name}
        </title>
      </Head>

      <h1 className="d-none">
        {"All Products"} - {name}
      </h1>

      <ShopBanner bannerUrl={null} />

      <div className="page-content mb-10 pb-3">
        <div className="container">
          <div className="row main-content-wrap gutter-lg">
            <SidebarFilterOne />

            <div className="col-lg-9 main-content">
              <ProductListOne category={"all"} />
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

export default connect(mapStateToProps)(React.memo(All));
