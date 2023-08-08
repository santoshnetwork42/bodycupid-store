import React from "react";
import Head from "next/head";
import { connect } from "react-redux";

import ProductListOne from "~/components/partials/shop/product-list/product-list-one";
import CategoryHeader from "~/components/common/category-header";
import { getProductRecommendation, getProductById } from "~/graphql/api";
import { STORE_ID } from "~/config";
import fetchData from "~/utils/fetchData";

import { Logger } from "aws-amplify";

const logger = new Logger("search");

function AllProduct(props) {
  const { store, products } = props;
  const { name } = store;
  const data = {
    name: "Top Products",
    description: "",
  };

  return (
    <main className="main">
      <Head>
        <title>{name} - All Products</title>
      </Head>

      <h1 className="d-none">{name} - All Products</h1>

      <div className="page-content pb-3">
        <div className="container">
          <CategoryHeader {...data} />
          <div className="pt-3 row main-content-wrap gutter-lg">
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
    const bestSellersPersonalizedIds = await fetchData(
      getProductRecommendation,
      {
        input: {
          storeId: STORE_ID,
          recommenderType: "BEST_SELLER",
          limit: 25,
        },
      }
    );

    const bestSellersPersonalized = await Promise.all(
      bestSellersPersonalizedIds.getProductRecommendation.map(
        async ({ productId, variantId }) => {
          return await fetchData(getProductById, {
            id: productId,
          })
            .then((res) => res.getProduct)
            .then((res) => {
              if (res.variants && res.variants.items) {
                res.variants.items = res.variants.items.filter(
                  (variant) => variant.status === "ENABLED"
                );
              }
              return res;
            })
            .then((res) => {
              if (variantId) {
                res.variantId = variantId;
              }
              return res;
            });
        }
      )
    );

    return {
      props: {
        products: bestSellersPersonalized,
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
