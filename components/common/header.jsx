import { useEffect } from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";

import ALink from "~/components/features/custom-link";
import { User, Hamburger } from "~/components/icons";
import CartMenu from "~/components/common/partials/cart-menu";
import MainMenu from "~/components/common/partials/main-menu";
import SearchBox from "~/components/common/partials/search-box";
import { headerBorderRemoveList } from "~/utils/data/menu";
import { modalActions } from "~/store/modal";
import OptimizedImage from "~/components/features/optimized-image";

function Header({ navbar, auth, openPasswordLess }) {
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
      <div className="sticky-header fix-top sticky-content">
        <div className="header-middle">
          <div className="container">
            <div className="header-left">
              <ALink
                href="#"
                className="mobile-menu-toggle"
                onClick={showMobileMenu}
              >
                <Hamburger />
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
              {/* <ALink href="/pages/wishlist" className="wishlist  mr-3 ">
                <Heart />
              </ALink>
              <span className="divider"></span> */}
              {!!auth && (
                <ALink href="/pages/account" className="account wishlist mr-2">
                  <User />
                </ALink>
              )}
              {!auth && (
                <ALink
                  href="#"
                  className="label-block wishlist mr-2"
                  onClick={() => openPasswordLess(false)}
                >
                  <User />
                </ALink>
              )}
              {/* {!auth && (
                <ALink
                  href="/pages/login"
                  className='label-block wishlist d-sm-show'
                >
                  <User />
                </ALink>
              )} */}
              <span className="divider"></span>
              <CartMenu />
              {!navbar?.hideSearch && (
                <div className="d-sm-show search-container ">
                  <SearchBox type="icon" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="header-bottom d-lg-show  fix-top sticky-content">
        <div className="container">
          {!navbar?.hideMainMenu && (
            <div className="header-left justify-content-center">
              <MainMenu />
            </div>
          )}
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
  openPasswordLess: modalActions.openPasswordlessModal,
})(Header);
