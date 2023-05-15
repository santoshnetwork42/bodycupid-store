import React, { useCallback, useEffect, useMemo, useState } from "react";
import { API } from "aws-amplify";
import { useRouter } from "next/router";
import { connect } from "react-redux";

import { getLinkedProducts } from "~/graphql/api";
import { cartActions } from "~/store/cart";
import { toDecimal } from "~/utils";
import { getPublicImageURL } from "~/utils/getPublicImageUrl";
import { getTotalPriceByField } from "~/utils/helper";
import RatingStar from "./rating-star";
import ALink from "~/components/features/custom-link";
import { modalActions } from "~/store/modal";
import { getProductMeta } from "~/utils/products";
import { errorHandler } from "~/utils/errorHandler";

function LinkedProducts({ product, addToCart, cartList, openQuickview }) {
  const [linkedProduct, setLinkedProduct] = useState([]);
  const router = useRouter();

  const getLinkedProduct = useCallback(async () => {
    try {
      const {
        data: {
          byProductIdLinkedProduct: { items: response },
        },
      } = await API.graphql({
        query: getLinkedProducts,
        variables: { productId: product.id },
      });
      if (response.length) {
        const data = response.map((lp) => lp.linkedProduct);

        const productData = [product, ...data].map((d) => ({
          ...d,
          thumbImage: getProductMeta(d).thumbImage,
          checked: true,
        }));

        setLinkedProduct(productData);
      }
    } catch (error) {
      errorHandler(error);
    }
  });

  useEffect(() => {
    if (product) {
      getLinkedProduct();
    }
  }, [product]);

  const selected = useMemo(
    () => linkedProduct.filter((lp) => lp.checked),
    [linkedProduct]
  );

  const allExist = useMemo(
    () => selected.every((el) => cartList.some((c) => c.id === el.id)),
    [selected, cartList]
  );

  const addToCartHandler = () => {
    selected.map((product) => {
      addToCart({ ...product, qty: 1, price: product.price });
    });
  };

  const onProductSelect = (p) => {
    setLinkedProduct(
      linkedProduct.map((lp) => {
        if (lp.id === p.id) return { ...lp, checked: !p?.checked };
        return lp;
      })
    );
  };

  const showQuickviewHandler = (slug) => {
    openQuickview(slug);
  };

  const totalPrice = useMemo(() => {
    return getTotalPriceByField(selected, "price");
  }, [selected]);

  const listingPrice = useMemo(() => {
    return getTotalPriceByField(selected, "listingPrice");
  }, [selected]);

  if (!linkedProduct?.length) return <></>;
  return (
    <div className="mb-6">
      <h2 className="title product-form justify-content-center">
        Frequently bought together
      </h2>
      <div className="d-flex d-sm-column linked-product-wrapper align-items-center justify-content-center w-full">
        {selected.map((lp, i) => (
          <ALink
            key={lp.id}
            href="#"
            onClick={() =>
              lp.id !== product.id && showQuickviewHandler(lp.slug)
            }
          >
            <div className="d-flex d-sm-column mt-sm-2 product align-items-center ml-6 ">
              {i > 0 && <i className="fas fa-plus mr-6"></i>}
              <div className="image-wrapper">
                <img
                  src={getPublicImageURL(lp?.thumbImage?.imageKey)}
                  alt={lp?.thumbImage?.alt}
                  width="80"
                  height="88"
                />

                <div className="product-price">
                  <ins className="new-price">₹{toDecimal(lp.price || 0)}</ins>
                  {lp.listingPrice > lp.price && (
                    <del className="old-price ml-1">
                      ₹{toDecimal(lp.listingPrice || 0)}
                    </del>
                  )}
                </div>

                <RatingStar key={lp.id} value={lp.rating} />
              </div>
            </div>
          </ALink>
        ))}
        {selected.length ? (
          <div className="ml-8 total-wrapper product-detail">
            <div className="mb-3">
              Total price:
              <ins className="new-price ml-1 mr-1">
                ₹{toDecimal(totalPrice)}
              </ins>{" "}
              {listingPrice > totalPrice && (
                <del className="old-price">( ₹{toDecimal(listingPrice)})</del>
              )}
              <span className="new-price ml-2"></span>
            </div>
            {allExist && (
              <button
                className="btn btn-primary  btn-rounded mb-2 "
                onClick={() => {
                  router.push("/pages/cart");
                }}
              >
                View cart
              </button>
            )}
            {!allExist && (
              <button
                className="btn btn-primary  btn-rounded mb-2 "
                onClick={addToCartHandler}
              >
                Add all product to cart
              </button>
            )}
          </div>
        ) : (
          <>
            <i className="d-icon-info"></i>{" "}
            <div className="ml-2">Choose item to buy together</div>
          </>
        )}
      </div>
      <div className="mt-6">
        {linkedProduct.map((lp, i) => (
          <div
            key={i}
            onClick={() => onProductSelect(lp)}
            className="form-checkbox mb-4"
          >
            <input
              type="checkbox"
              className="custom-checkbox"
              id={lp.id}
              checked={lp.checked}
              name={lp.title}
            />
            <label className="form-control-label">
              <span className="font-weight-bold mr-1">
                {i === 0 && "This item :"}
              </span>
              {lp.title}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
function mapStateToProps(state) {
  return {
    cartList: state.cart.data || [],
  };
}

export default connect(mapStateToProps, {
  addToCart: cartActions.addToCart,
  openQuickview: modalActions.openQuickview,
})(LinkedProducts);
