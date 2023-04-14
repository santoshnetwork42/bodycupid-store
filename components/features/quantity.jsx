import { useState, useEffect } from "react";

import { Minus, Plus } from "~/components/icons";

export default function Quantity({ qty = 1, ...props }) {
  const {
    isProductList = false,
    adClass = `${
      isProductList ? "quntity-container d-flex" : "mr-2 input-group"
    }`,
    product,
  } = props;
  const [quantity, setQuantity] = useState(parseInt(qty));

  useEffect(() => {
    setQuantity(qty || 1);
  }, [qty]);

  useEffect(() => {
    props.onChangeQty && qty !== quantity && props.onChangeQty(quantity);
  }, [quantity]);

  function minusQuantity() {
    if (quantity > 0) {
      setQuantity(parseInt(quantity) - 1);
    }
  }

  function plusQuantity() {
    if (!product.isInventoryEnabled || quantity < props.max) {
      setQuantity(parseInt(quantity) + 1);
    }
  }

  function changeQty(e) {
    let newQty;

    if (e.currentTarget.value !== "") {
      newQty = product.isInventoryEnabled
        ? Math.min(parseInt(e.currentTarget.value), props.max)
        : parseInt(e.currentTarget.value);
      newQty = Math.max(newQty, 1);
      setQuantity(newQty);
    }
  }

  return (
    <div className={adClass}>
      <button className="quantity-minus" onClick={minusQuantity}>
        <Minus size={12} color="currentColor" />
      </button>
      <input
        className="quantity-cart"
        type="number"
        min="1"
        max={props.max}
        value={quantity}
        onChange={changeQty}
      />
      <button className="quantity-plus" onClick={plusQuantity}>
        <Plus size={12} color="currentColor" />
      </button>
    </div>
  );
}
