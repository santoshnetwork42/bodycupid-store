import React, { useEffect, useState } from "react";

export default function RatingStar({
  editable,
  onClick = () => {},
  value: defValue = 0,
}) {
  const [value, setValue] = useState(defValue);

  return (
    <span className={`rating-stars  ${!editable ? "pointer-none" : ""}`}>
      {[1, 2, 3, 4, 5].map((num, index) => (
        <a
          id={`star-${num}`}
          className={`star-${num} ${num === value ? "active" : ""}`}
          onClick={(e) => {
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
