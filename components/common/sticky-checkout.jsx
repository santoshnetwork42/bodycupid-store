import { useMemo } from "react";
import { connect } from "react-redux";
import { useCartTotal } from "@wow-star/utils";

import ALink from "~/components/features/custom-link";
import { modalActions } from "~/store/modal";
import { getCartCount, toDecimal } from "~/utils";
import { useNavBarState } from "~/utils/contexts/navbar";
import CouponDiscountBar from "./coupon-discount-bar";

function StickyFooter(props) {
  const { cartList, showStickyCheckout, setCartVisibility } = props;
  const { isRewardApplied } = useNavBarState();

  const { totalPrice, totalItems } = useCartTotal({
    paymentType: "PREPAID",
    isRewardApplied: isRewardApplied,
  });
  const totalCartItems = getCartCount(cartList);

  const showDiscount = useMemo(() => {
    return (
      totalCartItems > 0 &&
      cartList.some((cart) => {
        const hasSpecialOffer = cart.collections.includes("bundle-offer");
        return hasSpecialOffer;
      })
    );
  }, [cartList]);

  if (!cartList.length || !showStickyCheckout) return <></>;
  return (
    <div className="sticky-container">
      {showDiscount && <CouponDiscountBar />}
      <div className="stick-bottom-button">
        <div className="lh-default text-primary">
          <span>{totalItems > 1 ? `${totalItems} Items` : `1 Item`}</span>
          <p className="summary-total-price text-left ls-s">
            ₹ {toDecimal(totalPrice)}
          </p>
        </div>

        <ALink
          href="#"
          onClick={() => setCartVisibility(true)}
          className="btn btn-dark btn-rounded btn-checkout"
        >
          Go To Cart
        </ALink>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    cartList: state.cart.data || [],
    user: state.user.data,
  };
}

export default connect(mapStateToProps, {
  setCartVisibility: modalActions.setCartVisibility,
})(StickyFooter);
