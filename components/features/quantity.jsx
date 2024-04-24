import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import { Minus, Plus } from "~/components/icons";
import AlertPopup from "./product/common/alert-popup";

export default function Quantity({
  qty = 1,
  minimumOrderQuantity,
  maximumOrderQuantity,
  ...props
}) {
  const {
    isProductList = false,
    adClass = `${
      isProductList ? "quntity-container d-flex" : "mr-2 input-group bg-white"
    }`,
    product,
  } = props;

  const maxOrderCaution = `You cannot add more than ${maximumOrderQuantity} quantities of ${
    product?.title || ""
  }`;

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
      if (quantity === minimumOrderQuantity) {
        setQuantity(0);
      } else {
        setQuantity(parseInt(quantity) - 1);
      }
    }
  }

  function plusQuantity() {
    if (!product.isInventoryEnabled || quantity < props.max) {
      if (quantity === maximumOrderQuantity) {
        toast(<AlertPopup message={maxOrderCaution} status="info" />, {
          position: "bottom-center",
          autoClose: 2000,
        });
      } else {
        setQuantity(parseInt(quantity) + 1);
      }
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
