import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { connect } from "react-redux";

import SearchBox from "~/components/common/partials/search-box";
import { STORE_ID } from "~/config";
import { findProducts } from "~/graphql/api";
import fetchData from "~/utils/fetchData";

import SearchListOne from "~/components/partials/shop/product-list/search-list-one";

function AllProduct(props) {
  const { store, products, pageFilter, isSearch } = props;
  const { name } = store || {};

  const { query } = useRouter();
  const { search } = query;

  useEffect(() => {
    const inputField = document.getElementById("search-input");

    if (inputField) {
      inputField.focus();
      inputField.value = "";
    }
  }, []);

  return (
    <main className="main">
      <Head>
        <title>{name} - All Products</title>
      </Head>

      <h1 className="d-none">{name} - All Products</h1>

      <div className="page-content pb-3">
        <div className="container">
          {/* {!!search && <CategoryHeader name={`Results Of ${search}`} />} */}
          <div className="row main-content-wrap gutter-lg">
            <div className="col-lg-12 mn-4 d-sm-show">
              <SearchBox defaultSearch={search} />
            </div>
            <div className="col-lg-12 main-content">
              <SearchListOne
                sectionId="Search"
                products={products}
                pageFilter={pageFilter}
                isSearch={isSearch}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export const getStaticProps = async () => {
  const filter = {
    status: { eq: "ENABLED" },
    storeId: { eq: STORE_ID },
    collections: { eq: "best-seller" },
  };

  // Get all Product
  const { searchProducts } = await fetchData(findProducts, {
    filter,
    sort: [{ field: "position", direction: "asc" }],
    variantFilter: { status: { eq: "ENABLED" } },
    imageLimit: 1,
    limit: 16,
  });

  return {
    props: {
      products: searchProducts,
      pageFilter: filter,
    },
  };
};

function mapStateToProps(state) {
  return {
    store: state.system.store,
  };
}

const Component = connect(mapStateToProps)(React.memo(AllProduct));
Component.showStickyCheckout = true;
Component.hideSearch = true;
Component.showTopRunner = true;
Component.showTimer = true;

export default Component;
