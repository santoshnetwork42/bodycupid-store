import { connect } from "react-redux";

import ALink from "~/components/features/custom-link";
import { RightArrow, Instagram, Facebook, Youtube } from "~/components/icons";
import OptimizedImage from "~/components/features/optimized-image";
import PaymentLogos from "./partials/payment-logos";

function Footer({ footer, store }) {
  const { name } = store || {};

  if (footer.hideFooter) return <></>;

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-middle">
          <div className="row d-flex justify-content-between">
            <div className="col-lg-3 mb-5 col-sm-12 col-md-6">
              <ALink href="/" className="logo-footer">
                {footer?.logo ? (
                  <OptimizedImage
                    optimizedData={{
                      ...footer.logo,
                      width: 100,
                      height: 43,
                    }}
                    loading="lazy"
                    alt="Footer logo"
                  />
                ) : (
                  <img
                    src="/images/logo.png"
                    alt="logo-footer"
                    width="100"
                    height="43"
                  />
                )}
              </ALink>
            </div>

            <div className="col-lg-3 col-sm-12 col-md-6">
              <div className="widget">
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
            <div className="col-lg-6 col-md-0"></div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-left">
            <PaymentLogos />
          </div>
          <div className="footer-center">
            <p className="copyright ls-normal">
              {name} &copy; {new Date().getFullYear()}. All Rights Reserved
            </p>
          </div>
          <div className="footer-right">
            <div className="social-links">
              <a
                title={`${name} on Instagram`}
                className="social-link"
                href="https://www.instagram.com/wowlifescienceindia/"
                target={"_blank"}
              >
                <Instagram size={16} color="currentColor" />
              </a>
              <a
                title={`${name} on Facebook`}
                href="https://www.facebook.com/wowlifescienceindia/"
                className="social-link"
                target={"_blank"}
              >
                <Facebook size={16} color="currentColor" />
              </a>
              <a
                title={`${name} on YouTube`}
                href="https://www.youtube.com/@WOWLifeScience"
                className="social-link"
                target={"_blank"}
              >
                <Youtube size={16} color="currentColor" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function mapStateToProps(state) {
  return {
    store: state.system.store,
  };
}

export default connect(mapStateToProps)(Footer);
