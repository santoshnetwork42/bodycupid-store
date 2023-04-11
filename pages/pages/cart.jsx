import { connect } from "react-redux";
import { Fragment, useCallback, useEffect, useMemo, useState } from "react";

import ALink from "~/components/features/custom-link";
import Quantity from "~/components/features/quantity";
import Coupons from "~/components/features/coupon";
import { cartActions } from "~/store/cart";
import { modalActions } from "~/store/modal";
import { toDecimal, getCartTotals } from "~/utils";
import { getPublicImageURL } from "~/utils/getPublicImageUrl";
import { scrollWithOffset } from "~/utils/helper";
import { Cross, RightAngle } from "~/components/icons";

function Cart(props) {
  const {
    cartList,
    removeFromCart,
    updateCart,
    appliedCoupon,
    removeCoupon,
    user,
    openLogin,
  } = props;
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    setCartItems([...cartList]);
  }, [cartList]);

  const {
    totalListingprice,
    totalPrice,
    shippingTotal,
    amoutSaved,
    couponTotal,
    grandTotal,
  } = useMemo(
    () => getCartTotals(cartItems, appliedCoupon),
    [cartItems, appliedCoupon]
  );

  const onChangeQty = (item, qty) => {
    if (qty) {
      const { id, variantId } = item;
      const cart = cartItems.map((item) => {
        return item.id === id && (!variantId || variantId === item.variantId)
          ? { ...item, qty: qty }
          : item;
      });
      updateCart(cart);
    } else {
      removeFromCart(item);
    }
  };

  // const compareItems = () => {
  //   if (cartItems.length !== cartList.length) return false;

  //   for (let index = 0; index < cartItems.length; index++) {
  //     if (cartItems[index].qty !== cartList[index].qty) return false;
  //   }

  //   return true;
  // };

  // const update = () => {
  //   if (!compareItems()) {
  //     updateCart(cartItems);
  //   }
  //   return true;
  // };

  const checkAuth = useCallback(() => {
    if (user) return true;
    openLogin(true);
    return false;
  }, [user]);

  const productDiscountPercentage = ({ price, listingPrice }) => {
    return Math.round(((listingPrice - price) / listingPrice) * 100);
  };

  return (
    <main className="main cart">
      <div className="page-content pt-7 pb-10">
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

        <div className="container sm-container mt-7 mb-2">
          <div className="row">
            {cartItems.length > 0 ? (
              <>
                <div className="col-lg-8 col-md-12 pr-lg-4 mb-4">
                  <table className="shop-table cart-table">
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
                        <Fragment key={"cart" + item.title}>
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
                              <div className="product-name-section">
                                <ALink href={"/product/" + item.slug}>
                                  {item.title}
                                </ALink>
                              </div>
                            </td>
                            <td className="product-subtotal">
                              <span className="amount">
                                ₹{toDecimal(item.price)}
                              </span>
                              <p className="m-0 product-discount-listing">
                                {item.price < item.listingPrice && (
                                  <del className="summary-subtotal-listingprice">
                                    ₹{toDecimal(item.listingPrice)}
                                  </del>
                                )}
                                <span className={`discount-percetage ml-2`}>
                                  {productDiscountPercentage(item) > 0 &&
                                    `${productDiscountPercentage(item)}% off`}
                                </span>
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
                              <div className="mobile-specific-cart-product-container d-flex">
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
                                <div className="text-left mr-3 ml-2">
                                  <div className="">
                                    <ALink href={"/product/" + item.slug}>
                                      {item.title}
                                    </ALink>
                                  </div>
                                  <div className="product-subtotal mt-1">
                                    <span className="sm-product-amount">
                                      ₹{toDecimal(item.price)}
                                    </span>
                                    <p className="m-0 product-discount-listing">
                                      {item.price < item.listingPrice && (
                                        <del className="summary-subtotal-listingprice">
                                          ₹{toDecimal(item.listingPrice)}
                                        </del>
                                      )}
                                      <span
                                        className={`discount-percetage ml-2`}
                                      >
                                        {productDiscountPercentage(item) > 0 &&
                                          `${productDiscountPercentage(
                                            item
                                          )}% off`}
                                      </span>
                                    </p>
                                  </div>
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
                                </div>
                                <div className="product-close">
                                  <ALink
                                    href="#"
                                    className="sm-product-remove"
                                    title="Remove this product"
                                    onClick={() => removeFromCart(item)}
                                  >
                                    <i className="fas fa-times"></i>
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
                  id="cart-details"
                  className="col-lg-4 sticky-sidebar-wrapper"
                >
                  <div
                    className="sticky-sidebar"
                    data-sticky-options="{'bottom': 20}"
                  >
                    <Coupons />
                    <div className="summary mb-4">
                      <h3 className="summary-title text-left">Cart Totals</h3>
                      <table className="shipping">
                        <tbody>
                          <tr className="summary-subtotal">
                            <td>
                              <h4 className="summary-subtitle">Subtotal</h4>
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
                                <td>
                                  <h4 className="summary-subtitle">Coupons</h4>
                                  <p>
                                    <div className="d-flex">
                                      <span className="mr-1">
                                        {appliedCoupon.code}
                                      </span>
                                      <ALink
                                        key={appliedCoupon.id}
                                        href="#"
                                        className="product-remove"
                                        title="Remove coupon"
                                        onClick={() => removeCoupon()}
                                      >
                                        <i className="fas fa-times"></i>
                                      </ALink>
                                    </div>
                                  </p>
                                </td>
                                <td>
                                  <p className="summary-subtotal-price discount-price-color">
                                    {`₹${toDecimal(couponTotal)}`}
                                  </p>
                                </td>
                              </tr>
                            </>
                          )}

                          <tr className="summary-subtotal">
                            <td>
                              <h4 className="summary-subtitle">Shipping</h4>
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
                              <h4 className="summary-subtitle">
                                Total{" "}
                                <p className="m-0">Inclusive of all taxes</p>
                              </h4>
                            </td>
                            <td>
                              <p className="summary-total-price ls-s">
                                ₹{toDecimal(grandTotal)}
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
                              {!!amoutSaved && (
                                <div className="summary-saving-lable-container mb-4">
                                  <p className="saving-lable">
                                    <span>{`₹${toDecimal(amoutSaved)} `}</span>
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
                            ₹{toDecimal(grandTotal)}
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
  };
}

export default connect(mapStateToProps, {
  removeCoupon: cartActions.removeCoupon,
  removeFromCart: cartActions.removeFromCart,
  updateCart: cartActions.updateCart,
  openLogin: modalActions.openPasswordlessModal,
})(Cart);
