import React from "react";
import Head from "next/head";
import { connect } from "react-redux";

import { STORE_ID } from "~/config";
import { getBasicSubCategory, getSubCategoriesSlug } from "~/graphql/api";
import ShopBanner from "~/components/partials/shop/shop-banner";
import SidebarFilterOne from "~/components/partials/shop/sidebar/sidebar-filter-one";
import ProductListOne from "~/components/partials/shop/product-list/product-list-one";
import fetchData from "~/utils/fetchData";

function Categories({ subCategory, store }) {
  const { name } = store;

  return (
    <main className="main searchBar">
      <Head>
        <title>
          {name} - {subCategory.name}
        </title>
      </Head>

      <h1 className="d-none">
        {name} - {subCategory.name}
      </h1>

      <ShopBanner bannerUrl={subCategory?.bannerUrl} />

      <div className="page-content mb-10 pb-3">
        <div className="container">
          <div className="row main-content-wrap gutter-lg">
            <SidebarFilterOne />

            <div className="col-lg-9 main-content">
              <ProductListOne category={subCategory} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export const getStaticPaths = async () => {
  const {
    searchProductSubCategories: { items: response },
  } = await fetchData(getSubCategoriesSlug, {
    filter: { storeId: { eq: STORE_ID }, categoryID: { exists: true } },
  });

  if (!!response?.length) {
    const paths = response.reduce((obj, cur) => {
      if (cur.category) {
        obj.push({
          params: {
            category: cur?.category?.slug,
            subcategory: cur?.slug,
          },
        });
      }
      return obj;
    }, []);
    return {
      paths: paths,
      fallback: false,
    };
  }
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps = async (context) => {
  try {
    const { params } = context;
    const { subcategory: subCategorySlug } = params || {};
    const {
      byslugProductSubCategory: {
        items: [response],
      },
    } = await fetchData(getBasicSubCategory, {
      slug: subCategorySlug,
      filter: { storeId: { eq: STORE_ID } },
    });

    return {
      props: {
        subCategory: response,
      },
    };
  } catch (error) {
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

const Component = connect(mapStateToProps)(React.memo(Categories));
Component.showMobileSearchBar = true;

export default Component;
