import React from "react";
import Head from "next/head";
import { connect } from "react-redux";

import { STORE_ID } from "~/config";
import {
  getBasicCategory,
  getAllCategoriesPath,
  findProducts,
  getSubCategoriesByCategoryID,
} from "~/graphql/api";
import ProductListOne from "~/components/partials/shop/product-list/product-list-one";
import fetchData from "~/utils/fetchData";
import { optimizeCategory, optimizeProduct } from "~/utils/getStaticData";
import CategoryHeader from "~/components/common/category-header";

function Categories(props) {
  const {
    store,
    category,
    products,
    categoryId,
    pageFilter,
    subCategories = [],
  } = props;
  const { name } = store;

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

      <div className="page-content  pb-3">
        <div className="container">
          <CategoryHeader
            name={category?.name}
            description={category?.description}
          />
          <div className="row main-content-wrap gutter-lg">
            <div className="col-lg-12 main-content">
              <ProductListOne
                isToolbox
                sectionId={categoryId}
                products={products}
                pageFilter={pageFilter}
                filterItems={subCategories}
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
  const { searchProductCategories } = await fetchData(getAllCategoriesPath, {
    filter: { storeId: { eq: STORE_ID } },
  });

  const paths = searchProductCategories.items.map((c) => {
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

      // Get Product By Category
      const getProducts = fetchData(findProducts, {
        filter,
        sort: [{ field: "position", direction: "asc" }],
        variantFilter: { status: { eq: "ENABLED" } },
        imageLimit: 1,
      });

      // Get Product Sub-Category By Category ID
      const getSubCategoriesByCategory = fetchData(
        getSubCategoriesByCategoryID,
        {
          filter: { storeId: { eq: STORE_ID }, categoryID: { eq: id } },
        }
      );

      const [{ searchProducts }, { searchProductSubCategories }] =
        await Promise.all([getProducts, getSubCategoriesByCategory]);
      const { items: subCategoriesRes } = searchProductSubCategories;

      const subCategories = [
        { name: "All", path: `/collections/${category.slug}` },
        ...subCategoriesRes.map((sub) => ({
          ...sub,
          path: `/collections/${category.slug}/${sub.slug}`,
        })),
      ];
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
          subCategories,
          pageFilter: filter,
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

const Component = connect(mapStateToProps)(Categories);
Component.showStickyCheckout = true;
export default Component;
