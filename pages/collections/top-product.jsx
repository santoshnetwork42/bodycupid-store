import React from "react";
import Head from "next/head";
import { connect } from "react-redux";

import ProductListOne from "~/components/partials/shop/product-list/product-list-one";
import CategoryHeader from "~/components/common/category-header";
import { getRecommendation } from "~/graphql/api";
import { STORE_ID } from "~/config";
import fetchData from "~/utils/fetchData";

import { Logger } from "aws-amplify";

const logger = new Logger("search");

function AllProduct(props) {
  const { store, products } = props;
  const { name } = store;
  const data = {
    name: "Top Products",
    description: ""
  }

  return (
    <main className="main">
      <Head>
        <title>{name} - All Products</title>
      </Head>

      <h1 className="d-none">{name} - All Products</h1>

      <div className="page-content pb-3">
        <div className="container">
          <CategoryHeader {...data} />
          <div className="row main-content-wrap gutter-lg">
            <div className="col-lg-12 main-content">
              <ProductListOne
                sectionId={"top-product"}
                products={products}
                isToolbox={false}
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

    // Get all Recommended Products from Best Seller Recommender
    const response = await fetchData(getRecommendation, {
      input: {
        storeId: STORE_ID,
        recommenderType: "BEST_SELLER",
        limit: 25,
      },
    });

    return {
      props: {
        products: response.getRecommendation,
      },
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
