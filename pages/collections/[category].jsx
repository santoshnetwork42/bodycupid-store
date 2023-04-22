import React from "react";
import Head from "next/head";
import { connect } from "react-redux";

import { STORE_ID } from "~/config";
import {
  getBasicCategory,
  getAllCategoriesPath,
  findProducts,
  getSideBarFilterCategories,
  getSubCategoriesByCategoryID,
  listCollections,
  getCollectionsBySlug,
} from "~/graphql/api";
// import ShopBanner from "~/components/partials/shop/shop-banner";
import SidebarFilterOne from "~/components/partials/shop/sidebar/sidebar-filter-one";
import ProductListOne from "~/components/partials/shop/product-list/product-list-one";
import fetchData from "~/utils/fetchData";
import { optimizeCategory, optimizeProduct } from "~/utils/getStaticData";

function Categories(props) {
  const {
    store,
    category,
    products,
    categoryId,
    tag,
    sideBarCategories,
    pageFilter,
  } = props;

  const { name } = store;
  const collectionType = category || tag;

  return (
    <main className="main searchBar">
      <Head>
        <title>
          {name} - {collectionType?.name}
        </title>
      </Head>

      <h1 className="d-none">
        {name} - {collectionType?.name}
      </h1>

      {/* <ShopBanner category={category} /> */}

      <div className="page-content mb-10 pb-3">
        <div className="container">
          <div className="row main-content-wrap gutter-lg">
            <SidebarFilterOne categories={sideBarCategories} />

            <div className="col-lg-9 main-content">
              <ProductListOne
                tag={tag}
                categoryId={categoryId}
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

export const getStaticPaths = async () => {
  if (process.env.NODE_ENV === "development") {
    return {
      paths: [],
      fallback: "blocking",
    };
  }
  const {
    searchProductCategories: { items: response },
  } = await fetchData(getAllCategoriesPath, {
    filter: { storeId: { eq: STORE_ID } },
  });

  const {
    listCollections: { items: collectionRes },
  } = await fetchData(listCollections);

  const data = [
    ...new Map(
      [...collectionRes, ...response].map((v) => [v.slug, v])
    ).values(),
  ];
  const paths = data.map((c) => {
    return {
      params: { category: c.slug },
    };
  });
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async (context) => {
  try {
    const { params } = context;
    const { category: slug } = params;

    // Category By Slug
    let {
      byslugProductCategory: {
        items: [category],
      },
    } = await fetchData(getBasicCategory, {
      slug,
      filter: { storeId: { eq: STORE_ID } },
    });

    const filter = {
      status: { eq: "ENABLED" },
      storeId: { eq: STORE_ID },
    };

    if (category) {
      const { id } = category;
      filter.categoryId = { eq: id };

      // Get SideBar Categories
      const getSidebarCategory = fetchData(getSideBarFilterCategories, {
        filter: { storeId: { eq: STORE_ID } },
      });

      // Get Product By Category
      const getProducts = fetchData(findProducts, {
        filter,
        limit: 18,
      });

      // Get Product Sub-Category By Category ID
      const getSubCategoriesByCategory = fetchData(
        getSubCategoriesByCategoryID,
        {
          filter: { storeId: { eq: STORE_ID }, categoryID: { eq: id } },
        }
      );
      const [
        { searchProductCategories },
        { searchProducts },
        { searchProductSubCategories },
      ] = await Promise.all([
        getSidebarCategory,
        getProducts,
        getSubCategoriesByCategory,
      ]);
      const { items: subCategories } = searchProductSubCategories;
      const { items: categories } = searchProductCategories;
      const { items } = searchProducts;
      const products = await Promise.all(
        items.map((product) => optimizeProduct(product, { partial: true }))
      );
      const optimizedCategory = await optimizeCategory(category);

      return {
        props: {
          categoryId: id,
          category: optimizedCategory,
          products: { ...searchProducts, items: products },
          sideBarCategories: categories,
          subCategories,
          filter,
        },
      };
    }
    const {
      searchCollections: {
        items: [tag],
      },
    } = await fetchData(getCollectionsBySlug, {
      filter: { slug: { eq: slug } },
    });
    if (tag) {
      const { slug } = tag;
      filter.collections = { eq: slug };

      // Get Product By tag
      const { searchProducts } = await fetchData(findProducts, {
        filter,
        limit: 18,
      });
      const products = await Promise.all(
        searchProducts?.items.map((product) =>
          optimizeProduct(product, { partial: true })
        )
      );
      return {
        props: {
          tag,
          products: { ...searchProducts, items: products },
          pageFilter: filter,
          sideBarCategories: [],
        },
      };
    }
  } catch (error) {
    console.log("category", error);
  }
  return {
    notFound: true,
  };
};

function mapStateToProps(state) {
  return {
    store: state.system.store,
  };
}

const Component = connect(mapStateToProps)(React.memo(Categories));

Component.showStickyCheckout = true;

export default Component;
