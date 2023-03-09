import { API } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getLinkedProducts } from "~/graphql/api";
import { cartActions } from "~/store/cart";
import { getTotalPrice, toDecimal } from "~/utils";
import { getPublicImageURL } from "~/utils/getPublicImageUrl";
import { getThumbImage, getTotalPriceByField } from "~/utils/helper";
import RatingStar from "./rating-star";

function LinkedProducts({ product, addToCart }) {
  const [linkedProduct, setLinkedProduct] = useState([]);
  const [selected, setSelected] = useState([]);
  useEffect(() => {
    API.graphql({
      query: getLinkedProducts,
      variables: { productId: product.id },
    })
      .then(
        ({
          data: {
            byProductIdLinkedProduct: { items: response },
          },
        }) => {
          if (response.length) {
            const data = response.map((lp) => lp.linkedProduct);
            setLinkedProduct([product, ...data]);
            setSelected([product, ...data]);
          }
        }
      )
      .catch((err) => {
        console.log("err", err);
      });
  }, [product]);

  const addToCartHandler = () => {
    selected.map((product) => {
      addToCart({ ...product, qty: 1, price: product.price });
    });
  };
  const onProductSelect = (p) => {
    const isExist = selected.find((lp) => lp.id === p.id);
    console.log("isExist", isExist);
    if (isExist) {
      setSelected(selected.filter((s) => s.id !== p.id));
    } else {
      setSelected([...selected, p]);
    }
  };
  console.log("selected", selected);
  const getSrc = (product) => {
    const thumbImage = getThumbImage(product);
    return getPublicImageURL(thumbImage.imageKey);
  };
  if (!linkedProduct?.length) return <></>;
  return (
    <div className="mb-6">
      <h2 className="title product-form justify-content-center">
        Frequently bought together
      </h2>
      <div className="d-flex d-sm-column linked-product-wrapper align-items-center justify-content-center w-full">
        {selected.map((lp, i) => (
          <div
            key={i}
            className="d-flex d-sm-column mt-sm-2 product align-items-center ml-6 "
          >
            {i > 0 && <i className="fas fa-plus mr-6"></i>}
            <div className="image-wrapper">
              <img
                src={getSrc(lp)}
                alt={getThumbImage(lp).alt}
                width="80"
                height="88"
              />

              <div className="product-price">
                <ins className="new-price">₹{toDecimal(lp.price || 0)}</ins>
              </div>
              <RatingStar value={lp.rating} />
            </div>
          </div>
        ))}
        {selected.length ? (
          <div className="ml-8 total-wrapper product-detail">
            <div className="mb-3">
              Total price:
              <ins className="new-price mr-1">
                ₹{toDecimal(getTotalPrice(selected))}
              </ins>
              ({" "}
              <del className="old-price">
                ₹{toDecimal(getTotalPriceByField(selected, "listingPrice"))}
              </del>
              )<span className="new-price ml-2"></span>
            </div>
            <button
              className="btn   btn-rounded mb-2 "
              onClick={addToCartHandler}
            >
              Add all product to cart
            </button>
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
              checked={selected.find((s) => s.id === lp.id)}
              name={lp.title}
            />
            <label className="form-control-label" htmlFor="signin-remember">
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
})(LinkedProducts);
