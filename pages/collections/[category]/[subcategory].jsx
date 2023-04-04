import React, { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { API, graphqlOperation } from "aws-amplify";
import { connect } from "react-redux";

import { STORE_ID } from "~/config";
import { getBasicSubCategory } from "~/graphql/api";
import ShopBanner from "~/components/partials/shop/shop-banner";
import SidebarFilterOne from "~/components/partials/shop/sidebar/sidebar-filter-one";
import ProductListOne from "~/components/partials/shop/product-list/product-list-one";

function Categories({ store }) {
  const { name } = store;
  const [category, setCategory] = useState(null);
  const router = useRouter();

  const { subcategory: subCategorySlug } = router.query;

  useEffect(() => {
    getSubCategoryBySlug();
  }, [subCategorySlug]);

  const getSubCategoryBySlug = useCallback(async () => {
    try {
      const {
        data: {
          byslugProductSubCategory: {
            items: [response],
          },
        },
      } = await API.graphql(
        graphqlOperation(getBasicSubCategory, {
          slug: subCategorySlug,
          filter: { storeId: { eq: STORE_ID } },
        })
      );
      setCategory(response);
    } catch (error) {
      console.log("byslugProductSubCategory", error);
    }
  }, [subCategorySlug]);

  return (
    <main className="main searchBar">
      <Head>
        <title>
          {name} - {category?.name}
        </title>
      </Head>

      <h1 className="d-none">
        {name} - {category?.name}
      </h1>

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
const Component = connect(mapStateToProps)(React.memo(Categories));
Component.showMobileSearchBar = true;

export default Component;
