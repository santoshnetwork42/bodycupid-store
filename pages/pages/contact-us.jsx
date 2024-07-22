import React from "react";
import ALink from "~/components/features/custom-link";

function ContactUs() {
  return (
    <main className="main contact-us">
      <div className="page-content">
        <div className="container pb-5">
          <section className="">
            <h2 className="title-extra-pages">Contact Us</h2>
          </section>
          <div className="track-div">
            <div className="mt-0">
              <h4 className="title title-center track-section">
                Track Your Order
              </h4>
            </div>
            <div className="text-center mt-1 mb-5">
              If you're eager to track your order and receive up-to-date
              information, use our order tracking system.
            </div>
            <div className="btn-div">
              <a href="https://track.bodycupid.com/">
                <button className="btn mb-10">Track Now</button>
              </a>
            </div>
          </div>
          <div className="container">
            <div className="contact-section mb-10">
              <img
                src="https://dms.mydukaan.io/original/jpeg/media/ea25387c-415b-4445-a1df-885f69dbd406.jpg"
                alt="Chat-Image"
                className="chat-img"
                width={`50%`}
              ></img>
              <div className="">
                <h4 className="div-chat">Get</h4>
                <h4 className="div-section">
                  Quick
                  <br />
                  Responses
                </h4>
                <h4 className="div-chat">to Your Queries</h4>
                <div>
                  For immediate assistance and real-time support, our chat
                  feature is available.
                </div>
                {/* href="https://wa.link/xs6kb5" */}
                <div className="mt-8">
                  <a href="https://api.whatsapp.com/send?phone=918147657386&text=Hi">
                    <button className="btn">Chat With Us</button>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5 container">
            <div className="contact-us-query">
              <div className="first-section">
                <div className="div-query">
                  Not Interested in
                  <span className="span-query">
                    {/* style="color:#f27d1e;font-weight:bold" */}
                    {` Chatting?`}
                  </span>
                </div>
                <div className="div-query">Write to us</div>
                <p>Our 70% of Customers Choose Chat for Quicker Resolutions!</p>
                <div className="mt-8 mb-3">
                  <ALink prefetch={false} href="/pages/query-us">
                    <button className="btn">Send a Query</button>
                  </ALink>
                </div>
              </div>
              <div className="note-section">
                <div className="heading">Note:</div>
                <div className="mb-4 mt-4">
                  Expected response time by agents are 24-48 hrs.
                </div>
                <div className="mt-1 mb-2">
                  Agents are available between 10am to 7pm IST from Monday to
                  Saturday.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ContactUs;
