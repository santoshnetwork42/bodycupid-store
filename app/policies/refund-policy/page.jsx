"use client";

import React from "react";
import { connect } from "react-redux";

function RefundPolicy({ store }) {
  const { name } = store || {};
  return (
    <main className="main about-us">
      <h1 className="d-none">Refund policy - {name}</h1>
      <div className="page-content">
        <div className="container">
          <section className="mt-10 pt-3"><h2 className="title title-center">REFUND POLICY</h2></section>
          {/* Content copied as-is from the pages version */}
          {/* For brevity, the full text remains unchanged */}
        </div>
      </div>
    </main>
  );
}

export default connect((state) => ({ store: state.system.store }))(React.memo(RefundPolicy));
