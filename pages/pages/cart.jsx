import React from "react";
import { connect } from "react-redux";
import { useEffect } from "react";
import Head from "next/head";

import ALink from "~/components/features/custom-link";
import Coupons from "~/components/features/coupon";
import { eventActions } from "~/store/events";
import { RightAngle } from "~/components/icons";
import CartProduct from "~/components/partials/cart/cart-product";
import { useInventory } from "~/utils/hooks/useInventory";
import { Logger } from "aws-amplify";
import CartTotal from "~/components/common/partials/cart-totals";
import { useCartItems } from "~/utils/hooks/useCart";

const logger = new Logger("Cart");

function Cart(props) {
  const { store, appliedCoupon, viewCart } = props;

  const { name } = store || {};
  const cartItems = useCartItems();
  const { inventoryMapping } = useInventory();

  useEffect(() => {
    viewCart();
    logger.verbose("View Cart");
  }, []);

  return (
    <main className="main cart">
      <Head>
        <title>{name} | Cart</title>
      </Head>

      <h1 className="d-none">{name} - Cart</h1>

      <div className="page-content pt-lg-7 pt-2 pb-5 lh-default">
        <div className="step-by pr-4 pl-4 d-sm-none">
          <h3 className="title title-simple title-step active">
            <ALink href="#">1. Shopping Cart</ALink>
            <i>
              <RightAngle size={18} color="currentColor" />
            </i>
          </h3>
          <h3 className="title title-simple title-step">
            <ALink href="#">2. Checkout</ALink>
            <i>
              <RightAngle size={18} color="currentColor" />
            </i>
          </h3>
          <h3 className="title title-simple title-step">
            <ALink href="#">3. Order Complete</ALink>
          </h3>
        </div>

        <div className="container p-0 sm-container mt-7 mb-2 ">
          <div className="row">
            {cartItems.length > 0 ? (
              <>
                <div className="col-lg-8 col-md-12 ">
                  <div className="shop-table cart-table lh-default ">
                    <div key={appliedCoupon?.id}>
                      {cartItems.map((item) => (
                        <CartProduct
                          key={`${item.itemKey}-${item.extraQty}`}
                          item={item}
                          inventory={(inventoryMapping || {})[item.recordKey]}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <aside
                  id="cart-details"
                  className="col-lg-4 text-primary sticky-sidebar-wrapper"
                >
                  <div
                    className="sticky-sidebar"
                    data-sticky-options="{'bottom': 20}"
                  >
                    <div id="bccartoffers"></div>
                    <Coupons />
                    <CartTotal />
                  </div>
                </aside>
              </>
            ) : (
              <div className="empty-cart text-center">
                <p className="mt-2">Your cart is currently empty.</p>
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
    store: state.system.store,
    appliedCoupon: state.cart.coupon,
  };
}
const Component = connect(mapStateToProps, {
  viewCart: eventActions.viewCart,
})(Cart);

Component.hideFooter = true;
Component.navbarConfig = { shippingTier: true };
Component.hideChatbot = true;

export default Component;
