import React from "react";
import Head from "next/head";
import { connect } from "react-redux";

import { STORE_ID } from "~/config";
import {
  getBasicCategory,
  getAllCategoriesPath,
  getAllSubcategoriesPath,
  listCollections as listCollectionsQuery,
  findProducts,
  getSubCategoriesByCategoryID,
  getBasicSubCategory,
  getCollection,
} from "~/graphql/api";
import ProductListOne from "~/components/partials/shop/product-list/product-list-one";
import fetchData from "~/utils/fetchData";
import CategoryHeader from "~/components/common/category-header";

function Categories(props) {
  const {
    store,
    products,
    sectionId,
    pageFilter,
    filterItems = [],
    data,
  } = props;
  const { name } = store;

  return (
    <main className="main searchBar">
      <Head>
        <title>
          {name} - {data.name}
        </title>
      </Head>

      <h1 className="d-none">
        {name} - {data.name}
      </h1>

      <div className="page-content  pb-3">
        <div className="container">
          <CategoryHeader {...data} />
          <div className="row main-content-wrap gutter-lg">
            <div className="col-lg-12 main-content">
              <ProductListOne
                isToolbox
                sectionId={sectionId}
                products={products}
                pageFilter={pageFilter}
                filterItems={filterItems}
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
  const [
    { searchProductCategories },
    { searchProductSubCategories },
    { listCollections },
  ] = await Promise.all([
    fetchData(getAllCategoriesPath, {
      filter: { storeId: { eq: STORE_ID } },
    }),
    fetchData(getAllSubcategoriesPath, {
      filter: { storeId: { eq: STORE_ID } },
    }),
    fetchData(listCollectionsQuery, {
      filter: { storeId: { eq: STORE_ID } },
    }),
  ]);

  const paths = [
    ...searchProductCategories.items,
    ...searchProductSubCategories.items,
    ...listCollections.items,
  ].map((c) => {
    return {
      params: { slug: c.slug },
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
    const { slug } = params;

    const filter = {
      status: { eq: "ENABLED" },
      storeId: { eq: STORE_ID },
    };

    // Category By Slug
    const [category] = await fetchData(getBasicCategory, {
      slug,
      filter: { storeId: { eq: STORE_ID } },
    }).then((resp) => resp.byslugProductCategory.items);

    if (category) {
      filter.categoryId = { eq: category.id };

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
          filter: {
            storeId: { eq: STORE_ID },
            categoryID: { eq: category.id },
          },
        }
      );

      const [{ searchProducts }, { searchProductSubCategories }] =
        await Promise.all([getProducts, getSubCategoriesByCategory]);

      const filterItems = [
        { name: "All", path: `/collections/${category.slug}` },
        ...searchProductSubCategories.items.map((sub) => ({
          ...sub,
          path: `/collections/${sub.slug}`,
        })),
      ];

      return {
        props: {
          slug,
          data: category,
          pageType: "CATEGORY",
          sectionId: category.id,
          products: searchProducts,
          filterItems,
          pageFilter: filter,
        },
      };
    }

    // Sub Category By Slug
    const [subCategory] = await fetchData(getBasicSubCategory, {
      slug,
      filter: { storeId: { eq: STORE_ID } },
    }).then((resp) => resp.byslugProductSubCategory.items);

    if (subCategory) {
      filter.subCategoryId = { eq: subCategory.id };

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
          filter: {
            storeId: { eq: STORE_ID },
            categoryID: { eq: subCategory.categoryID },
          },
        }
      );

      const [{ searchProducts }, { searchProductSubCategories }] =
        await Promise.all([getProducts, getSubCategoriesByCategory]);

      const filterItems = [
        { name: "All", path: `/collections/${subCategory.category.slug}` },
        ...searchProductSubCategories.items.map((sub) => ({
          ...sub,
          path: `/collections/${sub.slug}`,
        })),
      ];

      return {
        props: {
          slug,
          data: subCategory,
          pageType: "SUBCATEGORY",
          sectionId: subCategory.id,
          products: searchProducts,
          filterItems,
          pageFilter: filter,
        },
      };
    }

    const collection = await fetchData(getCollection, {
      slug,
    }).then((resp) => resp.getCollection);

    if (collection) {
      const { listCollections } = await fetchData(listCollectionsQuery, {
        filter: {
          storeId: { eq: STORE_ID },
          showInMenu: { eq: true },
        },
        sort: [{ field: "position", direction: "asc" }],
      });

      const collections = [
        { name: "All", path: "/collections/ranges" },
        ...listCollections.items.map((col) => ({
          ...col,
          path: `/collections/${col.slug}`,
        })),
        { name: "Combos & Gifts", path: "/collections/combos-and-gifts" },
      ];

      // Get Product By tag
      filter.collections = { eq: slug };
      const { searchProducts } = await fetchData(findProducts, {
        filter,
        sort: [{ field: "position", direction: "asc" }],
        variantFilter: { status: { eq: "ENABLED" } },
        imageLimit: 1,
      });

      return {
        props: {
          slug,
          data: collection,
          pageType: "COLLECTION",
          sectionId: slug,
          products: searchProducts,
          pageFilter: filter,
          filterItems: collections,
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
