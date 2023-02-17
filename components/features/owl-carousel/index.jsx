import React from "react";
import $ from "jquery";
import Inner from "./inner";

const OwlCarousel = (props) => {
  if (typeof window === "undefined") {
    return null;
  }
  window.$ = window.jQuery = $;

  return <Inner {...props} />;
};

export default OwlCarousel;
