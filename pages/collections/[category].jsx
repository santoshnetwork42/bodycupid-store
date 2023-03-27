import React, { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import { API, graphqlOperation } from "aws-amplify";
import { useRouter } from "next/router";
import { connect } from "react-redux";

import { STORE_ID } from "~/config";
import { getBasicCategory } from "~/graphql/api";
import ShopBanner from "~/components/partials/shop/shop-banner";
import SidebarFilterOne from "~/components/partials/shop/sidebar/sidebar-filter-one";
import ProductListOne from "~/components/partials/shop/product-list/product-list-one";

function Categories({ store }) {
  const { name } = store;
  const [category, setCategory] = useState(null);
  const router = useRouter();

  const { category: categorySlug } = router.query;

  useEffect(() => {
    getCategoryByslug();
  }, [categorySlug]);

  const getCategoryByslug = useCallback(async () => {
    try {
      if (categorySlug !== "all") {
        const {
          data: {
            byslugProductCategory: {
              items: [response],
            },
          },
        } = await API.graphql(
          graphqlOperation(getBasicCategory, {
            slug: categorySlug,
            filter: { storeId: { eq: STORE_ID } },
          })
        );
        setCategory(response);
      } else {
        setCategory(null);
      }
    } catch (error) {
      console.log("byslugProductCategory", error);
    }
  }, [categorySlug]);

  return (
    <main className="main">
      <Head>
        <title>{name} - Shop Page</title>
      </Head>

      <h1 className="d-none">{name} - Shop Page</h1>

      <ShopBanner bannerUrl={category?.bannerUrl} />

      <div className="page-content mb-10 pb-3">
        <div className="container">
          <div className="row main-content-wrap gutter-lg">
            <SidebarFilterOne />

            <div className="col-lg-9 main-content">
              <ProductListOne category={category} />
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

export default connect(mapStateToProps)(React.memo(Categories));
