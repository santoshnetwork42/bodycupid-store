import { useMemo } from "react";
import { connect } from "react-redux";

import ALink from "~/components/features/custom-link";
import { getCartTotals, toDecimal } from "~/utils";

function StickyFooter(props) {
  const { cartList, appliedCoupon, showStickyCheckout } = props;
  const { grandTotal } = useMemo(
    () => getCartTotals(cartList, appliedCoupon),
    [appliedCoupon, cartList]
  );

  if (!cartList.length || !showStickyCheckout) return <></>;
  return (
    <div className="stick-bottom-button btn-dark pl-5 pr-5 d-sm-show">
      <div className="lh-default">
        <span href="#">
          {cartList.length}&nbsp;
          {cartList.length > 1 ? "Items" : "Item"}
        </span>
        <p className="summary-total-price text-left ls-s">
          ₹ {toDecimal(grandTotal)}
        </p>
      </div>

      <ALink
        href="/pages/cart"
        className="btn btn-dark btn-rounded btn-checkout"
      >
        View cart
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
