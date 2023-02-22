import { connect } from "react-redux";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import Collapse from "react-bootstrap/Collapse";

import ALink from "~/components/features/custom-link";
import Quantity from "~/components/features/quantity";

import ProductNav from "~/components/partials/product/product-nav";

import { wishlistActions } from "~/store/wishlist";
import { cartActions } from "~/store/cart";

import { toDecimal } from "~/utils";
import { getPublicImageURL } from "~/utils/getPublicImageUrl";

function DetailOne(props) {
  let router = useRouter();
  const {
    data: product,
    isStickyCart = false,
    adClass = "",
    isNav = true,
    variantId: selectedVaraint,
    setVariant,
  } = props;
  const { toggleWishlist, addToCart, wishlist } = props;
  const [curIndex, setCurIndex] = useState(-1);
  const [cartActive, setCartActive] = useState(false);
  const [quantity, setQauntity] = useState(1);

  const sizes = useMemo(
    () =>
      (product?.variants?.items || [])
        .sort((a, b) => a.position - b.position)
        .map((item) => ({ name: item.title, value: item.id })),
    [product?.variants?.items]
  );

  // decide if the product is wishlisted
  const isWishlisted = useMemo(
    () => wishlist.some((i) => i.id === product?.id),
    [wishlist, product?.id]
  );
  curIndex;

  useEffect(() => {
    return () => {
      setCurIndex(-1);
      resetValueHandler();
    };
  }, [product]);

  useEffect(() => {
    if (product.variants.items.length > 1) {
      if (selectedVaraint) {
        setCartActive(true);
        setCurIndex(
          product.variants.items.findIndex(
            (item) => item.id === selectedVaraint
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
  }, [selectedVaraint, product]);

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

  const setVariantHandler = (e) => {
    if (setVariant) {
      if (e.target.value === "null") {
        setVariant(null);
      } else {
        setVariant(e.target.value);
      }
    }
  };

  const addToCartHandler = () => {
    if ((!product.isInventoryEnabled || product.inventory > 0) && cartActive) {
      if (product.variants.items.length > 1) {
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
          variantId: selectedVaraint,
        });
      } else {
        addToCart({ ...product, qty: quantity, price: product.price });
      }
    }
  };

  const resetValueHandler = () => {
    setVariant(null);
  };

  function changeQty(qty) {
    setQauntity(qty);
  }

  return (
    <div className={"product-details " + adClass}>
      {isNav && (
        <div className="product-navigation">
          <ul className="breadcrumb breadcrumb-lg">
            <li>
              <ALink href="/">
                <i className="d-icon-home"></i>
              </ALink>
            </li>
            <li>
              <ALink href="/collections/all" className="active">
                Products
              </ALink>
            </li>
            {product.category && (
              <li>
                <ALink
                  href={{
                    pathname: "/collections/[category]",
                    query: { category: product.category.slug },
                  }}
                  className="active"
                >
                  {product.category.name}
                </ALink>
              </li>
            )}
            {product.subCategory && (
              <li>
                <ALink
                  href={{
                    pathname: "/collections/[category][subcategory]",
                    query: {
                      category: product.category.slug,
                      subcategory: product.subCategory.slug,
                    },
                  }}
                  className="active"
                >
                  {product.subCategory.name}
                </ALink>
              </li>
            )}
          </ul>

          <ProductNav product={product} />
        </div>
      )}

      <h2 className="product-name">{product.title}</h2>

      <div className="product-meta">
        {product.category && (
          <>
            CATEGORIES:{" "}
            <span className="product-brand">
              <React.Fragment key={product.category.id}>
                <ALink
                  href={{
                    pathname: "/collections/[category]",
                    query: { category: product.category.slug },
                  }}
                >
                  {product.category.name}
                </ALink>
                {product.subCategory && (
                  <>
                    {", "}
                    <ALink
                      href={{
                        pathname: "/collections/[category]/[subcategory]",
                        query: {
                          category: product.category.slug,
                          subcategory: product.subCategory.slug,
                        },
                      }}
                    >
                      {product.subCategory.name}
                    </ALink>
                  </>
                )}
              </React.Fragment>
            </span>
          </>
        )}
      </div>

      <div className="product-variation-price">
        <Collapse in={cartActive && curIndex > -1}>
          <div className="card-wrapper">
            {curIndex > -1 && (
              <div className="single-product-price">
                {product.variants.items[curIndex].price &&
                  (product.variants.items[curIndex].listingPrice ? (
                    <div className="product-price mb-0">
                      <del className="old-price mr-2">
                        ₹
                        {toDecimal(
                          product.variants.items[curIndex].listingPrice
                        )}
                      </del>{" "}
                      <ins className="new-price">
                        ₹{toDecimal(product.variants.items[curIndex].price)}
                      </ins>
                    </div>
                  ) : (
                    <div className="product-price mb-0">
                      <ins className="new-price">
                        ₹{toDecimal(product.variants.items[curIndex].price)}
                      </ins>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </Collapse>
      </div>

      <div className="ratings-container">
        <div className="ratings-full">
          {/* <span className="ratings" style={{ width: Math.min(20 * product.rating, 100)s + '%' }}></span>
                    <span className="tooltiptext tooltip-top">{toDecimal(product.ratings)}</span> */}
          <span
            className="ratings"
            style={{ width: Math.min(20 * product.rating, 100) + "%" }}
          ></span>
          <span className="tooltiptext tooltip-top">
            {toDecimal(product.rating)}
          </span>
        </div>

        {/* <ALink href="#" className="rating-reviews">( {product.reviews} reviews )</ALink> */}
        <ALink href="#" className="rating-reviews">
          ( {product.reviews.items.length} reviews )
        </ALink>
      </div>

      <p className="product-short-desc">{product.productDescription}</p>

      {sizes.length > 1 && (
        <>
          <div className="product-form product-variations product-size mb-0 pb-2">
            <label>Size:</label>
            <div className="product-form-group">
              <div className="select-box">
                <select
                  name="size"
                  className="form-control select-size"
                  onChange={setVariantHandler}
                  value={selectedVaraint}
                >
                  <option value={"null"}>Choose an option</option>
                  {sizes.map((item) => (
                    <option value={item.value} key={item.value}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </>
      )}

      <hr className="product-divider"></hr>

      {isStickyCart ? (
        <div className="sticky-content fix-top product-sticky-content">
          <div className="container">
            <div className="sticky-product-details">
              <figure className="product-image">
                <ALink href={"/product/" + product.slug}>
                  <img
                    src={getPublicImageURL(product.images.items[0]?.imageKey)}
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
                    {/* {
                                                curIndex > -1 && product.variants[0] ?
                                                    product.variants[curIndex].price ?
                                                        product.variants[curIndex].sale_price ?
                                                            <>
                                                                <ins className="new-price">₹{toDecimal(product.variants[curIndex].sale_price)}</ins>
                                                                <del className="old-price">₹{toDecimal(product.variants[curIndex].price)}</del>
                                                            </>
                                                            :
                                                            <>
                                                                <ins className="new-price">₹{toDecimal(product.variants[curIndex].price)}</ins>
                                                            </>
                                                        : ""
                                                    :
                                                    product.price[0] !== product.price[1] ?
                                                        product.variants.length === 0 ?
                                                            <>
                                                                <ins className="new-price">₹{toDecimal(product.price[0])}</ins>
                                                                <del className="old-price">₹{toDecimal(product.price[1])}</del>
                                                            </>
                                                            :
                                                            < del className="new-price">₹{toDecimal(product.price[0])} – ₹{toDecimal(product.price[1])}</del>
                                                        : <ins className="new-price">₹{toDecimal(product.price[0])}</ins>
                                            } */}
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
                      ( {product.reviews.items.length} reviews )
                    </ALink>
                  </div>
                </div>
              </div>
            </div>
            <div className="product-form product-qty pb-0">
              <label className="d-none">QTY:</label>
              <div className="product-form-group">
                <Quantity
                  max={product.inventory}
                  product={product}
                  onChangeQty={changeQty}
                />
                <button
                  className={`btn-product btn-cart text-normal ls-normal font-weight-semi-bold ${
                    cartActive ? "" : "disabled"
                  }`}
                  onClick={addToCartHandler}
                >
                  <i className="d-icon-bag"></i>Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="product-form product-qty pb-0">
          <label className="d-none">QTY:</label>
          <div className="product-form-group">
            <Quantity
              max={product.inventory}
              product={product}
              onChangeQty={changeQty}
            />
            <button
              className={`btn-product btn-cart text-normal ls-normal font-weight-semi-bold ${
                cartActive ? "" : "disabled"
              }`}
              onClick={addToCartHandler}
            >
              <i className="d-icon-bag"></i>Add to Cart
            </button>
          </div>
        </div>
      )}

      <hr className="product-divider mb-3"></hr>

      <div className="product-footer">
        <div className="social-links mr-4">
          <ALink
            href="#"
            className="social-link social-facebook fab fa-facebook-f"
          ></ALink>
          <ALink
            href="#"
            className="social-link social-twitter fab fa-twitter"
          ></ALink>
          <ALink
            href="#"
            className="social-link social-pinterest fab fa-pinterest-p"
          ></ALink>
        </div>{" "}
        <span className="divider d-lg-show"></span>{" "}
        <a
          href="#"
          className={`btn-product btn-wishlist`}
          title={isWishlisted ? "Browse wishlist" : "Add to wishlist"}
          onClick={wishlistHandler}
        >
          <i
            className={isWishlisted ? "d-icon-heart-full" : "d-icon-heart"}
          ></i>{" "}
          {isWishlisted ? "Browse wishlist" : "Add to Wishlist"}
        </a>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    wishlist: state.wishlist.data ? state.wishlist.data : [],
  };
}

export default connect(mapStateToProps, {
  toggleWishlist: wishlistActions.toggleWishlist,
  addToCart: cartActions.addToCart,
})(DetailOne);
