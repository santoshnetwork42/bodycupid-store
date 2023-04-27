import { connect } from "react-redux";
import { Fragment, useCallback, useEffect, useMemo, useState } from "react";

import ALink from "~/components/features/custom-link";
import Quantity from "~/components/features/quantity";
import Coupons from "~/components/features/coupon";
import { cartActions } from "~/store/cart";
import { modalActions } from "~/store/modal";
import { toDecimal, getCartTotals } from "~/utils";
import { systemActions } from "~/store/system";
import { getPublicImageURL } from "~/utils/getPublicImageUrl";
import { getRecordKey, getUpdatedCart, scrollWithOffset } from "~/utils/helper";
import { Close, Cross, RightAngle } from "~/components/icons";
import { getFirstVariantId } from "~/utils/products";

function Cart(props) {
  const {
    cartList,
    removeFromCart,
    updateCart,
    appliedCoupon,
    user,
    openLogin,
    shippingTiers,
    getShippingTiers,
  } = props;

  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    setCartItems([...cartList]);
  }, [cartList]);

  useEffect(() => {
    getShippingTiers();
  }, []);

  const getCartDataWithCoupon = () => {
    const item = cartList.reduce((prev, curr) => {
      return prev.price < curr.price ? prev : curr;
    });
    if (item.price > appliedCoupon.minOrderValue) {
      return [...cartList].map((c) =>
        c.id === item.id
          ? {
              ...c,
              isBogo: true,
            }
          : {
              ...c,
              isBogo: false,
            }
      );
    }
  };

  const setCartData = () => {
    if (appliedCoupon?.code === "BOGO" && cartList.length) {
      const data = getCartDataWithCoupon(cartList);
      setCartItems(data);
    } else {
      setCartItems(cartList);
    }
  };

  useEffect(() => {
    setCartData();
  }, [appliedCoupon, cartList]);

  const {
    totalListingprice,
    totalPrice,
    shippingTotal,
    couponTotal,
    gradTotalWithoutPrepaidDiscount,
    amoutSavedWithoutPrepaidDiscout,
  } = useMemo(
    () => getCartTotals(cartItems, appliedCoupon, shippingTiers),
    [cartItems, appliedCoupon, shippingTiers]
  );

  const onChangeQty = (item, qty) => {
    if (qty) {
      const cartData = getUpdatedCart(cartList, item.recordKey, { qty });
      updateCart(cartData);
    } else {
      removeFromCart(item);
    }
  };

  const changeVariant = (e, item) => {
    const { id } = item;
    const variant = item.variants.items.find((c) => c.id === e.target.value);
    const recordKey = `${id}-${e.target.value}`;

    const cartItem = cartList.find((c) => c.recordKey === recordKey);
    if (cartItem) {
      const updatedCart = [...cartList]
        .filter((c) => c.recordKey !== item.recordKey)
        .map((c) => {
          if (c.recordKey === recordKey) return { ...c, qty: c.qty + item.qty };
          return c;
        });
      updateCart(updatedCart);
    } else {
      const updatedCart = getUpdatedCart(cartList, item.recordKey, {
        recordKey,
        price: variant.price,
        variantId: e.target.value,
      });
      updateCart(updatedCart);
    }
  };

  const checkAuth = useCallback(() => {
    if (user) return true;
    openLogin(true);
    return false;
  }, [user]);

  const productDiscountPercentage = ({ price, listingPrice }) => {
    return Math.round(((listingPrice - price) / listingPrice) * 100);
  };

  const getVariantSelect = (item) => {
    return (
      <select
        name={`${item.recordKey}`}
        className="form-control"
        value={item.variantId}
        onChange={(e) => {
          changeVariant(e, item);
        }}
      >
        {item?.variants?.items.map((v) => (
          <option key={v.id} value={v.id}>
            {v.title}
          </option>
        ))}
      </select>
    );
  };

  const getBogoTag = () => (
    <div className="summary-saving-lable-container mb-1  qty-label ">
      <p className="m-0 saving-lable">1 qty is Free</p>
    </div>
  );

  return (
    <main className="main cart bg-white">
      <div className="page-content pt-7 pb-5">
        <div className="step-by pr-4 pl-4 d-sm-none">
          <h3 className="title title-simple title-step active">
            <ALink href="#">1. Shopping Cart</ALink>
            <i>
              <RightAngle size={18} color="currentColor" />
            </i>
          </h3>
          <h3 className="title title-simple title-step">
            <ALink href={user ? "/pages/checkout" : "#"} onClick={checkAuth}>
              2. Checkout
            </ALink>
            <i>
              <RightAngle size={18} color="currentColor" />
            </i>
          </h3>
          <h3 className="title title-simple title-step">
            <ALink href="#">3. Order Complete</ALink>
          </h3>
        </div>

        <div className="container sm-container mt-7 mb-2 ">
          <div className="row">
            {cartItems.length > 0 ? (
              <>
                <div className="col-lg-8 col-md-12 pt-4 cart-table-wrapper pl-lg-4 pr-lg-4">
                  <table className="shop-table pt-3 cart-table ">
                    <thead>
                      <tr>
                        <th>
                          <span>Product</span>
                        </th>
                        <th></th>
                        <th>
                          <span>Price</span>
                        </th>
                        <th>
                          <span>quantity</span>
                        </th>
                        <th>Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((item) => (
                        <Fragment key={item.recordKey}>
                          <tr className="d-sm-none">
                            <td className="product-thumbnail">
                              <figure>
                                <ALink href={"/product/" + item.slug}>
                                  <img
                                    src={getPublicImageURL(
                                      item.images.items[0]?.imageKey
                                    )}
                                    width="100"
                                    height="100"
                                    alt={item.images.items[0]?.alt}
                                  />
                                </ALink>
                              </figure>
                            </td>
                            <td className="product-name">
                              <div className="product-name-section mobile-specific-cart-product-container">
                                <ALink href={"/product/" + item.slug}>
                                  {item.title}
                                </ALink>
                                {!!item?.variants?.items.length &&
                                  getVariantSelect(item)}
                              </div>
                            </td>
                            <td className="product-subtotal">
                              {!(item.isBogo && item.qty === 1) && (
                                <span className="amount">
                                  ₹{toDecimal(item.price)}
                                </span>
                              )}
                              <p className="m-0 product-discount-listing">
                                {item.price < item.listingPrice && (
                                  <del className="summary-subtotal-listingprice">
                                    ₹{toDecimal(item.listingPrice)}
                                  </del>
                                )}
                                 {item.isBogo && item.qty > 1 && getBogoTag()}
                                {item.isBogo && item.qty === 1 ? (
                                  <span className="text-success ml-1">
                                    Free
                                  </span>
                                ) : (
                                  <span className={`discount-percetage ml-2`}>
                                    {productDiscountPercentage(item) > 0 &&
                                      `${productDiscountPercentage(item)}% off`}
                                  </span>
                                )}
                                
                              </p>
                            </td>

                            <td className="product-quantity">
                              <Quantity
                                product={item}
                                qty={item.qty}
                                max={item.inventory}
                                onChangeQty={(qty) => onChangeQty(item, qty)}
                              />
                            </td>
                            <td className="product-price">
                              <span className="amount">
                                ₹{toDecimal(item.price * item.qty)}
                              </span>
                            </td>
                            <td className="product-close">
                              <ALink
                                href="#"
                                className="product-remove"
                                title="Remove this product"
                                onClick={() => removeFromCart(item)}
                              >
                                <i>
                                  <Cross size={12} color="currentColor" />
                                </i>
                              </ALink>
                            </td>
                          </tr>
                          <tr className="m-0 p-0 border-no d-sm-show">
                            <td className="m-0 p-0">
                              <div className="mobile-specific-cart-product-container border-regular bg-white mb-2 d-flex p-relative">
                                <figure>
                                  <ALink href={"/product/" + item.slug}>
                                    <img
                                      src={getPublicImageURL(
                                        item.images.items[0]?.imageKey
                                      )}
                                      width="100"
                                      height="100"
                                      alt={item.images.items[0]?.alt}
                                    />
                                  </ALink>
                                </figure>
                                <div className="text-left text-primary w-100  mr-1 ml-2">
                                  <div className="mr-5 ">
                                    <ALink href={"/product/" + item.slug}>
                                      {item.title}
                                    </ALink>
                                  </div>
                                  <div className="product-subtotal mt-1">
                                    {!(item.isBogo && item.qty === 1) && (
                                      <span className="sm-product-amount">
                                        ₹{toDecimal(item.price)}
                                      </span>
                                    )}

                                    <p className="m-0 product-discount-listing">
                                      {item.price < item.listingPrice && (
                                        <del className="summary-subtotal-listingprice">
                                          ₹{toDecimal(item.listingPrice)}
                                        </del>
                                      )}
                                      {item.isBogo && item.qty === 1 ? (
                                        <span className="text-success ml-1">
                                          Free
                                        </span>
                                      ) : (
                                        <span
                                          className={`discount-percetage ml-2`}
                                        >
                                          {productDiscountPercentage(item) >
                                            0 &&
                                            `${productDiscountPercentage(
                                              item
                                            )}% off`}
                                        </span>
                                      )}
                                    </p>
                                  </div>{" "}
                                  <div className="d-flex">
                                    <div className="product-quantity w-0">
                                      <Quantity
                                        product={item}
                                        qty={item.qty}
                                        max={item.inventory}
                                        onChangeQty={(qty) =>
                                          onChangeQty(item, qty)
                                        }
                                      />
                                    </div>

                                    {!!item?.variants?.items.length &&
                                      getVariantSelect(item)}
                                  </div>
                                  {item.isBogo && item.qty > 1 && getBogoTag()}
                                </div>
                                <div className="product-close">
                                  <ALink
                                    href="#"
                                    className="sm-product-remove"
                                    title="Remove this product"
                                    onClick={() => removeFromCart(item)}
                                  >
                                    <Close size={18} color="grey" />
                                  </ALink>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>

                <aside
                  id="cart-details "
                  className="col-lg-4 text-primary sticky-sidebar-wrapper"
                >
                  <div
                    className="sticky-sidebar"
                    data-sticky-options="{'bottom': 20}"
                  >
                    <Coupons />
                    <div className="summary bg-white">
                      <h3 className="summary-title text-left d-sm-none">
                        Cart Totals
                      </h3>
                      <table className="shipping">
                        <tbody>
                          <tr className="summary-subtotal">
                            <td>
                              <h4 className="summary-subtitle lh-1">
                                Subtotal
                              </h4>
                            </td>
                            <td>
                              <p className="summary-subtotal-price">
                                {totalPrice < totalListingprice && (
                                  <del className="summary-subtotal-listingprice mr-2">
                                    ₹{toDecimal(totalListingprice)}
                                  </del>
                                )}
                                ₹{toDecimal(totalPrice)}
                              </p>
                            </td>
                          </tr>

                          {!!appliedCoupon && (
                            <>
                              <tr className="summary-subtotal">
                                <td className="d-flex align-items-center">
                                  <h4 className="summary-subtitle lh-1">
                                    Discounts
                                  </h4>
                                  &nbsp; ( {appliedCoupon.code})
                                </td>
                                <td>
                                  <p className="summary-subtotal-price discount-price-color">
                                    -{`₹${toDecimal(couponTotal)}`}
                                  </p>
                                </td>
                              </tr>
                            </>
                          )}

                          <tr className="summary-subtotal">
                            <td>
                              <h4 className="summary-subtitle lh-1">
                                Shipping
                              </h4>
                            </td>
                            <td>
                              <p
                                className={`summary-subtotal-price ${
                                  !shippingTotal && "discount-price-color"
                                }`}
                              >
                                {!!shippingTotal
                                  ? `₹${toDecimal(shippingTotal)}`
                                  : "FREE"}
                              </p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table className="total">
                        <tbody>
                          <tr className="summary-subtotal">
                            <td>
                              <h4 className="summary-subtitle lh-1">
                                Total{" "}
                                <p className="m-0">Inclusive of all taxes</p>
                              </h4>
                            </td>
                            <td>
                              <p className="summary-total-price ls-s">
                                ₹{toDecimal(gradTotalWithoutPrepaidDiscount)}
                              </p>
                            </td>
                          </tr>
                          <tr>
                            <td colSpan={2}>
                              <div
                                className={
                                  "avg-delivery-lable-container mt-3 mb-2"
                                }
                              >
                                <p className="m-0">
                                  Average delivery time: <span>3-5 days</span>
                                </p>
                              </div>
                              {!!amoutSavedWithoutPrepaidDiscout && (
                                <div className="summary-saving-lable-container mb-4">
                                  <p className="saving-lable">
                                    <span>{`₹${toDecimal(
                                      amoutSavedWithoutPrepaidDiscout
                                    )} `}</span>
                                    saved so far on this order
                                  </p>
                                </div>
                              )}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <ALink
                        onClick={checkAuth}
                        href={user ? "/pages/checkout" : "#"}
                        className="btn btn-dark d-sm-none btn-rounded btn-checkout"
                      >
                        Proceed to checkout
                      </ALink>
                      <div className="d-none stick-bottom-button d-sm-show">
                        <div className="lh-2">
                          <p className="summary-total-price text-left ls-s">
                            ₹{toDecimal(gradTotalWithoutPrepaidDiscount)}
                          </p>
                          <ALink
                            onClick={() => {
                              scrollWithOffset("cart-details", 130);
                            }}
                            className="text-underline"
                            href="#"
                          >
                            View details
                          </ALink>
                        </div>

                        <ALink
                          onClick={checkAuth}
                          href={user ? "/pages/checkout" : "#"}
                          className="btn btn-dark btn-rounded  btn-checkout"
                        >
                          Proceed to checkout
                        </ALink>
                      </div>
                    </div>
                  </div>
                </aside>
              </>
            ) : (
              <div className="empty-cart text-center">
                <p>Your cart is currently empty.</p>
                <i className="cart-empty d-icon-bag"></i>
                <p className="return-to-shop mb-0">
                  <ALink
                    className="button wc-backward btn btn-dark btn-md"
                    href="/collections/all"
                  >
                    Return to shop
                  </ALink>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

function mapStateToProps(state) {
  return {
    cartList: state.cart.data ? state.cart.data : [],
    user: state.user.data,
    appliedCoupon: state.cart.coupon,
    shippingTiers: state.system.shippingTiers,
  };
}
export default connect(mapStateToProps, {
  removeCoupon: cartActions.removeCoupon,
  removeFromCart: cartActions.removeFromCart,
  updateCart: cartActions.updateCart,
  openLogin: modalActions.openPasswordlessModal,
  getShippingTiers: systemActions.getShippingTiers,
})(Cart);
