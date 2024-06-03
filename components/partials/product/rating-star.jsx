import React, { useState } from "react";

import { GradientStar, Star } from "~/components/icons";

export default function RatingStar({
  editable = false,
  onClick = () => {},
  value: defValue = 0,
}) {
  const [value, setValue] = useState(defValue);
  let productRating = value;

  if (!editable) {
    return (
      <div className="ratings-container m-0 pointer-none">
        <div className="ratings-full mt-0 lh-1">
          {Array.from({ length: 5 }).map((_, index) => {
            const fill = Math.min(productRating, 1) * 100;
            productRating = productRating > 1 ? productRating - 1 : 0;
            return <GradientStar key={index} size={16} fill={fill} />;
          })}
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
          <Star size={16} color={num <= value ? "#FAB73B" : "#D9D9D9"} />
        </a>
      ))}
    </span>
  );
}
