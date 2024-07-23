import React from "react";

function QueryUs() {
  return (
    <main className="main contact-us">
      <div className="page-content">
        <div className="container pb-5">
          <section className="">
            <h2 className="title-extra-pages">Contact Us</h2>
          </section>
          <p>&nbsp;</p>
          <div className="iframe-container">
            <iframe
              style={{ border: "none" }}
              src="https://selfserveapp.kapturecrm.com/support-portals/buywow-bodycupid/"
              name="Bcframe"
              width="100%"
              height="600 px"
            ></iframe>
          </div>

          <section className="pt-2 query-us">
            <p className="mb-5 ">
              Feel free to email us at
              <a className="link-color" href="mailto:support@bodycupid.com">
                <strong> support@bodycupid.com</strong>
              </a>{" "}
              for any questions, grievances, or feedback.
            </p>

            <p className="mb-0">Contact details</p>
            <p className="mb-5 ">Body Cupid Pvt Ltd. (Bodycupid)</p>
            <p className="mb-5">
              4th Floor, Prestige Dotcom, Field Marshal Cariappa Road, Srinivas
              Nagar, Shanthala Nagar, Ashok Nagar, Bengaluru - 560025,
              Karnataka, India.
            </p>
            <p className="mb-5">Phone Number: +917996123484</p>

            <p>Working Hours- 10AM - 7PM IST (Monday to Saturday)</p>
          </section>
        </div>
      </div>
    </main>
  );
}

export default QueryUs;
