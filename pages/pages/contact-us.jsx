import React from "react";
import Head from "next/head";
import { connect } from "react-redux";

function ContactUs({ store }) {
  return (
    <main className="main about-us">
      <Head>
        <title>{store?.name} | Contact Us</title>
      </Head>

      <h1 className="d-none">CONTACT - {store?.name}</h1>

      <div className="page-content">
        <div className="container">
          <section className="mt-10 pt-3">
            <h2 className="title title-center">CONTACT US</h2>
          </section>
          <section>
            <h3 className="title title-center">Address</h3>
            <p className="text-center"> Body Cupid Pvt Ltd.</p>
            <p className="text-center">
              4th Floor, Prestige Dotcom, Field Marshal Cariappa Road, Srinivas
              Nagar, Shanthala Nagar, Ashok Nagar, Bengaluru – 560025,
              Karnataka, India.
            </p>
          </section>

          <section>
            <h3 className="title title-center">Phone Number</h3>
            <p className="text-center">
              +91-9543000200 Working Hours - (10AM - 7PM IST Monday to Saturday)
            </p>
          </section>

          <section>
            <h3 className="title title-center">Email</h3>
            <p className="text-center">support@bodycupid.com</p>
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
