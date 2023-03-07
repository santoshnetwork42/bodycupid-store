import React from "react";

function ProductSpecifications({ title, tagline, iconName, isDivider }) {
  return (
    <>
      {isDivider && <div className="options-divider d-xl-show"></div>}
      <div className="icon-box-side icon-box icon-border">
        <div className="icon-box-icon">
          <i className={iconName}></i>
        </div>
        <div className="icon-box-content">
          <h4 className="icon-box-title lh-1 pt-1 ls-s text-normal">{title}</h4>
          <p>{tagline}</p>
        </div>
      </div>
    </>
  );
}

export default ProductSpecifications;
