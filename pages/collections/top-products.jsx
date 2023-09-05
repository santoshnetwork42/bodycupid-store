import React from "react";
import Head from "next/head";
import { connect } from "react-redux";
import { Logger } from "aws-amplify";

import ProductListOne from "~/components/partials/shop/product-list/product-list-one";
import CategoryHeader from "~/components/common/category-header";
import getRecommendedProducts from "~/utils/recommendedProduct";

const logger = new Logger("search");

function TopProducts(props) {
  const { store, products } = props;
  const { name } = store || {};

  return (
    <main className="main">
      <Head>
        <title>{name} - Top Products</title>
      </Head>

      <h1 className="d-none">{name} - Top Products</h1>

      <div className="page-content pb-3">
        <div className="container">
          <CategoryHeader name="Top Products" />
          <div className="pt-3 row main-content-wrap gutter-lg">
            <div className="col-lg-12 main-content">
              <ProductListOne
                sectionId="top-products"
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
    const products = await getRecommendedProducts({ limit: 25 });

    return {
      props: {
        products: {
          items: products,
          nextToken: null,
          total: products.length,
        },
      },
      revalidate: 60 * 60 * 24,
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

const Component = connect(mapStateToProps)(React.memo(TopProducts));
Component.showStickyCheckout = true;
Component.hideSearch = true;
Component.showTopRunner = true;

export default Component;
