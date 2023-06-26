import React, { useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { Auth } from "aws-amplify";
import { connect } from "react-redux";
import NextImage from "next/image";

import ALink from "~/components/features/custom-link";
import { Cross } from "~/components/icons";
import Card from "~/components/features/accordion/card";
import { modalActions } from "~/store/modal";
import { useMenu } from "~/utils/contexts/navbar";
import { eventActions } from "~/store/events";

function MobileMenu({ user,logout, openPasswordLess, topNavbarClicked }) {
  const router = useRouter();

  const menu = useMenu();

  useEffect(() => {
    window.addEventListener("resize", hideMobileMenuHandler);
    document.querySelector("body").addEventListener("click", onBodyClick);

    return () => {
      window.removeEventListener("resize", hideMobileMenuHandler);
      document.querySelector("body").removeEventListener("click", onBodyClick);
    };
  }, []);

  const hideMobileMenuHandler = () => {
    if (window.innerWidth > 991) {
      document.querySelector("body").classList.remove("mmenu-active");
    }
  };

  const hideMobileMenu = () => {
    document.querySelector("body").classList.remove("mmenu-active");
  };

  function onBodyClick(e) {
    if (e.target.closest(".header-search"))
      return (
        e.target.closest(".header-search").classList.contains("show-results") ||
        e.target.closest(".header-search").classList.add("show-results")
      );

    document.querySelector(".header-search.show") &&
      document.querySelector(".header-search.show").classList.remove("show");
    document.querySelector(".header-search.show-results") &&
      document
        .querySelector(".header-search.show-results")
        .classList.remove("show-results");
  }

  const handleLogout = useCallback(async () => {
    logout({
      "Customer ID":user.Id,
      URL:window.location.href
    })
    await Auth.signOut();
    router.push("/");
  }, []);

  return (
    <div className="mobile-menu-wrapper">
      <div className="mobile-menu-overlay" onClick={hideMobileMenu}></div>

      <ALink className="mobile-menu-close" href="#" onClick={hideMobileMenu}>
        <i>
          <Cross color="currentColor" />
        </i>
      </ALink>

      <div className="mobile-menu-container scrollable">
        <div className="pt-2 pb-1 d-flex align-items-center justify-content-center">
          <ALink href="/" className="logo-footer">
            <NextImage
              src="/images/logo.png"
              loading="eager"
              alt="logo"
              height={70}
              width={70}
              objectFit="contain"
            />
          </ALink>
        </div>
        <ul className="mobile-menu mmenu-anim">
          <li>
            {menu.map((item) => (
              <div key={item?.label}>
                <Card
                  title={item.label}
                  type="mobile"
                  onLinkClick={(e) => {
                    hideMobileMenu(e);
                    topNavbarClicked({
                      banner_name: item.label,
                      item_id: item.slug,
                      Source: "Mobile",
                      "Section Name": "Mobile Navbar",
                    });
                  }}
                  url={item.link}
                  hideDropDown={!item?.subMenu?.length}
                >
                  <ul>
                    {item?.subMenu?.map((subItem) => (
                      <li key={`${item.label}-${subItem.label}`}>
                        <ALink
                          href={subItem.link}
                          onClick={(e) => {
                            hideMobileMenu(e);
                            topNavbarClicked({
                              banner_name: subItem.label,
                              item_id: subItem.id,
                              Source: "Web",
                              "Section Name": "Top Navbar",
                            });
                          }}
                        >
                          {subItem.label}
                        </ALink>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            ))}
          </li>

          {!user && (
            <li>
              <ALink
                href={"#"}
                onClick={() => {
                  openPasswordLess();
                  hideMobileMenu();
                }}
              >
                Login
              </ALink>
            </li>
          )}
          {!!user && (
            <>
              <li>
                <ALink href="/pages/account">My Account</ALink>

                <ALink href={"/"} onClick={handleLogout}>
                  Logout
                </ALink>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    user: state.user.data,
  };
}

export default connect(mapStateToProps, {
  openPasswordLess: modalActions.openPasswordlessModal,
  topNavbarClicked: eventActions.topNavbarClicked,
  logout: eventActions.logout,
})(MobileMenu);
