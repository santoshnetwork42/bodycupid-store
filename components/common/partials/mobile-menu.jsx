import React, { useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { Auth } from "aws-amplify";
import { connect } from "react-redux";
import { useMenu } from "@wow-star/utils";

import ALink from "~/components/features/custom-link";
import { Cross } from "~/components/icons";
import Card from "~/components/features/accordion/card";
import { modalActions } from "~/store/modal";
import { eventActions } from "~/store/events";
import Image from "~/components/image";

function MobileMenu({ user, logout, openPasswordLess, topNavbarClicked }) {
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
    return false;
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
      "Customer ID": user?.id,
      URL: window.location.href,
    });
    await Auth.signOut();
    router.push("/");
  }, []);

  return (
    <div className="mobile-menu-wrapper">
      <div className="mobile-menu-overlay" onClick={hideMobileMenu}></div>

      <a className="mobile-menu-close" href="#" onClick={hideMobileMenu}>
        <i>
          <Cross color="#000" />
        </i>
      </a>

      <div className="mobile-menu-container scrollable pr-0">
        <div className="pt-2 pb-2 pl-3 pr-3">
          <div className="pt-0 pb-0 d-flex align-items-center">
            <ALink href="/" className="logo-footer">
              <NextImage
                src="/images/logo.png"
                loading="eager"
                alt="logo"
                height={70}
                width={70}
                objectFit="contain"
                loader="local"
              />
            </ALink>
          </div>
        </div>
        <div className="div-menu">
          <ul className="mobile-menu mmenu-anim">
            <li>
              {menu
                ?.filter((item) => item.parentId === null)
                .map((item, index) => (
                  <div key={item?.label}>
                    <Card
                      title={item.label}
                      type="mobile"
                      onLinkClick={(e) => {
                        hideMobileMenu(e);
                        topNavbarClicked({
                          banner_name: item.label,
                          item_id: index + 1,
                          Source: "Mobile",
                          "Section Name": "Mobile Navbar",
                        });
                      }}
                      url={item.link}
                      hideDropDown={!item?.menus.items?.length}
                    >
                      <ul>
                        {item?.menus.items?.map((subItem) => (
                          <li key={`${item.label}-${subItem.label}`}>
                            <ALink
                              href={subItem.link}
                              onClick={(e) => {
                                hideMobileMenu(e);
                                topNavbarClicked({
                                  banner_name: subItem.label,
                                  item_id: null,
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
                <a
                  href={"#"}
                  onClick={() => {
                    openPasswordLess();
                    hideMobileMenu();
                    return false;
                  }}
                >
                  Login
                </a>
              </li>
            )}
            {!!user && (
              <>
                <li>
                  <ALink href="/pages/account">My Account</ALink>

                  <a href="#" onClick={handleLogout}>
                    Logout
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
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
