"use client";

import React from "react";
import { connect } from "react-redux";

function Privacy({ store }) {
  const { name } = store || {};
  return (
    <main className="main about-us">
      <h1 className="d-none">Privacy Policy - {name}</h1>
      <div className="page-content"><div className="container">{/* Text content unchanged */}</div></div>
    </main>
  );
}

export default connect((state) => ({ store: state.system.store }))(React.memo(Privacy));
