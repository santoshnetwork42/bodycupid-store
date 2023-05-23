import React from "react";
import { connect } from "react-redux";

// import ShopBanner from "~/components/partials/shop/shop-banner";
// import SidebarFilterOne from "~/components/partials/shop/sidebar/sidebar-filter-one";
import ProductListOne from "~/components/partials/shop/product-list/product-list-one";
import {
  findProducts,
  getMenuCategories,
  getStoreBanners,
} from "~/graphql/api";
import { STORE_ID } from "~/config";
import fetchData from "~/utils/fetchData";
import NextHead from "~/components/common/next-head";
import { getPublicImageURL } from "~/utils/getPublicImageUrl";

import { Logger } from 'aws-amplify';

const logger = new Logger('All collections');

function AllProduct(props) {
  const { store, products, pageFilter, categories, pageMeta } = props;
  const { name } = store;

  return (
    <main className="main">
      <NextHead {...pageMeta} />

      <h1 className="d-none">{name} - All Products</h1>

      {/* <ShopBanner category={null} /> */}
      <div className="page-content pb-3">
        <div className="container">
          <div className="row main-content-wrap gutter-lg">
            <div className="col-lg-12 main-content">
              <ProductListOne
                sectionId="All"
                products={products}
                filterItems={categories}
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
    };

    //get all categories
    const { searchProductCategories } = await fetchData(getMenuCategories, {
      filter: { storeId: { eq: STORE_ID } },
      sort: [{ field: "priority", direction: "asc" }],
    });

    const { getStore } = await fetchData(getStoreBanners, { id: STORE_ID });
    const { title, name, description, webUrl, imageUrl } = getStore;

    const categories = [
      { name: "all", path: "/collections/all" },
      ...searchProductCategories.items.map((cat) => ({
        ...cat,
        path: `/collections/${cat.slug}`,
      })),
      { name: "Ranges", path: "/collections/ranges" },
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
        categories,
        products: searchProducts,
        pageFilter: filter,
        pageMeta: {
          siteName: name,
          title,
          description,
          canonical: `${webUrl}/collections/all`,
          image: getPublicImageURL(imageUrl),
        },
      },
      revalidate: 60,
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

const Component = connect(mapStateToProps)(React.memo(AllProduct));
Component.showStickyCheckout = true;

export default Component;
