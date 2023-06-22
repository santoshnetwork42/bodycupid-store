import { useEffect } from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";

import ALink from "~/components/features/custom-link";
import { Bag, Cross } from "~/components/icons";
import Coupons from "~/components/features/coupon";

import { cartActions } from "~/store/cart";
import { modalActions } from "~/store/modal";
import { eventActions } from "~/store/events";

import { getTotalPrice, getCartCount, toDecimal } from "~/utils";
import { useCartItems } from "~/utils/hooks/useCart";
import CartProduct from "~/components/partials/cart/cart-product";
import { useInventory } from "~/utils/hooks/useInventory";
import CartTotal from "~/components/common/partials/cart-totals";

function CartMenu(props) {
  const { cartList, appliedCoupon, isCartOpen, setCartVisibility, viewCart } =
    props;
  const router = useRouter();
  const cartItems = useCartItems();
  const { inventoryMapping } = useInventory();

  useEffect(() => {
    if (isCartOpen) {
      viewCart();
      if (
        !document.querySelector(".cart-dropdown").classList.contains("opened")
      )
        document.querySelector(".cart-dropdown").classList.add("opened");
    } else {
      if (document.querySelector(".cart-dropdown").classList.contains("opened"))
        document.querySelector(".cart-dropdown").classList.remove("opened");
    }
  }, [isCartOpen]);

  useEffect(() => {
    setCartVisibility(false);
  }, [router.asPath]);

  return (
    <div className="dropdown cart-dropdown type2 cart-offcanvas d-flex align-items-center p-unset mr-0 mr-lg-2">
      <ALink
        href="#"
        className="cart-toggle label-block link p-relative"
        onClick={() => {
          setCartVisibility(true);
        }}
      >
        <div className="cart-label d-lg-show">
          <span className="cart-name">Shopping Cart:</span>
          <span className="cart-price">
            ₹{toDecimal(getTotalPrice(cartList))}
          </span>
        </div>
        <Bag />
        <span className="cart-count">{getCartCount(cartList)}</span>
      </ALink>
      <div
        className="cart-overlay"
        onClick={() => {
          setCartVisibility(false);
        }}
      ></div>
      <div className="dropdown-box pl-0 pr-0 ">
        <div className="cart-header">
          <h4 className="cart-title ml-4">Shopping Cart</h4>
          <ALink
            href="#"
            className=" mb-0 mr-1"
            onClick={() => {
              setCartVisibility(false);
            }}
          >
            <Cross size={18} />
          </ALink>
        </div>
        <div className="side-cart ">
          {cartItems.length > 0 ? (
            <>
              <div className=" ">
                <div className="shop-table cart-table lh-default ">
                  <div key={appliedCoupon?.id}>
                    {cartItems.map((item) => (
                      <CartProduct
                        isSmall
                        key={`${item.itemKey}-${item.extraQty}`}
                        item={item}
                        inventory={(inventoryMapping || {})[item.recordKey]}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <aside
                id="cart-details "
                className="text-primary sticky-sidebar-wrapper"
              >
                <div
                  className="sticky-sidebar"
                  data-sticky-options="{'bottom': 20}"
                >
                  <Coupons isSmall />
                  <CartTotal isSmall />
                </div>
              </aside>
            </>
          ) : (
            <div className="empty-cart text-center">
              <p className="mt-2">Your cart is currently empty.</p>
              <i className="cart-empty d-icon-bag"></i>
              <p className="return-to-shop mr-3 ml-3  mb-0">
                <ALink
                  className="button wc-backward d-flex justify-content-center btn btn-dark btn-md"
                  href="/collections/all"
                  onClick={() => {
                    setCartVisibility(false);
                  }}
                >
                  Return to shop
                </ALink>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    cartList: state.cart.data || [],
    user: state.user.data,
    appliedCoupon: state.cart.coupon,
    isCartOpen: state.modal.openCart,
  };
}

export default connect(mapStateToProps, {
  removeFromCart: cartActions.removeFromCart,
  updateCart: cartActions.updateCart,
  openLogin: modalActions.openPasswordlessModal,
  setCartVisibility: modalActions.setCartVisibility,
  viewCart: eventActions.viewCart,
})(CartMenu);
