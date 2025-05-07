import { useEffect } from "react";
import { connect } from "react-redux";

import CategoryHeader from "~/components/common/category-header";
import NextHead from "~/components/common/next-head";
import Image from "~/components/image";
import ProductListOne from "~/components/partials/shop/product-list/product-list-one";
import { STORE_ID } from "~/config";
import {
  findProducts,
  getAllCategoriesPath,
  getAllCollectionPath,
  getBasicCategory,
  getStoreBanners,
  getSubCategoriesByCategoryID,
  searchCollectionTypes,
} from "~/graphql/api";
import { eventActions } from "~/store/events";
import fetchData from "~/utils/fetchData";
import { getPublicImageURL } from "~/utils/getPublicImageUrl";
import handleRedirect from "~/utils/handleRedirect";
import { getSource } from "~/utils/helper";

function CollectionPage(props) {
  const {
    store,
    products,
    sectionId,
    pageFilter,
    filterItems = [],
    data,
    pageMeta,
    categoryViewed,
    sortBy,
    collectionViewed,
  } = props;
  const { name } = store || {};
  const source = getSource();

  useEffect(() => {
    if (data?.name) {
      categoryViewed({
        URL: window.location.href,
        "Category Name": data.name,
        "Item Count": products.items.length,
        Source: source,
      });
    }
    const { slug, name, title, id, bannerUrl } = data;
    const timeoutId = setTimeout(() => {
      collectionViewed({
        collectionId: id,
        title: title || name,
        slug,
        imageUrl: getPublicImageURL(bannerUrl),
      });
    }, 1000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [data]);

  const imageUrl = data.hasOwnProperty("bannerUrl")
    ? data.bannerUrl
    : data.imageUrl;

  return (
    <main className="main searchBar">
      {/* <NextHead {...pageMeta} /> */}

      <h1 className="d-none">
        {name} - {data?.name}
      </h1>

      <div className="page-content  pb-3">
        <div className="container">
          <CategoryHeader {...data} />
          {imageUrl && (
            <div className="text-center pt-4">
              <Image
                src={imageUrl}
                alt="Category Image"
                width={1200}
                height={305}
              />
            </div>
          )}
          <div className="row main-content-wrap gutter-lg">
            <div className="col-lg-12 main-content">
              <ProductListOne
                isToolbox
                sectionId={sectionId}
                products={products}
                pageFilter={pageFilter}
                filterItems={filterItems}
                defaultSorting={data?.defaultSorting}
                nextToken={products?.nextToken}
                sortBy={sortBy}
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
    { searchCollectionTypes: allCollections },
  ] = await Promise.all([
    fetchData(getAllCategoriesPath, {
      filter: { storeId: { eq: STORE_ID }, isArchive: { eq: false } },
    }),
    fetchData(getAllCollectionPath, {
      filter: { storeId: { eq: STORE_ID }, isArchive: { eq: false } },
    }),
  ]);

  const paths = [...searchProductCategories.items, ...allCollections.items].map(
    (c) => {
      return {
        params: { slug: c.slug },
      };
    }
  );

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async (context) => {
  const { params } = context;
  const { slug } = params;

  const filter = {
    status: { eq: "ENABLED" },
    storeId: { eq: STORE_ID },
  };

  const { getStore } = await fetchData(getStoreBanners, {
    id: STORE_ID,
    deviceType: "WEB",
  });
  const { webUrl, name } = getStore;

  // Category By Slug
  // const [category] = await fetchData(getBasicCategory, {
  //   slug,
  //   filter: { storeId: { eq: STORE_ID }, isArchive: { eq: false } },
  // }).then((resp) => resp.byslugProductCategory.items);

  // if (category) {
  //   // filter.categoryId = { eq: category.id };
  //   const {
  //     title,
  //     description,
  //     imageUrl,
  //     name: categoryName,
  //     metadata,
  //   } = category;

  //   // Get Product By Category
  //   const getProducts = fetchData(findProducts, {
  //     filter: {
  //       status: { eq: "ENABLED" },
  //       storeId: { eq: STORE_ID },
  //       and: [
  //         {
  //           or: [
  //             {
  //               categoryId: { eq: category.id },
  //             },
  //             {
  //               subCategoryId: { eq: category.id },
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //     sort: [{ field: "position", direction: "asc" }],
  //     variantFilter: { status: { eq: "ENABLED" } },
  //     imageLimit: 1,
  //   });

  //   // Get Product Sub-Category By Category ID
  //   const getSubCategoriesByCategory = fetchData(getSubCategoriesByCategoryID, {
  //     filter: {
  //       storeId: { eq: STORE_ID },
  //       categoryID: { eq: category.id },
  //       isArchive: { eq: false },
  //     },
  //   });

  //   const [{ searchProducts }, { searchProductCategories }] = await Promise.all(
  //     [getProducts, getSubCategoriesByCategory]
  //   );

  //   const filterItems = [
  //     { name: "All", path: `/collections/${category.slug}` },
  //     ...searchProductCategories.items.map((sub) => ({
  //       ...sub,
  //       path: `/collections/${sub.slug}`,
  //     })),
  //   ];

  //   return {
  //     props: {
  //       slug,
  //       data: category,
  //       pageType: "CATEGORY",
  //       sectionId: category.id,
  //       products: searchProducts,
  //       filterItems,
  //       pageFilter: filter,
  //       pageMeta: {
  //         siteName: name,
  //         title: metadata?.title || title || categoryName,
  //         description: metadata?.description || description,
  //         canonical: metadata?.canonical || `${webUrl}/collections/${slug}`,
  //         image: getPublicImageURL(metadata?.image || imageUrl),
  //         noIndex: metadata?.noIndex || false,
  //       },
  //     },
  //     revalidate: 1800,
  //   };
  // }

  const collection = await fetchData(searchCollectionTypes, {
    filter: {
      slug: { eq: slug },
      storeId: { eq: STORE_ID },
      isArchive: { eq: false },
    },
  }).then((resp) =>
    resp?.searchCollectionTypes.items.find((item) => item.slug === slug)
  );

  if (collection) {
    const {
      title,
      description,
      imageUrl,
      name: collectionName,
      metadata,
      showOutOfStockProducts = true,
    } = collection;

    const otherCollections = await fetchData(searchCollectionTypes, {
      filter: {
        storeId: { eq: STORE_ID },
        slug: { ne: slug },
        isArchive: { eq: false },
      },
      sort: [{ field: "priority", direction: "asc" }],
    }).then((res) => res.searchCollectionTypes.items);

    const collections = [
      { name: "All", path: "/collections/ranges" },
      { name: collectionName, path: `/collections/${slug}` },
      ...otherCollections.map((col) => ({
        ...col,
        path: `/collections/${col.slug}`,
      })),
    ];

    if (slug !== "combos-and-gifts") {
      collections.push({
        name: "Combos & Gifts",
        path: "/collections/combos-and-gifts",
      });
    }

    const sortBy = [];
    switch (collection.defaultSorting) {
      case "LATEST":
        sortBy.push({ field: "createdAt", direction: "desc" });
        break;
      case "HIGHEST_RATED":
        sortBy.push({ field: "rating", direction: "desc" });
        break;
      case "PRICE_LOW_TO_HIGH":
        sortBy.push({ field: "defaultPrice", direction: "asc" });
        break;
      case "PRICE_HIGH_TO_LOW":
        sortBy.push({ field: "defaultPrice", direction: "desc" });
        break;
      case "AVAILABILITY":
        sortBy.push({ field: "defaultInventory", direction: "desc" });
        break;
      case "BEST_SELLERS":
        sortBy.push({ field: "totalOrders", direction: "desc" });
        break;
      default:
        sortBy.push({ field: "position", direction: "asc" });
    }

    // Get Product By tag
    filter.collections = { eq: slug };
    if (!showOutOfStockProducts) {
      filter.defaultInventory = { gt: 0 };
    }
    const { searchProducts } = await fetchData(findProducts, {
      filter,
      sort: sortBy,
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
        sortBy,
        pageMeta: {
          siteName: name,
          title: metadata?.title || title || collectionName,
          description: metadata?.description || description,
          canonical: metadata?.canonical || `${webUrl}/collections/${slug}`,
          image: getPublicImageURL(metadata?.image || imageUrl),
          noIndex: metadata?.noIndex || false,
        },
      },
      revalidate: 1800,
    };
  }

  if (!collection) {
    console.warn(`Collection not found for slug: ${slug}`);
    return { notFound: true };
  }
  return await handleRedirect(`/collections/${slug}`);
};

function mapStateToProps(state) {
  return {
    store: state.system.store,
  };
}

const Component = connect(mapStateToProps, {
  categoryViewed: eventActions.categoryViewed,
  collectionViewed: eventActions.collectionViewed,
})(CollectionPage);
Component.showStickyCheckout = true;
Component.showTopRunner = true;
Component.showTimer = true;

export default Component;
