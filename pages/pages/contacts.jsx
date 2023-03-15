import React from "react";
import Head from "next/head";
import { connect } from "react-redux";

function ContactUs({ store }) {
  return (
    <main className="main about-us">
      <Head>
        <title>{store.name} | Contact Us</title>
      </Head>

      <h1 className="d-none">CONTACT - {store.name}</h1>

      <div className="page-content">
        <div className="container">
          <section className="mt-10 pt-3">
            <h2 className="title title-center">CONTACT</h2>
          </section>
          <section className="mt-10 pt-2">
            <h2 className="title title-simple">IMPORTANT</h2>
            <p className="text-grey text-center">
              If you have ordered multiple products we dispatch from multiple
              warehouses, thus you may receive multiple shipments. Please be
              rest assured you will receive all shipments.
            </p>
            <p className="text-grey text-center">
              For any queries, grievances, or feedback kindly email us at
              support@buywow.in. Please note responses can be delayed.
            </p>
            <p className="text-grey text-center">
              Contact details for Body Cupid Pvt Ltd (Buywow)
            </p>
          </section>
          <section>
            <h3 className="title title-center">Address</h3>
            <p className="text-grey text-center">
              Body Cupid Pvt Ltd. 4th Floor, Prestige Dotcom, Field Marshal
              Cariappa Road, Srinivas Nagar, Shanthala Nagar, Ashok Nagar,
              Bengaluru – 560025, Karnataka, India.
            </p>
          </section>

          <section>
            <h3 className="title title-center">Phone Number</h3>
            <p className="text-grey text-center">
              +91-80-42896000 Working Hours - (10AM - 7PM IST Monday to Sunday)
            </p>
          </section>

          <section>
            <h3 className="title title-center">Email</h3>
            <p className="text-grey text-center">support@buywow.in</p>
          </section>
        </div>
      </div>
    </main>
  );
}

function mapStateToProps(state) {
  return {
    store: state.system.store,
  };
}

export default connect(mapStateToProps)(ContactUs);
