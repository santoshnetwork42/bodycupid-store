import React from "react";

function ProductsOptions({ options }) {
  return (
    <>
      {options?.isDivider && <div className="options-divider d-xl-show"></div>}
      <div className="icon-box-side icon-box icon-border">
        <div className="icon-box-icon">
          <i className={options?.iconName}></i>
        </div>
        <div className="icon-box-content">
          <h4 className="icon-box-title lh-1 pt-1 ls-s text-normal">
            {options?.title}
          </h4>
          <p>{options?.tagline}</p>
        </div>
      </div>
    </>
  );
}

export default ProductsOptions;
