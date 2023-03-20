import React, { useEffect, useState } from "react";
import SidebarFilterOne from "../shop/sidebar/sidebar-filter-one";
import ProductListOne from "../shop/product-list/product-list-one";
import ShopBanner from "../shop/shop-banner";
import { API, graphqlOperation } from "aws-amplify";
import { getBasicCategory, getBasicSubCategory } from "~/graphql/api";
import { STORE_ID } from "~/config";
import { useRouter } from "next/router";

function Category() {
  const [category, setCategory] = useState(null);
  const router = useRouter();

  const { category: categorySlug, subcategory: subCategorySlug } = router.query;

  useEffect(() => {
    if (categorySlug !== "all") {
      const api = subCategorySlug ? getBasicSubCategory : getBasicCategory;
      const apiSearch = subCategorySlug
        ? "byslugProductSubCategory"
        : "byslugProductCategory";
      API.graphql(
        graphqlOperation(api, {
          slug: subCategorySlug || categorySlug,
          filter: { storeId: { eq: STORE_ID } },
        })
      )
        .then(
          ({
            data: {
              [apiSearch]: {
                items: [response],
              },
            },
          }) => {
            setCategory(response);
          }
        )
        .catch((err) => {
          console.log("err", err);
        });
    }
  }, [categorySlug, subCategorySlug]);

  return (
    <>
      <ShopBanner bannerUrl={category?.bannerUrl} />

      <div className="page-content mb-10 pb-3">
        <div className="container">
          <div className="row main-content-wrap gutter-lg">
            <SidebarFilterOne />

            <div className="col-lg-9 main-content">
              <ProductListOne category={category} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default React.memo(Category);
