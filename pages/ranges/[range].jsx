import React, { useMemo } from "react";
import Head from "next/head";
import { connect } from "react-redux";

import { STORE_ID } from "~/config";
import {
  getAllCategoriesPath,
  findProducts,
  listCollections,
  getCollectionsBySlug,
} from "~/graphql/api";
// import ShopBanner from "~/components/partials/shop/shop-banner";
import ProductListOne from "~/components/partials/shop/product-list/product-list-one";
import fetchData from "~/utils/fetchData";
import { optimizeProduct } from "~/utils/getStaticData";
import CategoryHeader from "~/components/common/category-header";

function Categories(props) {
  const {
    store,
    products,
    categoryId,
    tag,
    tagId,
    pageFilter,
    collections = [],
  } = props;
  const { name } = store;
  return (
    <main className="main searchBar">
      <Head>
        <title>
          {name} - {tag?.name}
        </title>
      </Head>

      <h1 className="d-none">
        {name} - {tag?.name}
      </h1>

      <div className="page-content  pb-3">
        <div className="container">
          <CategoryHeader name={tag?.name} description={tag?.description} />
          <div className="row main-content-wrap gutter-lg">
            <div className="col-lg-12 main-content">
              <ProductListOne
                tag={tag}
                tagId={tagId}
                categoryId={categoryId}
                products={products}
                pageFilter={pageFilter}
                filterItems={collections}
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
    const { range: slug } = params;
    const filter = {
      status: { eq: "ENABLED" },
      storeId: { eq: STORE_ID },
    };

    const {
      searchCollections: {
        items: [tag],
      },
    } = await fetchData(getCollectionsBySlug, {
      filter: { slug: { eq: slug } },
    });
    if (tag) {
      filter.collections = { eq: slug };
      const {
        listCollections: { items: collectionsRes },
      } = await fetchData(listCollections, {
        filter: {
          storeId: { eq: STORE_ID },
        },
        sort: [{ field: "position", direction: "asc" }],
      });
      const collections = [
        { name: "all", path: "/ranges/all" },
        ...collectionsRes.map((col) => ({
          ...col,
          path: `/ranges/${col.slug}`,
        })),
      ];
      // Get Product By tag
      const { searchProducts } = await fetchData(findProducts, {
        filter,
        sort: [{ field: "position", direction: "asc" }],
        variantFilter: { status: { eq: "ENABLED" } },
        imageLimit: 1,
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
          collections,
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
