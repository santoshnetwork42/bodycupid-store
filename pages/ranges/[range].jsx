import React from "react";
import Head from "next/head";
import { connect } from "react-redux";

import { STORE_ID } from "~/config";
import {
  findProducts,
  getCollectionsBySlug,
  listCollections as listCollectionsMutation,
} from "~/graphql/api";
import ProductListOne from "~/components/partials/shop/product-list/product-list-one";
import fetchData from "~/utils/fetchData";
import { optimizeProduct } from "~/utils/getStaticData";
import CategoryHeader from "~/components/common/category-header";

function Categories(props) {
  const { store, products, tag, tagId, pageFilter, collections = [] } = props;
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
                isToolbox
                sectionId={tagId}
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

  const { listCollections } = await fetchData(listCollections);
  const paths = listCollections.items.map((c) => {
    return {
      params: { range: c.slug },
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
      const { listCollections } = await fetchData(listCollectionsMutation, {
        filter: {
          storeId: { eq: STORE_ID },
          showInMenu: { eq: true },
        },
        sort: [{ field: "position", direction: "asc" }],
      });

      const collections = [
        { name: "All", path: "/ranges/all" },
        ...listCollections.items.map((col) => ({
          ...col,
          path: `/ranges/${col.slug}`,
        })),
        { name: "Combos & Gifts", path: "/ranges/combos-and-gifts" },
      ];

      // Get Product By tag
      filter.collections = { eq: slug };
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
