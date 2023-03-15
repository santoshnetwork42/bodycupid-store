import ALink from "~/components/features/custom-link";

import OptimizedImage from "~/components/features/optimized-image";
import PaymentLogos from "./partials/payment-logos";

export default function Footer({ footer }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="row align-items-center">
            <div className="col-lg-3">
              <ALink href="/" className="logo-footer">
                {footer?.logo ? (
                  <OptimizedImage
                    optimizedData={{
                      ...footer.logo,
                      width: 154,
                      height: 43,
                    }}
                    loading="lazy"
                    alt="Footer logo"
                  />
                ) : (
                  <img
                    src="/images/logo-footer.png"
                    alt="logo-footer"
                    width="154"
                    height="43"
                  />
                )}
              </ALink>
            </div>
            <div className="col-lg-9">
              <div className="widget widget-newsletter form-wrapper form-wrapper-inline">
                <div className="newsletter-info mx-auto mr-lg-2 ml-lg-4">
                  <h4 className="widget-title">Subscribe to our Newsletter</h4>
                  <p>Get all the latest information, Sales and Offers.</p>
                </div>
                <form
                  action="#"
                  className="input-wrapper footer-email input-wrapper-inline"
                >
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    id="email"
                    placeholder="Email address here..."
                    required
                  />
                  <button
                    className="btn btn-primary btn-rounded btn-md ml-2"
                    type="submit"
                  >
                    subscribe<i className="d-icon-arrow-right"></i>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-middle">
          <div className="row d-flex justify-content-between">
            <div className="col-lg-3 col-md-6">
              <div className="widget widget-info">
                <h4 className="widget-title">Contact Info</h4>
                <ul className="widget-body">
                  <li>
                    <label>Phone: </label>
                    <ALink href="tel:#">+91-80-42896000</ALink>
                  </li>
                  <li>
                    <label>Email: </label>
                    <ALink href="mail@riode.com">support@buywow.in</ALink>
                  </li>
                  <li>
                    <label>Address: </label>
                    <ALink href="#">
                      Body Cupid Pvt Ltd. #51, IndiQube Penta, 5th Floor,
                      Richmond Road, Bengaluru 560025, Karnataka, India.
                    </ALink>
                  </li>
                  <li>
                    <label>WORKING DAYS / HOURS: </label>
                  </li>
                  <li>
                    <ALink href="#">Mon - Sun / 9:00 AM - 8:00 PM</ALink>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="widget  ml-lg-4">
                {/* <h4 className="widget-title">Contact Info</h4> */}
                <ul className="widget-body">
                  <li>
                    <ALink href="/pages/about-us">About Us</ALink>
                  </li>
                  <li>
                    <ALink href="/policies/refund-policy">
                      Return / Refund / Cancellation Policy
                    </ALink>
                  </li>
                  <li>
                    <ALink href="/policies/terms-of-service">
                      Terms & Condition
                    </ALink>
                  </li>
                  <li>
                    <ALink href="/policies/privacy-policy">
                      Privacy Policy
                    </ALink>
                  </li>
                  <li>
                    <ALink href="/pages/shipping-and-delivery-policy">
                      Shipping and Delivery Policy
                    </ALink>
                  </li>
                  <li>
                    <ALink href="/pages/contacts">Contact</ALink>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-6"></div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-left">
            <PaymentLogos />
          </div>
          <div className="footer-center">
            <p className="copyright ls-normal">
              Wow life science &copy; {new Date().getFullYear()}. All Rights
              Reserved
            </p>
          </div>
          <div className="footer-right">
            <div className="social-links">
              <a
                title="Wow Life Science on Instagram"
                className="social-link social-insta fab fa-instagram"
                href="https://www.instagram.com/wowlifescienceindia/"
                target={"_blank"}
              />
              <a
                title="Wow Life Science on Facebook"
                href="https://www.facebook.com/wowlifescienceindia/"
                className="social-link social-facebook fab fa-facebook-f"
                target={"_blank"}
              ></a>
              <a
                title="Wow Life Science on YouTube"
                href="https://www.youtube.com/@WOWLifeScience"
                className="social-link social-youtube fab fa-youtube"
                target={"_blank"}
              ></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
