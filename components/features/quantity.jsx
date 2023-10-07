import { useState, useEffect } from "react";

import { Minus, Plus } from "~/components/icons";

export default function Quantity({ qty = 1, ...props }) {
  const {
    isProductList = false,
    adClass = `${
      isProductList ? "quntity-container d-flex" : "mr-2 input-group bg-white"
    }`,
    product,
  } = props;

  const [quantity, setQuantity] = useState(parseInt(qty));

  useEffect(() => {
    setQuantity(qty || 1);
  }, [qty]);

  useEffect(() => {
    props.onChangeQty &&
      qty !== quantity &&
      quantity !== "" &&
      props.onChangeQty(quantity);
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
    const newQty = e.currentTarget.value.trim();

    let parsedQty = "";
    if (newQty !== "") {
      parsedQty = parseInt(newQty);
      parsedQty = Math.min(parsedQty, props.max);
      parsedQty = Math.max(parsedQty, 1);
    }
    setQuantity(parsedQty);
  }

  function handleBlur() {
    if (!quantity) {
      setQuantity(1);
    }
  }

  return (
    <div className={adClass}>
      <button
        className="quantity-minus d-flex justify-content-center w-100 align-items-center"
        onClick={minusQuantity}
      >
        <Minus size={12} color="currentColor" />
      </button>
      <input
        className="quantity-cart w-100"
        type="number"
        min="1"
        max={props.max}
        value={quantity}
        onChange={changeQty}
        onBlur={handleBlur}
      />
      <button
        className="quantity-plus w-100 d-flex justify-content-center align-items-center"
        onClick={plusQuantity}
      >
        <Plus size={12} color="currentColor" />
      </button>
    </div>
  );
}
