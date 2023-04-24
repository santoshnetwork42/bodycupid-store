import React from "react";
import ReadMore from "../layouts/read-more";

export default function CategoryHeader({ name, description }) {
  if (!name) return <></>;
  return (
    <div className="category-header pt-3 pb-3 text-center">
      <h4 className="text-uppercase mb-0">{name}</h4>
      {description && (
        <ReadMore>
          <p className="mb-0">{description}</p>
        </ReadMore>
      )}
    </div>
  );
}
