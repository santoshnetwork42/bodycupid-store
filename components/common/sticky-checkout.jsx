import { useMemo } from "react";
import { connect } from "react-redux";

import ALink from "~/components/features/custom-link";
import { getCartTotals, toDecimal } from "~/utils";

function StickyFooter(props) {
  const { cartList, appliedCoupon, showStickyCheckout } = props;
  const { totalPrice, totalItems } = useMemo(
    () => getCartTotals(cartList, appliedCoupon),
    [appliedCoupon, cartList]
  );

  if (!cartList.length || !showStickyCheckout) return <></>;
  return (
    <div className="stick-bottom-button">
      <div className="lh-default text-primary">
        <span>{totalItems > 1 ? `${totalItems} Items` : `1 Item`}</span>
        <p className="summary-total-price text-left ls-s">
          ₹ {toDecimal(totalPrice)}
        </p>
      </div>

      <ALink
        href="/pages/cart"
        className="btn btn-dark btn-rounded btn-checkout"
      >
        Go To Cart
      </ALink>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    cartList: state.cart.data || [],
    user: state.user.data,
  };
}

export default connect(mapStateToProps, {})(StickyFooter);