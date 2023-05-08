import React from "react";
import Head from "next/head";
import { connect } from "react-redux";

import { STORE_ID } from "~/config";
import {
  getBasicSubCategory,
  getAllSubcategoriesPath,
  findProducts,
  getSubCategoriesByCategoryID,
} from "~/graphql/api";
// import ShopBanner from "~/components/partials/shop/shop-banner";
// import SidebarFilterOne from "~/components/partials/shop/sidebar/sidebar-filter-one";
import ProductListOne from "~/components/partials/shop/product-list/product-list-one";
import fetchData from "~/utils/fetchData";
import { optimizeCategory, optimizeProduct } from "~/utils/getStaticData";
import CategoryHeader from "~/components/common/category-header";

function Categories(props) {
  const {
    store,
    subCategory,
    products,
    categoryId,
    subCategoryId,
    pageFilter,
    subCategories,
  } = props;
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

      {/* <ShopBanner category={subCategory} /> */}

      <div className="page-content pb-3">
        <div className="container">
          <CategoryHeader
            name={subCategory?.name}
            description={subCategory?.description}
          />
          <div className="row main-content-wrap gutter-lg">
            <div className="col-lg-12 main-content">
              <ProductListOne
                category={subCategory}
                categoryId={categoryId}
                subCategoryId={subCategoryId}
                products={products}
                pageFilter={pageFilter}
                subCategories={subCategories}
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
    searchProductSubCategories: { items: response },
  } = await fetchData(getAllSubcategoriesPath, {
    filter: { storeId: { eq: STORE_ID }, categoryID: { exists: true } },
  });

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
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async (context) => {
  try {
    const { params } = context;
    const { subcategory: slug } = params || {};

    // Sub Category By Slug
    let {
      byslugProductSubCategory: {
        items: [subCategory],
      },
    } = await fetchData(getBasicSubCategory, {
      slug,
      filter: { storeId: { eq: STORE_ID } },
    });

    // Get Product By Sub Category
    if (subCategory) {
      const { id, categoryID } = subCategory;
      const filter = {
        subCategoryId: { eq: id },
        status: { eq: "ENABLED" },
        storeId: { eq: STORE_ID },
      };

      const getProduct = fetchData(findProducts, {
        filter,
        sort: [{ field: "position", direction: "asc" }],
        variantFilter: { status: { eq: "ENABLED" } },
        variantLimit: 1,
        imageLimit: 1,
      });

      // Get Product Sub-Category By Category ID
      const getSubCategoriesByCategory = fetchData(
        getSubCategoriesByCategoryID,
        {
          filter: { storeId: { eq: STORE_ID }, categoryID: { eq: categoryID } },
        }
      );

      const [{ searchProducts }, { searchProductSubCategories }] =
        await Promise.all([getProduct, getSubCategoriesByCategory]);

      const { items: subCategories } = searchProductSubCategories;
      const { items } = searchProducts;
      const products = await Promise.all(
        items.map((product) => optimizeProduct(product, { partial: true }))
      );
      const optimizedSubCategory = await optimizeCategory(subCategory);

      return {
        props: {
          subCategory: optimizedSubCategory,
          categoryId: categoryID,
          subCategoryId: id,
          products: { ...searchProducts, items: products },
          subCategories,
          pageFilter: filter,
        },
      };
    }
  } catch (error) {
    console.log("sub category", error);
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
