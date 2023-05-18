import React from "react";
import ReadMore from "../layouts/read-more";

export default function CategoryHeader({ name, description }) {
  if (!name) return <></>;
  return (
    <div className="category-header pt-3 text-center">
      <h1 className="text-uppercase mb-0">{name}</h1>
      {!!description && <ReadMore content={description} />}
    </div>
  );
}
