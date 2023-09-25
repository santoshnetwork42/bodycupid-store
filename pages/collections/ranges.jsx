import React from "react";
import { connect } from "react-redux";

import ProductListOne from "~/components/partials/shop/product-list/product-list-one";
import {
  findProducts,
  getStoreBanners,
  searchCollectionTypes,
} from "~/graphql/api";
import { STORE_ID } from "~/config";
import fetchData from "~/utils/fetchData";
import NextHead from "~/components/common/next-head";
import { getPublicImageURL } from "~/utils/getPublicImageUrl";

import { Logger } from "aws-amplify";
import { getDefaultSorting } from "~/utils";

const logger = new Logger("Ranges collection");

function AllCollection(props) {
  const { store, products, pageFilter, collections, pageMeta } = props;
  const { name } = store || {};

  return (
    <main className="main">
      <NextHead {...pageMeta} />
      <h1 className="d-none">{name} - All Products</h1>
      <div className="page-content pb-3">
        <div className="container">
          <div className="row main-content-wrap gutter-lg">
            <div className="col-lg-12 main-content">
              <ProductListOne
                sectionId="All Ranges"
                products={products}
                isToolbox
                filterItems={collections}
                pageFilter={pageFilter}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export const getStaticProps = async () => {
  try {
    const filter = {
      status: { eq: "ENABLED" },
      storeId: { eq: STORE_ID },
      collections: { exists: true },
    };

    const { getStore } = await fetchData(getStoreBanners, { id: STORE_ID });
    const { title, name, description, webUrl, imageUrl } = getStore;

    const {
      searchCollectionTypes: { items: collectionsRes },
    } = await fetchData(searchCollectionTypes, {
      filter: {
        storeId: { eq: STORE_ID },
        showInMenu: { eq: true },
        isArchive: { eq: false },
      },
      sort: [{ field: "priority", direction: "asc" }],
    });

    const collections = [
      { name: "All", path: "/collections/all" },
      { name: "Ranges", path: "/collections/ranges" },
      ...collectionsRes.map((col) => ({
        ...col,
        path: `/collections/${col.slug}?sortby=${getDefaultSorting(
          col.defaultSorting
        )}`,
      })),
      { name: "Combos & Gifts", path: "/collections/combos-and-gifts" },
    ];

    // Get all Product
    const { searchProducts } = await fetchData(findProducts, {
      filter,
      sort: [{ field: "position", direction: "asc" }],
      variantFilter: { status: { eq: "ENABLED" } },
      imageLimit: 1,
    });

    return {
      props: {
        products: searchProducts,
        pageFilter: filter,
        collections,
        pageMeta: {
          siteName: name,
          title,
          description,
          canonical: `${webUrl}/collections/ranges`,
          image: getPublicImageURL(imageUrl),
        },
      },
      revalidate: 120,
    };
  } catch (error) {
    logger.error(error);
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

const Component = connect(mapStateToProps)(React.memo(AllCollection));
Component.showStickyCheckout = true;
Component.showTopRunner = true;

export default Component;
