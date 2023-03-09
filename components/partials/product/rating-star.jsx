import React, { useState } from "react";

export default function RatingStar({
  editable,
  onClick = () => {},
  value: defValue = 0,
}) {
  const [value, setValue] = useState(defValue);

  if (!editable) {
    return (
      <div className="ratings-container m-0 pointer-none">
        <div className="ratings-full">
          <span
            className="ratings"
            style={{ width: Math.min(20 * value, 100) + "%" }}
          ></span>
        </div>
      </div>
    );
  }

  return (
    <span
      className={`rating-stars  ${
        !editable ? "pointer-none" : "cursor-pointer"
      }`}
    >
      {[1, 2, 3, 4, 5].map((num, index) => (
        <a
          id={`star-${num}`}
          className={`star-${num} ${num <= value ? "active" : ""}`}
          onClick={() => {
            if (editable) {
              setValue(num);
              onClick(num);
            }
          }}
          key={"star-" + index}
        >
          {num}
        </a>
      ))}
    </span>
  );
}
