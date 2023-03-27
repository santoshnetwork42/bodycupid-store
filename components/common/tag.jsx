import React from "react";

export default function Tag({ title = "", type = "cancel", qty = 0 }) {
  return (
    <span className={`order-tag ${type} mb-0 ml-1 text-left`}>
      {title}&nbsp;
      {qty > 0 && (
        <>
          <i className="fas fa-times mr-1"></i>
          {qty}
        </>
      )}
    </span>
  );
}
