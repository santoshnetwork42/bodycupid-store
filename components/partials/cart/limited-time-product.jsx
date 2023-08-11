import { React, useState, useMemo } from "react";
import { connect } from "react-redux";

import { cartActions } from "~/store/cart";

import ALink from "~/components/features/custom-link";
import { getPublicImageURL } from "~/utils/getPublicImageUrl";
import { getProductMeta } from "~/utils/products";
import { toDecimal } from "~/utils";
import { Check, Delete, LimitedTimeDiscount } from "~/components/icons";
import CircularTimer from "~/components/partials/cart/circular-timer";
import { LIMITED_TIME_DEAL_DURATION } from "~/constant";
import { getRecordKey } from "~/utils/helper";

const LimitedTimeProduct = ({
  product,
  addToCart,
  removeFromCart,
  cartList,
}) => {
  const { slug, images, title, listingPrice, recommendPrice } = product;
  const [showLTOProduct, setShowLTOProduct] = useState(true);
  const [ltoProductRemoved, setltoProductRemoved] = useState(false);

  const { thumbImage } = getProductMeta(product);

  const handleAddToCart = () => {
    addToCart({
      ...product,
      qty: 1,
      cartItemType: "Limited_Time_Offer",
      source: "LIMITED_TIME_DEAL",
    });
    setShowLTOProduct(false);
  };

  const cartItem = useMemo(() => {
    const recordKey = getRecordKey(product);
    return cartList.find((cl) => cl.recordKey === recordKey);
  }, [cartList]);

  const removeItemFromCart = () => {
    removeFromCart({ ...cartItem });
    setltoProductRemoved(true);
  };

  return (
    <>
      {showLTOProduct ? (
        <div className="limited-time-product-card">
          <div className="limited-time-deal-overlay d-flex justify-content-between">
            <div className="limited-time-text">
              Add to your cart now to avail this limited time deal!
            </div>
            <span className="limited-time-text font-weight-bolder">
              Limited Time Deal
            </span>
          </div>
          <div className="limited-time-product">
            <div className="mobile-specific-cart-product-container mobile-specific-card mb-2 d-flex p-relative pt-8 pr-1 pl-4 pb-2 limited-time-deal-card ">
              <div className="image-container">
                <div className="svg-overlay">
                  <LimitedTimeDiscount discountAmount={60} />
                </div>
                <figure>
                  <ALink href={"/products/" + slug} className="p-0 border-2">
                    <img
                      className="img2"
                      src={getPublicImageURL(thumbImage.imageKey)}
                      width="100"
                      height="100"
                      alt={images?.items[0]?.alt}
                    />
                  </ALink>
                </figure>
              </div>
              <div className="cart-item-container">
                <div className="text-left text-primary w-100 mr-1 ml-2">
                  <div
                    className="cart-product-title cart-product-size"
                    title={title}
                  >
                    <ALink
                      className="p-0 overflow-ellipsis font-weight-normal"
                      href={"/products/" + slug}
                    >
                      {title}
                    </ALink>
                  </div>
                  <div className="mt-1 d-flex mb-1 align-items-center">
                    <p className="m-0 product-discount-listing">
                      <del className="summary-subtotal-listingprice mr-1">
                        ₹{toDecimal(listingPrice)}
                      </del>
                    </p>
                    <span className="sm-product-amount mr-1 font-weight-semi-bold">
                      ₹{toDecimal(recommendPrice)}
                    </span>
                  </div>
                  <div className="product-savings">
                    You saved ₹{listingPrice - recommendPrice}
                  </div>
                </div>
                <div className="cart-item-quantity">
                  <div className="mb-1">
                    <div className="ml-8">
                      <CircularTimer
                        duration={LIMITED_TIME_DEAL_DURATION * 60}
                      />
                    </div>
                    <div className="ml-8">
                      <button
                        onClick={handleAddToCart}
                        className={`btn btn-product btn-primary btn-rounded btn-checkout w-100 font-weight-bold flex-60 button-padding`}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {!ltoProductRemoved && (
            <div className="limited-time-product-card">
              <div className="limited-time-deal-tag">Limited Time Deal</div>
              <div className="limited-time-added-product mb-2 pt-3">
                <div className="mobile-specific-cart-product-container d-flex p-relative pr-1 pl-4 mt-0">
                  <div className="image-container">
                    <figure>
                      <ALink
                        href={"/products/" + slug}
                        className="p-0 border-2"
                      >
                        <img
                          className="img2"
                          src={getPublicImageURL(thumbImage.imageKey)}
                          width="100"
                          height="100"
                          alt={images?.items[0]?.alt}
                        />
                      </ALink>
                    </figure>
                  </div>
                  <div className="cart-item-container">
                    <div className="text-left text-primary w-100 mr-1 ml-2">
                      <div
                        className="cart-product-title cart-product-size"
                        title={title}
                      >
                        <ALink
                          className="p-0 overflow-ellipsis font-weight-normal"
                          href={"/products/" + slug}
                        >
                          {title}
                        </ALink>
                      </div>
                      <div className="mt-1 d-flex mb-1 align-items-center">
                        <p className="m-0 product-discount-listing">
                          <del className="summary-subtotal-listingprice mr-1">
                            ₹{toDecimal(listingPrice)}
                          </del>
                        </p>
                        <span className="sm-product-amount mr-1 font-weight-semi-bold">
                          ₹{toDecimal(recommendPrice)}
                        </span>
                      </div>
                      <div className="product-savings">
                        You saved ₹{listingPrice - recommendPrice}
                      </div>
                    </div>
                    <div className="cart-added-item">
                      <div className="font-success">
                        {" "}
                        <Check />
                      </div>
                      <div className="font-success"> Added successfully</div>
                    </div>
                    <div className="product-close">
                      <ALink
                        href="#"
                        onClick={removeItemFromCart}
                        className="small-product-remove"
                        title="Remove this product"
                      >
                        <Delete />
                      </ALink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

function mapStateToProps(state) {
  return {
    cartList: state.cart.data || [],
  };
}

export default connect(mapStateToProps, {
  addToCart: cartActions.addToCart,
  removeFromCart: cartActions.removeFromCart,
})(LimitedTimeProduct);
