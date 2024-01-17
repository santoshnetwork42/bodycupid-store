import { useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { connect } from "react-redux";
import dynamic from "next/dynamic";

import ALink from "~/components/features/custom-link";
import { User, Hamburger } from "~/components/icons";
import SearchBox from "~/components/common/partials/search-box";
import { headerBorderRemoveList } from "~/utils/data/menu";
import { modalActions } from "~/store/modal";

const CartMenu = dynamic(
  () => import("~/components/common/partials/cart-menu"),
  { ssr: false }
);

const MainMenu = dynamic(
  () => import("~/components/common/partials/main-menu"),
  { ssr: false }
);

function Header({ navbar, auth, openPasswordLess, setCartVisibility }) {
  const router = useRouter();
  const { cart } = router.query;

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

  useEffect(() => {
    if (cart === "1") {
      setCartVisibility(true);
    }
  }, [cart]);

  return (
    <header className="header header-border">
      <div className="fix-top sticky-content">
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
                <Image
                  src="/images/logo.png"
                  alt="logo"
                  width={100}
                  height={100}
                  quality={100}
                  priority
                  objectFit="contain"
                />
              </ALink>

              <SearchBox />
            </div>

            <div className="header-right">
              {/* <ALink href="/pages/wishlist" className="wishlist  mr-3 ">
                <Heart />
              </ALink>
              <span className="divider"></span> */}
              {!navbar?.hideSearch && (
                <div className="d-sm-show search-container mr-2">
                  <SearchBox type="icon" />
                </div>
              )}
              {!!auth && (
                <ALink href="/pages/account" className="account wishlist mr-2">
                  <User />
                </ALink>
              )}
              {!auth && (
                <ALink
                  href="#"
                  className="label-block wishlist mr-1"
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
              {!navbar?.hideCart && <CartMenu />}
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
  setCartVisibility: modalActions.setCartVisibility,
})(Header);
