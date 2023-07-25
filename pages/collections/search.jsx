import React from "react";
import Head from "next/head";
import { connect } from "react-redux";
import { useRouter } from "next/router";

import ProductListOne from "~/components/partials/shop/product-list/product-list-one";
import { findProducts } from "~/graphql/api";
import { STORE_ID } from "~/config";
import fetchData from "~/utils/fetchData";
import SearchBox from "~/components/common/partials/search-box";

import { Logger } from "aws-amplify";

const logger = new Logger("search");

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

      <div className="page-content pb-3">
        <div className="container">
          <div className="row main-content-wrap gutter-lg">
            <div className="col-lg-12 mn-4 d-sm-show">
              <SearchBox defaultSearch={search} />
            </div>
            <div className="col-lg-12 main-content">
              <ProductListOne
                sectionId="Search"
                products={products}
                pageFilter={pageFilter}
              />
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
      revalidate: 60,
    };
  } catch (error) {
    logger.error("Error while searching a product", error);
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
Component.showTopRunner = true;

export default Component;
