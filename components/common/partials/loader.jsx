import React from "react";

const Loader = ({ loading }) => {
  if (!loading) return <></>;
  return (
    <div className="loader-overlay">
      <div className="common-loading-overlay"></div>{" "}
    </div>
  );
};

export default Loader;
