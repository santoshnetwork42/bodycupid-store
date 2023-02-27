import React from "react";
import Head from "next/head";

function Shiiping() {
  return (
    <main className="main about-us">
      <Head>
        <title>Wow life science | Titles</title>
      </Head>

      <h1 className="d-none">
        SHIPPING AND DELIVERY POLICY - WOW Life Science
      </h1>

      <div className="page-content">
        <div className="container">
          <section className="mt-10 pt-3">
            <h2 className="title title-center">SHIPPING AND DELIVERY POLICY</h2>
          </section>
          <section className="mt-10 pt-2">
            <p className="text-grey">
              The standard ground mail service is shipped via
              Gojavas/BlueDart/Aramex/Ecom/IndiaPost. We try to dispatch all our
              orders within 24-48 hours in normal business days. Please be
              advised that shipments are not sent out on Saturdays, Sundays, or
              any Holidays. We do not guarantee arrival dates or times and it is
              dependent on the courier partner and location.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}

export default React.memo(Shiiping);
