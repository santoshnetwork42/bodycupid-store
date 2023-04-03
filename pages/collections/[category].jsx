import React from "react";
import Head from "next/head";
import { connect } from "react-redux";

import { STORE_ID } from "~/config";
import { getBasicCategory, getCategoriesSlug } from "~/graphql/api";
import ShopBanner from "~/components/partials/shop/shop-banner";
import SidebarFilterOne from "~/components/partials/shop/sidebar/sidebar-filter-one";
import ProductListOne from "~/components/partials/shop/product-list/product-list-one";
import fetchData from "~/utils/fetchData";

function Categories(props) {
  const { store, category } = props;
  const { name } = store;

  return (
    <main className="main searchBar">
      <Head>
        <title>
          {category?.name} - {name}
        </title>
      </Head>

      <h1 className="d-none">
        {category?.name} - {name}
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

export const getStaticPaths = async () => {
  const {
    searchProductCategories: { items: response },
  } = await fetchData(getCategoriesSlug, {
    filter: { storeId: { eq: STORE_ID } },
  });
  if (!!response?.length) {
    const paths = response.map((c) => {
      return {
        params: { category: c.slug },
      };
    });
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
    const { category: categorySlug } = params;
    const {
      byslugProductCategory: {
        items: [response],
      },
    } = await fetchData(getBasicCategory, {
      slug: categorySlug,
      filter: { storeId: { eq: STORE_ID } },
    });
    return {
      props: {
        category: response,
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
