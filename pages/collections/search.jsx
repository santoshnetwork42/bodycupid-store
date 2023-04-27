import React from "react";
import Head from "next/head";
import { connect } from "react-redux";
import { useRouter } from "next/router";

// import ShopBanner from "~/components/partials/shop/shop-banner";
// import SidebarFilterOne from "~/components/partials/shop/sidebar/sidebar-filter-one";
import ProductListOne from "~/components/partials/shop/product-list/product-list-one";
import { findProducts } from "~/graphql/api";
import { STORE_ID } from "~/config";
import fetchData from "~/utils/fetchData";
import { optimizeProduct } from "~/utils/getStaticData";
import SearchBox from "~/components/common/partials/search-box";

function AllProduct(props) {
  const { store, products, pageFilter } = props;
  const { name } = store;

  const { query } = useRouter();
  const { search } = query;

  return (
    <main className="main">
      <Head>
        <title>{name} - All Products</title>
      </Head>

      <h1 className="d-none">{name} - All Products</h1>

      {/* <ShopBanner category={null} /> */}

      <div className="page-content pb-3">
        <div className="container">
          <div className="row main-content-wrap gutter-lg">
            <div className="col-lg-12 mn-4 d-sm-show">
              <SearchBox defaultSearch={search} />
            </div>
            <div className="col-lg-12 main-content">
              <ProductListOne products={products} pageFilter={pageFilter} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export const getStaticProps = async () => {
  try {
    const filter = {
      status: { eq: "ENABLED" },
      storeId: { eq: STORE_ID },
    };

    // Get all Product
    const { searchProducts } = await fetchData(findProducts, {
      filter,
      limit: 24,
    });

    const { items } = searchProducts;
    const products = await Promise.all(
      items.map((product) => optimizeProduct(product, { partial: true }))
    );

    return {
      props: {
        category: null,
        products: { ...searchProducts, items: products },
        categorySlug: null,
        pageFilter: filter,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
};

function mapStateToProps(state) {
  return {
    store: state.system.store,
  };
}

const Component = connect(mapStateToProps)(React.memo(AllProduct));
Component.showStickyCheckout = true;
Component.hideSearch = true;

export default Component;
