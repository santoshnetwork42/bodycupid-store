import { useEffect } from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";

import ALink from "~/components/features/custom-link";
import CartMenu from "~/components/common/partials/cart-menu";
import MainMenu from "~/components/common/partials/main-menu";
import SearchBox from "~/components/common/partials/search-box";
import { headerBorderRemoveList } from "~/utils/data/menu";
import { modalActions } from "~/store/modal";

function Header({ auth, openLogin }) {
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
      <div className="header-middle sticky-header fix-top sticky-content">
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
              <img src="/images/logo.png" alt="logo" width="153" height="44" />
            </ALink>

            <SearchBox />
          </div>

          <div className="header-right">
            <ALink href="tel:#" className="icon-box icon-box-side">
              <div className="icon-box-icon mr-0 mr-lg-2">
                <i className="d-icon-phone"></i>
              </div>
              <div className="icon-box-content d-lg-show">
                <h4 className="icon-box-title">Call Us Now:</h4>
                <p>8042896000</p>
              </div>
            </ALink>
            <span className="divider"></span>
            <ALink href="/pages/wishlist" className="wishlist">
              <i className="d-icon-heart"></i>
            </ALink>
            <span className="divider"></span>

            <CartMenu />
            <span className="divider"></span>
            {!!auth && (
              <ALink href="/pages/account" className="account d-lg-show">
                <i className="d-icon-user"></i>
              </ALink>
            )}
            {!auth && (
              <ALink
                href="#"
                className="login-link label-block d-lg-show"
                onClick={() => openLogin()}
              >
                <i className="d-icon-user"></i>
              </ALink>
            )}
          </div>
        </div>
      </div>

      <div className="header-bottom d-lg-show">
        <div className="container">
          <div className="header-left">
            <MainMenu />
          </div>
        </div>
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
