import { connect } from "react-redux";

import ALink from "~/components/features/custom-link";
import {
  Instagram,
  Facebook,
  Youtube,
  Twitter,
  Pinterest,
} from "~/components/icons";
import Image from "~/components/image";
import PaymentLogos from "./partials/payment-logos";

function Footer({ footer, store }) {
  const { name, socialLinks } = store || {};

  if (footer.hideFooter) return <></>;

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-middle">
          <div className="row d-flex justify-content-between">
            <div className="col-lg-3 col-sm-12 col-md-6">
              <ALink href="/" className="logo-footer">
                <Image
                  src="/images/logo.png"
                  alt="logo-footer"
                  width="100"
                  height="100"
                  objectFit="contain"
                  loading="lazy"
                  priority={false}
                  loader="local"
                />
              </ALink>
            </div>

            <div className="col-lg-3 col-sm-12 col-md-6">
              <div className="widget">
                {/* <h4 className="widget-title">Contact Info</h4> */}
                <ul className="widget-body">
                  <li>
                    <ALink prefetch={false} href="/pages/about-us">
                      About Us
                    </ALink>
                  </li>
                  <li>
                    <ALink prefetch={false} href="/policies/refund-policy">
                      Return / Refund / Cancellation Policy
                    </ALink>
                  </li>
                  <li>
                    <ALink prefetch={false} href="/policies/terms-of-service">
                      Terms Of Service
                    </ALink>
                  </li>
                  <li>
                    <ALink prefetch={false} href="/policies/privacy-policy">
                      Privacy Policy
                    </ALink>
                  </li>
                  <li>
                    <ALink
                      prefetch={false}
                      href="/pages/shipping-and-delivery-policy"
                    >
                      Shipping and Delivery Policy
                    </ALink>
                  </li>
                  <li>
                    <ALink prefetch={false} href="/pages/contact-us">
                      Contact Us
                    </ALink>
                  </li>
                  {/* <li>
                    <ALink prefetch={false} href="/blog">
                      Blogs
                    </ALink>
                  </li> */}
                  <li>
                    <ALink
                      prefetch={false}
                      href="https://bodycupid.clickpost.in/"
                      target="_blank"
                    >
                      Track your Order
                    </ALink>
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
              {!!socialLinks?.instagram && (
                <a
                  title={`${name} on Instagram`}
                  className="social-link social-insta"
                  href={socialLinks.instagram}
                  target={"_blank"}
                >
                  <Instagram size={16} color="currentColor" />
                </a>
              )}
              {!!socialLinks?.facebook && (
                <a
                  title={`${name} on Facebook`}
                  href={socialLinks.facebook}
                  className="social-link social-facebook"
                  target={"_blank"}
                >
                  <Facebook size={16} color="currentColor" />
                </a>
              )}
              {!!socialLinks?.youtube && (
                <a
                  title={`${name} on YouTube`}
                  href={socialLinks.youtube}
                  className="social-link social-youtube"
                  target={"_blank"}
                >
                  <Youtube size={16} color="currentColor" />
                </a>
              )}
              {!!socialLinks?.twitter && (
                <a
                  title={`${name} on twitter`}
                  href={socialLinks.twitter}
                  className="social-link social-twitter"
                  target={"_blank"}
                >
                  <Twitter size={16} color="currentColor" />
                </a>
              )}
              {!!socialLinks?.pinterest && (
                <a
                  title={`${name} on pinterest`}
                  href={socialLinks.pinterest}
                  className="social-link social-pinterest"
                  target={"_blank"}
                >
                  <Pinterest size={16} color="currentColor" />
                </a>
              )}
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
