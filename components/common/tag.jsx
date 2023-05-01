import React from "react";

export default function Tag({ children, type = "success" }) {
  return (
    <span className={`tag-wrapper h-fit-content ${type} mb-0 ml-1 text-left`}>
      {children}
    </span>
  );
}
