import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { API, graphqlOperation } from "aws-amplify";
// import { useLazyQuery } from '@apollo/react-hooks';

import ToolBox from "~/components/partials/shop/toolbox";
import ProductTwo from "~/components/features/product/product-two";
import ProductEight from "~/components/features/product/product-eight";
import Pagination from "~/components/features/pagination";

// import withApollo from '~/server/apollo';
// import { GET_PRODUCTS } from '~/server/queries';

// import Api, { baseUrl } from '~/api';

import { byslugProductSubCategory, listProducts } from "~/graphql/queries";

function ProductListOne(props) {
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalPage, setTotalPage] = useState(1);
  const { itemsPerRow = 3, type = "left", isToolbox = true } = props;
  const router = useRouter();
  const query = router.query;
  // const [ getProducts, { data, loading, error } ] = useLazyQuery( GET_PRODUCTS );
  const gridClasses = {
    3: "cols-2 cols-sm-3",
    4: "cols-2 cols-sm-3 cols-md-4",
    5: "cols-2 cols-sm-3 cols-md-4 cols-xl-5",
    6: "cols-2 cols-sm-3 cols-md-4 cols-xl-6",
    7: "cols-2 cols-sm-3 cols-md-4 cols-lg-5 cols-xl-7",
    8: "cols-2 cols-sm-3 cols-md-4 cols-lg-5 cols-xl-8",
  };
  const perPage = query.per_page ? parseInt(query.per_page) : 12;
  // const totalPage = data ? parseInt(data.products.total / perPage) + (data.products.total % perPage ? 1 : 0) : 1;
  const page = query.page ? query.page : 1;
  const gridType = query.type ? query.type : "grid";

  useEffect(() => {
    API.graphql(
      graphqlOperation(byslugProductSubCategory, { slug: query.category })
    )
      .then(
        ({
          data: {
            byslugProductSubCategory: {
              items: [category],
            },
          },
        }) => {
          setCategory(category);
          setProducts(category.products.items);
          setLoading(false);
        }
      )
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (category) {
      API.graphql(
        graphqlOperation(listProducts, { subCategoryId: category.id })
      )
        .then(
          ({
            data: {
              listProducts: { items: response },
            },
          }) => {
            setProducts(response);
          }
        )
        .catch((err) => {
          console.log(err);
        });
    }
  }, [query]);

  return (
    <>
      {isToolbox ? <ToolBox type={type} /> : ""}
      {loading &&
        (gridType === "grid" ? (
          <div className={`row product-wrapper ${gridClasses[itemsPerRow]}`}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
              <div
                className="product-loading-overlay"
                key={"popup-skel-" + item}
              ></div>
            ))}
          </div>
        ) : (
          <div className="row product-wrapper skeleton-body cols-1">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
              <div
                className="skel-pro skel-pro-list mb-4"
                key={"list-skel-" + item}
              ></div>
            ))}
          </div>
        ))}

      {gridType === "grid" ? (
        <div className={`row product-wrapper ${gridClasses[itemsPerRow]}`}>
          {products &&
            products.map((item) => (
              <div className="product-wrap" key={"shop-" + item.id}>
                <ProductTwo product={item} adClass="" />
              </div>
            ))}
        </div>
      ) : (
        <div className="product-lists product-wrapper">
          {products &&
            products.map((item) => (
              <ProductEight product={item} key={"shop-list-" + item.id} />
            ))}
        </div>
      )}

      {products && products.length === 0 ? (
        <p className="ml-1">No products were found matching your selection.</p>
      ) : (
        ""
      )}

      {/* {
                products ?
                    <div className="toolbox toolbox-pagination">
                        {
                            products && <p className="show-info">Showing <span>{perPage * (page - 1) + 1} - {Math.min(perPage * page, data.products.total)} of {data.products.total}</span>Products</p>
                        }

                        <Pagination totalPage={totalPage} />
                    </div> : ''
            } */}
    </>
  );
}

export default ProductListOne;
