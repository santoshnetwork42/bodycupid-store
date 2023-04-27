import React from "react";
import Head from "next/head";
import { connect } from "react-redux";

import { STORE_ID } from "~/config";
import {
  getBasicCategory,
  getAllCategoriesPath,
  findProducts,
  getSubCategoriesByCategoryID,
  listCollections,
  getCollectionsBySlug,
} from "~/graphql/api";
// import ShopBanner from "~/components/partials/shop/shop-banner";
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
    tag,
    tagId,
    pageFilter,
    subCategories,
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
      <div className="page-content  pb-3">
        <div className="container">
          <CategoryHeader
            name={collectionType?.name}
            description={collectionType?.description}
          />
          <div className="row main-content-wrap gutter-lg">
            <div className="col-lg-12 main-content">
              <ProductListOne
                tag={tag}
                tagId={tagId}
                categoryId={categoryId}
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

      const [{ searchProducts }, { searchProductSubCategories }] =
        await Promise.all([getProducts, getSubCategoriesByCategory]);
      const { items: subCategories } = searchProductSubCategories;
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
          // sideBarCategories: categories,
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
          tagId: slug,
          products: { ...searchProducts, items: products },
          pageFilter: filter,
          // sideBarCategories: [],
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
