import React from "react";

import { Lock, Return, Cash, Shipping } from "~/components/icons";

function ProductSpecifications({ title, tagline, iconName, isDivider }) {
  const iconNameToIconMapper = {
    lock: <Lock size={24} />,
    return: <Return size={24} />,
    cash: <Cash size={24} />,
    shipping: <Shipping size={24} />,
  };

  return (
    <>
      {isDivider && <div className="options-divider d-xl-show"></div>}
      <div className="icon-box-side icon-box icon-border">
        <div className="icon-box-icon">
          <i>{iconNameToIconMapper[iconName]}</i>
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
