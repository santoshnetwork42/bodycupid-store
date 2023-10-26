import React, { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import Collapse from "react-bootstrap/Collapse";

import ALink from "~/components/features/custom-link";
import { Star, Bag, BigDot, Clock } from "~/components/icons";
import Quantity from "~/components/features/quantity";
import { wishlistActions } from "~/store/wishlist";
import { cartActions } from "~/store/cart";
import { toDecimal } from "~/utils";
import { getPublicImageURL } from "~/utils/getPublicImageUrl";
import ProductVariant from "../product-variant";
import {
  deliveryRemainingTime,
  getRecordKey,
  getUpdatedCart,
  scrollWithOffset,
} from "~/utils/helper";
import ProductNotify from "~/components/features/product-notify";
import { getProductInventory } from "~/utils/products";
import ProductBestPrice from "~/components/partials/product/product-best-price";
import { systemActions } from "~/store/system";
import ProductBreadcrumbs from "~/components/common/partials/product-breadcrumbs";
import { useProductCoupons } from "~/utils/hooks/useCoupon";
import { modalActions } from "~/store/modal";
import useWindowDimensions from "~/utils/getWindowDimension";

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
    defaultVariant,
    variantId: selectedVariant = defaultVariant,
    setVariant = () => {},
    addToCart,
    removeFromCart,
    closeQuickview,
    isQuickView,
  } = props;

  const [curIndex, setCurIndex] = useState(-1);
  const [cartActive, setCartActive] = useState(false);
  const [isSticky, setIsSticky] = useState(isStickyCart);

  const cartItem = useMemo(() => {
    if (cartList.length) {
      const recordKey = getRecordKey(product, selectedVariant);
      const cartItem = cartList.find((cl) => cl.recordKey === recordKey);
      return cartItem;
    }
    return null;
  }, [cartList, selectedVariant]);

  const bestCoupon = useProductCoupons(product, selectedVariant);
  const { isSmallSize: isMobile } = useWindowDimensions();

  const today = new Date();

  const sizes = useMemo(
    () =>
      (product?.variants?.items || [])
        .sort((a, b) => a.position - b.position)
        .map((item) => ({ ...item })),
    [product?.variants?.items]
  );

  const { hasInventory, currentInventory } = useMemo(
    () => getProductInventory(product, selectedVariant),
    [selectedVariant, sizes, product?.slug]
  );

  // decide if the product is wishlisted
  // const isWishlisted = useMemo(
  //   () => wishlist.some((i) => i.id === product?.id),
  //   [wishlist, product?.id]
  // );

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
    return () => {
      resetValueHandler();
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
      if (selectedVariant) {
        setCartActive(true);
        setCurIndex(
          product.variants.items.findIndex(
            (item) => item.id === selectedVariant
          )
        );
      } else {
        setCartActive(false);
      }
    } else {
      setCartActive(true);
    }
  }, [selectedVariant, product]);

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

  const setVariantHandler = (variant) => {
    if (setVariant) {
      if (variant === "null") {
        setVariant(null);
      } else {
        setVariant(variant);
      }
    }
  };

  const addToCartHandler = () => {
    setCartVisibility(true);
    closeQuickview();
    if (hasInventory) {
      if (product.variants.items.length > 0) {
        let tmpName = product.title,
          tmpPrice;

        if (selectedVariant) {
          const variant = product.variants.items.find(
            (i) => i.id === selectedVariant
          );
          if (variant) {
            tmpName = `${tmpName} - ${variant.title}`;
            tmpPrice = variant.price;
          }
        }

        addToCart({
          ...product,
          name: tmpName,
          qty: 1,
          price: tmpPrice,
          variantId: selectedVariant,
        });
      } else {
        addToCart({
          ...product,
          qty: 1,
          price: product.price,
        });
      }
    }
  };

  useEffect(() => {
    if (review) {
      onReviewClick();
    }
  }, []);

  const resetValueHandler = () => {
    setVariant(null);
  };

  const onReviewClick = () => {
    scrollWithOffset("product-review", 120, (ele) => {
      ele.click();
    });
  };

  function changeQty(qty) {
    if (cartItem) {
      if (qty) {
        const recordKey = getRecordKey(product, selectedVariant);
        const cartData = getUpdatedCart(cartList, recordKey, { qty });
        updateCart(cartData);
      } else {
        removeFromCart({ ...cartItem });
      }
    }
  }
  const { price, listingPrice, save } = useMemo(() => {
    const {
      price,
      listingPrice,
      variants: { items },
    } = product;

    if (curIndex > -1 && Array.isArray(items)) {
      const { price: p, listingPrice: lp } = items[curIndex] || {};
      return {
        price: p,
        listingPrice: lp,
        save: Math.round(((lp - p) * 100) / lp),
      };
    }

    return {
      price,
      listingPrice,
      save: Math.round(((listingPrice - price) * 100) / listingPrice),
    };
  }, [product, curIndex]);

  const totalOrderCount = useMemo(() => {
    return Math.ceil(product.totalOrders / 1000) * 1000;
  });

  return (
    <div className={`product-details ${adClass}`}>
      {/* {isNav && (
        <div className="product-navigation">
          <ProductNav product={product} />
        </div>
      )} */}

      <div className="mb-3 mt-3 d-sm-none">
        <ProductBreadcrumbs {...product} />
      </div>

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

      <div className="ratings-container">
        <div className="ratings-full mt-0 lh-1" onClick={onReviewClick}>
          {Array.from({ length: 5 }).map((_, index) => {
            const isFilled = index + 1 <= product.rating;

            return (
              <Star
                key={`rs-${product.id}-${index}`}
                size={16}
                color={isFilled ? "#FAB73B" : "#D9D9D9"}
              />
            );
          })}
          <span className="tooltiptext tooltip-top">
            {toDecimal(product.rating)}
          </span>
        </div>

        {!!product.totalRatings && (
          <div
            onClick={onReviewClick}
            className="rating-reviews cursor-pointer"
          >
            ( {product.totalRatings} reviews )
          </div>
        )}
      </div>
      <div className="d-flex text-success align-items-center mb-3 lh-default">
        {!!product.totalOrders && (
          <p className="text-success font-weight-semi-bold mb-0 lh-1">
            {totalOrderCount}+ units sold
          </p>
        )}

        {hasInventory && currentInventory < 100 && (
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

          {sizes.length > 1 && (
            <>
              <div className="product-form product-variations product-size mb-1 mt-3">
                <div className="product-form-group overflow-auto">
                  <div className="d-flex">
                    {sizes.map((item) => (
                      <div key={item.id}>
                        <ProductVariant
                          onSelect={setVariantHandler}
                          selected={selectedVariant}
                          item={item}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
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
                      <img
                        src={getPublicImageURL(
                          product.images.items[0]?.imageKey
                        )}
                        width="90"
                        height="90"
                        alt={product.images.items[0]?.alt}
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
                        qty={cartItem?.qty}
                        product={product}
                        onChangeQty={changeQty}
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
                          cartActive ? "" : "disabled"
                        }`}
                        onClick={addToCartHandler}
                      >
                        <i>
                          <Bag color="currentColor" size={20} />
                        </i>
                        Add to cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <ProductNotify productId={product.id} variantId={selectedVariant} />
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
                            qty={cartItem?.qty}
                            max={currentInventory}
                            product={product}
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
                          cartActive ? "" : "disabled"
                        }`}
                        onClick={addToCartHandler}
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
                  productId={product.id}
                  variantId={selectedVariant}
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
