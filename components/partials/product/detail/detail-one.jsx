import { useCartItems, useProductCoupons } from "@wow-star/utils";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import Collapse from "react-bootstrap/Collapse";
import { connect } from "react-redux";

import ProductBreadcrumbs from "~/components/common/partials/product-breadcrumbs";
import ALink from "~/components/features/custom-link";
import ProductNotify from "~/components/features/product-notify";
import Quantity from "~/components/features/quantity";
import { Bag, BigDot, Clock, Star } from "~/components/icons";
import NextImage from "~/components/image";
import ProductBestPrice from "~/components/partials/product/product-best-price";
import VariantCard from "~/components/partials/product/variant-card";
import { cartActions } from "~/store/cart";
import { modalActions } from "~/store/modal";
import { systemActions } from "~/store/system";
import { wishlistActions } from "~/store/wishlist";
import { toDecimal } from "~/utils";
import useWindowDimensions from "~/utils/getWindowDimension";
import {
  deliveryRemainingTime,
  getRecordKey,
  getUpdatedCart,
  scrollWithOffset,
} from "~/utils/helper";

function DetailOne(props) {
  const router = useRouter();
  const {
    query: { review },
  } = router;

  const {
    cartList,
    updateCart,
    setCartVisibility,
    data: product,
    isStickyCart = false,
    adClass = "",
    variantId: variant,
    selectedVariant,
    addToCart,
    removeFromCart,
    closeQuickview,
    onVariantChange,
    variantGroup,
  } = props;

  const [curIndex, setCurIndex] = useState(-1);
  const [cartActive, setCartActive] = useState(false);
  const [isSticky, setIsSticky] = useState(isStickyCart);

  const {
    id,
    title,
    price,
    listingPrice,
    rating = 0,
    totalOrders,
    additionalInfo,
    longDescription,
    totalRatings,
    variants,
    hasInventory,
    currentInventory = 0,
    discount,
    isAtcEnabled,
  } = product || {};

  const cartItems = useCartItems({
    showLTOProducts: false,
    showNonApplicableFreeProducts: true,
  });

  const totalOrderCount = useMemo(() => {
    return Math.ceil((totalOrders || 0) / 1000) * 1000;
  }, [product, totalOrders]);

  const cartItem = useMemo(() => {
    if (cartList.length && product) {
      const recordKey = getRecordKey(product, selectedVariant?.id);
      const cartItem = cartList.find((cl) => cl.recordKey === recordKey);
      return cartItem;
    }
    return null;
  }, [cartList, product, selectedVariant]);

  const cartLocalState = useMemo(() => {
    if (cartList.length && product) {
      const recordKey = getRecordKey(product, selectedVariant?.id);
      const cartItem = cartList.find((cl) => cl.recordKey === recordKey);
      return cartItem;
    }
    return null;
  }, [cartList, product, selectedVariant]);

  const bestCoupon = useProductCoupons(product, variant);
  const { isSmallSize: isMobile } = useWindowDimensions();

  const today = new Date();

  const sizes = useMemo(
    () =>
      (product?.variants?.items || [])
        .sort((a, b) => a.position - b.position)
        .map((item) => ({ ...item })),
    [product?.variants?.items]
  );

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const threshold = 900;
      if (scrollY < threshold) setIsSticky(false);
      else setIsSticky(true);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setCurIndex(-1);
    return () => {
      setCurIndex(-1);
    };
  }, [product?.slug]);

  useEffect(() => {
    if (product.variants.items.length > 0) {
      if (variant) {
        setCartActive(true);
        setCurIndex(
          product.variants.items.findIndex((item) => item.id === variant)
        );
      } else {
        setCartActive(false);
      }
    } else {
      setCartActive(true);
    }
  }, [variant, product]);

  // const wishlistHandler = (e) => {
  //   e.preventDefault();

  //   if (toggleWishlist && !isWishlisted) {
  //     let currentTarget = e.currentTarget;
  //     currentTarget.classList.add("load-more-overlay", "loading");
  //     toggleWishlist(product);

  //     setTimeout(() => {
  //       currentTarget.classList.remove("load-more-overlay", "loading");
  //     }, 1000);
  //   } else {
  //     router.push("/pages/wishlist");
  //   }
  // };

  const addToCartHandler = () => {
    setCartVisibility(true);
    closeQuickview();

    addToCart({
      ...product,
      qty: product?.minimumOrderQuantity || 1,
      variantId: selectedVariant?.id,
    });
  };

  useEffect(() => {
    if (review) {
      onReviewClick();
    }
  }, []);

  const onReviewClick = () => {
    scrollWithOffset("product-review", 120, (ele) => {
      ele.click();
    });
  };

  function changeQty(qty) {
    if (cartItem) {
      if (qty) {
        const recordKey = getRecordKey(product, selectedVariant?.id);
        const cartData = getUpdatedCart(cartList, recordKey, { qty });
        updateCart(cartData);
      } else {
        removeFromCart({ ...cartItem });
      }
    }
  }

  const save = Math.round(((listingPrice - price) * 100) / listingPrice);

  return (
    <div className={`product-details ${adClass}`}>
      <div className="mb-3 mt-3 d-sm-none">
        <ProductBreadcrumbs {...product} />
      </div>

      {/* {product?.collections?.includes("bundle-offer") && (
        <div className="product-label label-pdp">BUY 5 @ 999</div>
      )} */}

      <h2 className="detail-product-name text-uppercase">{product.title}</h2>

      {/* {!!product?.tags && (
        <div className="mb-1">
          <label className="product-tag">
            {product?.tags.split(",").join(" | ")}
          </label>
        </div>
      )} */}

      {!!product?.benefits && (
        <div className="product-benefits mb-2">
          {product?.benefits.map((benefit) => (
            <label key={benefit}>{benefit}</label>
          ))}
        </div>
      )}

      <div className="product-variation-price">
        {curIndex < 0 && (
          <div className="product-price mb-0 d-flex">
            <ins className="new-price mr-2">
              {`${price >= listingPrice ? "MRP: " : ""}  ₹${toDecimal(price)}`}
            </ins>
            {listingPrice > price && (
              <>
                <del className="old-price mr-2">MRP: ₹{listingPrice}</del>{" "}
              </>
            )}
            {!!save && <ins className="product-save">({save}% OFF)</ins>}
          </div>
        )}

        <Collapse in={cartActive && curIndex > -1}>
          <div className="card-wrapper">
            {curIndex > -1 && (
              <div className="single-product-price">
                <div className="product-price mb-0 d-flex">
                  <ins className="new-price mr-2">{`${
                    price >= listingPrice ? "MRP: " : ""
                  }  ₹${toDecimal(price)}`}</ins>
                  {listingPrice > price && (
                    <>
                      <del className="old-price mr-2">
                        MRP: ₹{toDecimal(listingPrice)}
                      </del>{" "}
                    </>
                  )}
                  {!!save && <ins className="product-save">({save}% OFF)</ins>}
                </div>
              </div>
            )}
          </div>
        </Collapse>
      </div>

      <p className="mb-2 lh-default text-dark">Inclusive of all taxes</p>

      <div className="ratings-container mb-3 gap-4">
        <div
          className="ratings-full d-flex rating-product-list"
          onClick={onReviewClick}
        >
          <Star size={14} color={"#FAB73B"} />
        </div>
        <div
          className="d-flex gap-5 align-items-center cursor-pointer"
          onClick={onReviewClick}
        >
          <span className="rating text-black font-size-18 font-weight-semi-bold plp-rating-font-size">
            {rating}
          </span>
          <span className="rating text-black ">|</span>
          <span className="rating text-black font-size-18 font-weight-semi-bold plp-rating-font-size">
            {totalRatings || 0} reviews
          </span>
        </div>
      </div>

      <div className="d-flex text-success align-items-center mb-3 lh-default">
        {!!product.totalOrders && (
          <p className="text-success font-weight-semi-bold mb-0 lh-1">
            {totalOrderCount}+ units sold
          </p>
        )}

        {hasInventory && currentInventory < 99 && (
          <>
            <BigDot color="red" size={20} />
            <span className="text-secondary font-weight-semi-bold">
              Last {currentInventory} units left
            </span>
          </>
        )}
      </div>

      {price > 0 && (
        <>
          {!!hasInventory && !!bestCoupon && (
            <ProductBestPrice {...bestCoupon} price={price} />
          )}

          {!!variantGroup && product?.variants?.items?.length > 0 && (
            <div className="product-form product-variations product-size mb-1 mt-3">
              <div className="product-form-group">
                {variantGroup?.map((v1, index) => {
                  return (
                    <div className="d-flex flex-wrap gap-y-10" key={v1.id}>
                      {v1.variantOptions
                        ?.sort((a, b) => (a?.position > b?.position ? 1 : -1))
                        ?.map((v2) => {
                          return (
                            <>
                              <VariantCard
                                key={v2.id}
                                variant={v2}
                                onChange={() => {
                                  onVariantChange(v1.id, v2.id);
                                }}
                              />
                            </>
                          );
                        })}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {today.getHours() > 8 && today.getHours() < 15 && (
            <div className="d-flex mb-3">
              <Clock size={16} />
              <p className="text-primary ml-2 mb-0 lh-1">
                For Fastest delivery, order within {deliveryRemainingTime()}
              </p>
            </div>
          )}

          {!!hasInventory ? (
            <div className="sticky-content fix-top product-sticky-content">
              <div className="container">
                <div className="sticky-product-details">
                  <figure className="product-image">
                    <ALink href={"/products/" + product.slug}>
                      <NextImage
                        src={product.images.items[0]?.imageKey}
                        width={90}
                        height={90}
                        alt={product.images.items[0]?.alt}
                        priority
                      />
                    </ALink>
                  </figure>
                  <div>
                    <h4 className="product-title">
                      <ALink href={"/products/" + product.slug}>
                        {product.title}
                      </ALink>
                    </h4>
                    <div className="product-info">
                      <div className="product-price mb-0">
                        <ins className="new-price">
                          ₹{toDecimal(product.price || 0)}
                        </ins>
                      </div>

                      <div className="ratings-container mb-0">
                        <div className="ratings-full">
                          <span
                            className="ratings"
                            style={{
                              width: Math.min(20 * product.rating, 100) + "%",
                            }}
                          ></span>
                          <span className="tooltiptext tooltip-top">
                            {toDecimal(product.ratings)}
                          </span>
                        </div>

                        <ALink href="#" className="rating-reviews">
                          ( {product?.reviews?.items.length} reviews )
                        </ALink>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="product-form product-qty pb-0">
                  <label className="d-none">QTY:</label>
                  <div className="product-form-group ">
                    {!!cartItem && (
                      <Quantity
                        max={currentInventory}
                        qty={cartLocalState?.qty}
                        product={product}
                        minimumOrderQuantity={
                          selectedVariant?.minimumOrderQuantity ||
                          product?.minimumOrderQuantity ||
                          1
                        }
                        maximumOrderQuantity={
                          selectedVariant?.maximumOrderQuantity ||
                          product?.maximumOrderQuantity ||
                          99
                        }
                        totalItemQty={
                          cartLocalState?.qty ||
                          selectedVariant?.minimumOrderQuantity ||
                          product?.minimumOrderQuantity ||
                          1
                        }
                        onChangeQty={changeQty}
                        extraClass="wrap"
                      />
                    )}

                    {cartItem && (
                      <button
                        className={`btn-product btn-cart dark text-normal ls-normal font-weight-semi-bold ${
                          cartActive ? "" : "disabled"
                        }`}
                        onClick={() => {
                          setCartVisibility(true);
                        }}
                      >
                        <i>
                          <Bag color="currentColor" size={20} />
                        </i>
                        Go To Cart
                      </button>
                    )}
                    {!cartItem && (
                      <button
                        className={`btn-product btn-cart text-normal ls-normal font-weight-semi-bold ${
                          cartActive && isAtcEnabled ? "" : "disabled"
                        }`}
                        onClick={addToCartHandler}
                        disabled={!isAtcEnabled}
                      >
                        <i>
                          <Bag color="currentColor" size={20} />
                        </i>
                        Add to cart
                      </button>
                    )}
                  </div>
                </div>
                {!!cartItem &&
                  product?.minimumOrderQuantity &&
                  product?.minimumOrderQuantity > 1 && (
                    <p className="text-primary lh-1">
                      Minimum Order Quantity: {product?.minimumOrderQuantity}
                    </p>
                  )}
              </div>
            </div>
          ) : (
            <ProductNotify
              productId={product?.id}
              variantId={selectedVariant?.id}
            />
          )}

          {isMobile && isSticky && (
            <>
              {!!hasInventory ? (
                <div className="product-form product-qty pb-0">
                  <label className="d-none">QTY:</label>

                  {!!cartItem && (
                    <div className="product-form-group cart-button-wrapper flex-column">
                      {/* <div className="d-flex product-saved-price-container align-items-center lh-1">
                        <Clock size={12} color={"green"} height={8} />
                        <div className="summary-saving-lable-container  mb-0 mt-0 p-0 no-margin ml-1">
                          <p className="saving-lable lh-1">
                            <span>{`₹${toDecimal(totalSaved)} `}</span>
                            saved so far on this order
                          </p>
                        </div>
                      </div> */}
                      <div className="d-flex m-0 w-100 sm-around w-full">
                        <div className="m-0">
                          <Quantity
                            qty={cartLocalState?.qty}
                            max={currentInventory}
                            product={product}
                            minimumOrderQuantity={
                              selectedVariant?.minimumOrderQuantity ||
                              product?.minimumOrderQuantity ||
                              1
                            }
                            maximumOrderQuantity={
                              selectedVariant?.maximumOrderQuantity ||
                              product?.maximumOrderQuantity ||
                              99
                            }
                            totalItemQty={
                              cartLocalState?.qty ||
                              selectedVariant?.minimumOrderQuantity ||
                              product?.minimumOrderQuantity ||
                              1
                            }
                            onChangeQty={changeQty}
                          />
                        </div>
                        <button
                          className={`btn-product btn-cart dark text-uppercase ls-normal font-weight-semi-bold m-0 ${
                            cartActive ? "" : "disabled"
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            setCartVisibility(true);
                          }}
                        >
                          <i>
                            <Bag color="currentColor" size={20} />
                          </i>
                          Go To Cart
                        </button>
                      </div>{" "}
                    </div>
                  )}

                  {!cartItem && (
                    <div className={`cart-button-wrapper ${adClass}`}>
                      <button
                        className={`btn-product btn-cart ls-normal font-weight-semi-bold btn-cart-width ${
                          cartActive && isAtcEnabled ? "" : "disabled"
                        }`}
                        onClick={addToCartHandler}
                        disabled={!isAtcEnabled}
                      >
                        <i>
                          <Bag color="currentColor" size={20} />
                        </i>
                        Add to cart
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <ProductNotify
                  productId={product?.id}
                  variantId={selectedVariant?.id}
                />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    wishlist: state.wishlist.data ? state.wishlist.data : [],
    cartList: state.cart.data || [],
    user: state.user.data,
    coupon: state.cart.coupon,
    featuredCoupons: state.system.featuredCoupon,
  };
}

export default connect(mapStateToProps, {
  toggleWishlist: wishlistActions.toggleWishlist,
  addToCart: cartActions.addToCart,
  updateCart: cartActions.updateCart,
  removeFromCart: cartActions.removeFromCart,
  getFeaturedCoupons: systemActions.getFeaturedCoupon,
  setCartVisibility: modalActions.setCartVisibility,
  closeQuickview: modalActions.closeQuickview,
})(DetailOne);
