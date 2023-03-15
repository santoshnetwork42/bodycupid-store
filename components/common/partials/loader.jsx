import React from "react";

const Loader = ({ loading, small = false }) => {
  if (!loading) return <></>;
  if (small) return <div className="d-loading"></div>;
  return (
    <div className="loader-overlay">
      <div className="common-loading-overlay"></div>
    </div>
  );
};

export default Loader;
