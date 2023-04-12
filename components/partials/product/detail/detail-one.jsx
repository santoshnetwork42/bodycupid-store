import React, { useCallback, useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import Collapse from "react-bootstrap/Collapse";

import ALink from "~/components/features/custom-link";
import { Star, Bag, Heart, HeartFilled } from "~/components/icons";
import Quantity from "~/components/features/quantity";

import ProductNav from "~/components/partials/product/product-nav";

import { wishlistActions } from "~/store/wishlist";
import { cartActions } from "~/store/cart";

import { toDecimal } from "~/utils";
import { getPublicImageURL } from "~/utils/getPublicImageUrl";
import ProductVariant from "../product-variant";
import { deliveryRemainingTime, scrollWithOffset } from "~/utils/helper";
import ProductNotify from "~/components/features/product-notify";
import { getProductInventory, getProductCouponTotal } from "~/utils/products";
import ProductBestPrice from "~/components/partials/product/product-best-price";
import { systemActions } from "~/store/system";
import ProductBreadcrumbs from "~/components/common/partials/product-breadcrumbs";

function DetailOne(props) {
  const router = useRouter();
  const {
    query: { review },
  } = router;
  const {
    cartList,
    updateCart,
    data: product,
    isStickyCart = false,
    adClass = "",
    isNav = true,
    defaultVariant,
    variantId: selectedVariant = defaultVariant,
    setVariant = () => {},
    user,
    applyCoupon,
    toggleWishlist,
    addToCart,
    wishlist,
    removeFromCart,
    coupon: appliedCoupon,
    featuredCoupons,
    getFeaturedCoupons,
  } = props;

  const [curIndex, setCurIndex] = useState(-1);
  const [cartActive, setCartActive] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const today = new Date();

  const sizes = useMemo(
    () =>
      (product?.variants?.items || [])
        .sort((a, b) => a.position - b.position)
        .map((item) => ({ ...item })),
    [product?.variants?.items]
  );

  useEffect(() => {
    getFeaturedCoupons();
  }, []);

  const { maxDiscountCoupon } = useMemo(() => {
    let selectedProduct = product;
    if (sizes.length) {
      selectedProduct = product?.variants?.items.find(
        (v) => v.id === selectedVariant
      );
    }
    if (!!featuredCoupons?.length && selectedProduct) {
      const discountCoupon = featuredCoupons.reduce((prev, current) => {
        const first = getProductCouponTotal(prev, selectedProduct);
        const second = getProductCouponTotal(current, selectedProduct);
        return first > second
          ? {
              ...prev,
              price: selectedProduct?.price,
              totalDiscount: getProductCouponTotal(prev, selectedProduct),
            }
          : {
              ...current,
              price: selectedProduct?.price,
              totalDiscount: getProductCouponTotal(current, selectedProduct),
            };
      }, {});
      return { maxDiscountCoupon: discountCoupon };
    }
    return {
      maxDiscountCoupon: null,
    };
  }, [product?.slug, featuredCoupons, selectedVariant]);

  const applyCouponCode = useCallback(async () => {
    try {
      if (!!maxDiscountCoupon && !appliedCoupon?.isFeatured) {
        applyCoupon(maxDiscountCoupon);
      }
    } catch (error) {
      console.log("error", error);
    }
  }, [maxDiscountCoupon, user, appliedCoupon]);

  const { hasInventory, currentInventory } = useMemo(
    () => getProductInventory(product, selectedVariant),
    [selectedVariant, sizes, product?.slug]
  );

  const cartItem = useMemo(() => {
    if (cartList.length) {
      const cartItem = cartList.find(
        (cl) =>
          cl.id === product.id &&
          (!cl.variantId || selectedVariant === cl.variantId)
      );

      if (cartItem && cartItem.qty) {
        setQuantity(cartItem.qty);
      } else {
        setQuantity(1);
      }
      return cartItem;
    }
    return;
  }, [cartList, selectedVariant]);

  // decide if the product is wishlisted
  const isWishlisted = useMemo(
    () => wishlist.some((i) => i.id === product?.id),
    [wishlist, product?.id]
  );

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

    if (product.isInventoryEnabled && !product.inventory) {
      setCartActive(false);
    }
  }, [selectedVariant, product]);

  const wishlistHandler = (e) => {
    e.preventDefault();

    if (toggleWishlist && !isWishlisted) {
      let currentTarget = e.currentTarget;
      currentTarget.classList.add("load-more-overlay", "loading");
      toggleWishlist(product);

      setTimeout(() => {
        currentTarget.classList.remove("load-more-overlay", "loading");
      }, 1000);
    } else {
      router.push("/pages/wishlist");
    }
  };

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
    if ((!product.isInventoryEnabled || product.inventory > 0) && cartActive) {
      if (product.variants.items.length > 0) {
        let tmpName = product.title,
          tmpPrice;
        if (curIndex > -1) {
          const variant = product.variants.items[curIndex];
          tmpName = `${tmpName} - ${variant.title}`;
          tmpPrice = variant.price;
        }

        addToCart({
          ...product,
          name: tmpName,
          qty: quantity,
          price: tmpPrice,
          variantId: selectedVariant,
        });
      } else {
        addToCart({
          ...product,
          qty: quantity,
          price: product.price,
        });
      }
      applyCouponCode();
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
    setQuantity(qty);
    if (cartItem) {
      if (qty) {
        updateCart(
          cartList.map((item) => {
            return item.id === product.id &&
              (!selectedVariant || selectedVariant === item.variantId)
              ? { ...item, qty: qty }
              : item;
          })
        );
        applyCouponCode();
      } else {
        removeFromCart({ ...product, variantId: selectedVariant });
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

  return (
    <div className={`product-details ${adClass}`}>
      {/* {isNav && (
        <div className="product-navigation">
          <ProductNav product={product} />
        </div>
      )} */}

      <div className="mb-3 mt-3">
        <ProductBreadcrumbs {...product} />
      </div>

      <h2 className="detail-product-name">{product.title}</h2>

      {/* {!!product?.tags && (
        <div className="mb-1">
          <label className="product-tag">
            {product?.tags.split(",").join(" | ")}
          </label>
        </div>
      )} */}

      {!!product?.benefits && (
        <div className="product-benefits mb-2">
          {product?.benefits.map((benefit) => {
            return <lable>{benefit}</lable>;
          })}
        </div>
      )}

      <div className="product-variation-price">
        {curIndex < 0 && (
          <div className="product-price mb-2 d-flex">
            {listingPrice > price && (
              <>
                <del className="old-price mr-2">₹{listingPrice}</del>{" "}
              </>
            )}
            <ins className="new-price mr-2">₹{toDecimal(price)}</ins>
            {!!save && (
              <ins className="product-save">(₹{listingPrice - price} OFF)</ins>
            )}
          </div>
        )}

        <Collapse in={cartActive && curIndex > -1}>
          <div className="card-wrapper">
            {curIndex > -1 && (
              <div className="single-product-price">
                <div className="product-price mb-0 d-flex">
                  {listingPrice > price && (
                    <>
                      <del className="old-price mr-2">
                        ₹{toDecimal(listingPrice)}
                      </del>{" "}
                    </>
                  )}
                  <ins className="new-price mr-2">₹{toDecimal(price)}</ins>
                  {!!save && (
                    <ins className="product-save">
                      (₹{listingPrice - price} OFF)
                    </ins>
                  )}
                </div>
              </div>
            )}
          </div>
        </Collapse>
      </div>

      <div className="ratings-container">
        <div className="ratings-full" onClick={onReviewClick}>
          {Array.from({ length: 5 }).map((_, index) => {
            const isFilled = index + 1 <= product.rating;

            return <Star size={16} color={isFilled ? "#d26e4b" : "#999"} />;
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

      {!!hasInventory && !!maxDiscountCoupon?.totalDiscount && (
        <ProductBestPrice {...maxDiscountCoupon} />
      )}

      <p className="product-short-desc">{product.productDescription}</p>

      {sizes.length > 1 && (
        <>
          <div className="product-form product-variations product-size mb-0 pb-2">
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
        <p className="remian-time-lable mb-4">
          For Fastest delivery, order within {deliveryRemainingTime()}
        </p>
      )}

      <hr className="product-divider"></hr>

      {isStickyCart ? (
        <>
          {!!hasInventory ? (
            <div className="sticky-content fix-top product-sticky-content">
              <div className="container">
                <div className="sticky-product-details">
                  <figure className="product-image">
                    <ALink href={"/product/" + product.slug}>
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
                      <ALink href={"/product/" + product.slug}>
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
                    <Quantity
                      max={currentInventory}
                      qty={quantity}
                      product={product}
                      onChangeQty={changeQty}
                    />

                    {cartItem && (
                      <button
                        className={`btn-product btn-cart text-normal ls-normal font-weight-semi-bold ${
                          cartActive ? "" : "disabled"
                        }`}
                        onClick={() => {
                          router.push("/pages/cart");
                        }}
                      >
                        <i>
                          <Bag color="currentColor" size={20} />
                        </i>
                        View Cart
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
        </>
      ) : (
        <>
          {!!hasInventory ? (
            <div className="product-form product-qty pb-0">
              <label className="d-none">QTY:</label>
              <div className="product-form-group cart-button-wrapper">
                <Quantity
                  qty={quantity}
                  max={currentInventory}
                  product={product}
                  onChangeQty={changeQty}
                />
                {cartItem && (
                  <button
                    className={`btn-product btn-cart text-normal ls-normal font-weight-semi-bold ${
                      cartActive ? "" : "disabled"
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      router.push("/pages/cart");
                    }}
                  >
                    <i>
                      <Bag color="currentColor" size={20} />
                    </i>
                    View Cart
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
          ) : (
            <ProductNotify productId={product.id} variantId={selectedVariant} />
          )}
        </>
      )}

      <hr className="product-divider mb-3 d-sm-none"></hr>

      <div className="product-footer">
        <a
          href="#"
          className={`btn-product btn-wishlist`}
          title={isWishlisted ? "Browse wishlist" : "Add to wishlist"}
          onClick={wishlistHandler}
        >
          <i>
            {isWishlisted ? (
              <HeartFilled size={18} color="currentColor" />
            ) : (
              <Heart size={18} color="currentColor" />
            )}
          </i>
          {/* <i
            className={isWishlisted ? "d-icon-heart-full" : "d-icon-heart"}
          ></i> */}
          {isWishlisted ? "Browse wishlist" : "Add to Wishlist"}
        </a>
      </div>
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
  applyCoupon: cartActions.applyCoupon,
  removeFromCart: cartActions.removeFromCart,
  getFeaturedCoupons: systemActions.getFeaturedCoupon,
})(DetailOne);
