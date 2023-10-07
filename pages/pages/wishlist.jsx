import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import Head from "next/head";

import ALink from "~/components/features/custom-link";

import { cartActions } from "~/store/cart";
import { wishlistActions } from "~/store/wishlist";

import { toDecimal } from "~/utils";
import { getPublicImageURL } from "~/utils/getPublicImageUrl";
import Pagination from "~/components/features/pagination";

const PAGE_SIZE = 5;

function Wishlist(props) {
  const { wishlist, addToCart, removeFromWishlist, store } = props;
  const router = useRouter();
  const { query } = router;
  const { page = 1 } = query;
  const { name } = store || {};

  const moveToCart = (e, item) => {
    e.preventDefault();
    addToCart({ ...item, qty: 1, price: item.price });
    removeFromWishlist(item);
  };

  const currentList = useMemo(
    () => [...wishlist].splice((Number(page) - 1) * PAGE_SIZE, PAGE_SIZE),
    [page, wishlist]
  );

  return (
    <main className="main">
      <Head>
        <title>{name} | Wishlist</title>
      </Head>

      <h1 className="d-none">{name} - Wishlist</h1>
      <nav className="breadcrumb-nav">
        <div className="container">
          <ul className="breadcrumb">
            <li>
              <ALink href="/">
                <i className="d-icon-home"></i>
              </ALink>
            </li>
            <li>Wishlist</li>
          </ul>
        </div>
      </nav>

      <div className="page-content pt-10 pb-10 mb-2">
        <div className="container">
          {!!currentList.length ? (
            <>
              <table className="shop-table wishlist-table mt-2 mb-4">
                <thead>
                  <tr>
                    <th className="product-name">
                      <span>Product</span>
                    </th>
                    <th></th>
                    <th className="product-price">
                      <span>Price</span>
                    </th>
                    <th className="product-stock-status">
                      <span>Stock status</span>
                    </th>
                    <th className="product-add-to-cart"></th>
                    <th className="product-remove"></th>
                  </tr>
                </thead>
                <tbody className="wishlist-items-wrapper">
                  {currentList.map((item) => (
                    <tr key={"wishlist-" + item.title}>
                      <td className="product-thumbnail">
                        <ALink href={"/products/" + item.slug}>
                          <figure>
                            <img
                              src={getPublicImageURL(
                                item.images.items[0]?.imageKey
                              )}
                              width="100"
                              height="100"
                              alt={item.images.items[0]?.alt}
                            />
                          </figure>
                        </ALink>
                      </td>
                      <td className="product-name">
                        <ALink href={"/products/" + item.slug}>
                          {item.name}
                        </ALink>
                      </td>
                      <td className="product-price">
                        <span className="amount">₹{toDecimal(item.price)}</span>
                      </td>
                      <td className="product-stock-status">
                        <span
                          className={
                            !item.isInventoryEnabled || item.inventory > 0
                              ? "wishlist-in-stock"
                              : "wishlist-out-stock"
                          }
                        >
                          {!item.isInventoryEnabled || item.inventory > 0
                            ? "In Stock"
                            : "Out of Stock"}
                        </span>
                      </td>
                      <td className="product-add-to-cart">
                        {(!item.isInventoryEnabled || item.inventory > 0) && (
                          <a
                            href="#"
                            className="btn-product btn-primary"
                            onClick={(e) => moveToCart(e, item)}
                          >
                            <span>Add to Cart</span>
                          </a>
                        )}
                      </td>
                      <td className="product-remove">
                        <div>
                          <ALink
                            href="#"
                            className="remove"
                            title="Remove this product"
                          >
                            <i
                              className="fas fa-times"
                              onClick={() => removeFromWishlist(item)}
                            />
                          </ALink>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination totalPage={Math.ceil(wishlist.length / PAGE_SIZE)} />
              <div className="social-links share-on">
                <h5 className="text-uppercase font-weight-bold mb-0 mr-4 ls-s">
                  Share on:
                </h5>
                <a
                  href="https://www.instagram.com/wowlifescienceindia/"
                  className="social-link social-icon social-instagram "
                  title="Instagram"
                  target={"_blank"}
                >
                  <i className="fab fa-instagram"></i>
                </a>
                <a
                  href="https://www.facebook.com/wowlifescienceindia/"
                  className="social-link social-icon social-facebook"
                  title="Facebook"
                  target={"_blank"}
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a
                  href="https://www.youtube.com/@WOWLifeScience"
                  className="social-link social-icon social-youtube"
                  title="Youtube"
                  target={"_blank"}
                >
                  <i className="fab fa-youtube"></i>
                </a>
              </div>
            </>
          ) : (
            <div className="empty-cart text-center">
              <i className="cart-empty d-icon-heart"></i>
              <p>No products added to the wishlist.</p>
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
    </main>
  );
}

function mapStateToProps(state) {
  return {
    wishlist: state.wishlist.data ? state.wishlist.data : [],
    store: state.system.store,
  };
}

export default connect(mapStateToProps, {
  addToCart: cartActions.addToCart,
  removeFromWishlist: wishlistActions.removeFromWishlist,
})(Wishlist);
