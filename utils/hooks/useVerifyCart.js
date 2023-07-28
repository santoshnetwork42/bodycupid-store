import { useInventory } from "./useInventory";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "~/store/cart";
const useVerifyCart = () => {
  const dispatch = useDispatch();
  const { productWithPrice } = useInventory();

  const cartList = useSelector((state) => state.cart.data || []);

  dispatch(cartActions.validateCart(productWithPrice));
};

export default useVerifyCart;
