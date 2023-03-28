import { useEffect } from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";

import ALink from "~/components/features/custom-link";
import CartMenu from "~/components/common/partials/cart-menu";
import MainMenu from "~/components/common/partials/main-menu";
import SearchBox from "~/components/common/partials/search-box";
import { headerBorderRemoveList } from "~/utils/data/menu";
import { modalActions } from "~/store/modal";
import OptimizedImage from "~/components/features/optimized-image";

function Header({ navbar, auth, openLogin }) {
  const router = useRouter();

  useEffect(() => {
    let header = document.querySelector("header");
    if (header) {
      if (
        headerBorderRemoveList.includes(router.pathname) &&
        header.classList.contains("header-border")
      )
        header.classList.remove("header-border");
      else if (!headerBorderRemoveList.includes(router.pathname))
        document.querySelector("header").classList.add("header-border");
    }
  }, [router.pathname]);

  const showMobileMenu = () => {
    document.querySelector("body").classList.add("mmenu-active");
  };

  return (
    <header className="header header-border">
      <div className=" sticky-header fix-top sticky-content">
        <div className="header-middle">
          <div className="container">
            <div className="header-left">
              <ALink
                href="#"
                className="mobile-menu-toggle"
                onClick={showMobileMenu}
              >
                <i className="d-icon-bars2"></i>
              </ALink>

              <ALink href="/" className="logo">
                {navbar?.logo ? (
                  <OptimizedImage
                    optimizedData={{
                      ...navbar.logo,
                      width: 153,
                      height: 44,
                    }}
                    loading="eager"
                    alt="logo"
                  />
                ) : (
                  <img
                    src="/images/logo.png"
                    alt="logo"
                    width="153"
                    height="44"
                  />
                )}
              </ALink>

              <SearchBox />
            </div>

            <div className="header-right">
              <ALink
                href="tel:#"
                className="icon-box d-sm-none icon-box-side p-0 mr-3"
              >
                <div className="icon-box-icon mr-0 mr-lg-2">
                  <i className="d-icon-phone"></i>
                </div>
                <div className="icon-box-content d-lg-show">
                  <h4 className="icon-box-title">Call Us Now:</h4>
                  <p>8042896000</p>
                </div>
              </ALink>
              <span className="divider"></span>
              <ALink href="/pages/wishlist" className="wishlist d-sm-none">
                <i className="d-icon-heart"></i>
              </ALink>
              <span className="divider"></span>

              <CartMenu />
              <span className="divider"></span>
              {!!auth && (
                <ALink href="/pages/account" className="account wishlist">
                  <i className="d-icon-user"></i>
                </ALink>
              )}
              {!auth && (
                <ALink
                  href="#"
                  className="label-block wishlist d-sm-none"
                  onClick={() => openLogin(false)}
                >
                  <i className="d-icon-user"></i>
                </ALink>
              )}
              {!auth && (
                <ALink
                  href="/pages/login"
                  className="label-block wishlist d-sm-show"
                >
                  <i className="d-icon-user"></i>
                </ALink>
              )}
            </div>
          </div>
        </div>
        <div className="header-bottom d-lg-show sticky-header fix-top sticky-content">
          <div className="container">
            <div className="header-left">
              <MainMenu />
            </div>
          </div>
        </div>
      </div>

      <div className="bottom-search d-sm-show">
        <SearchBox />
      </div>
    </header>
  );
}

function mapStateToProps(state) {
  return {
    auth: !!state.user.data,
  };
}

export default connect(mapStateToProps, {
  openLogin: modalActions.openLoginModal,
})(Header);
