import { useEffect } from "react";
import { connect } from "react-redux";

import ALink from "~/components/features/custom-link";
import { Cross } from "~/components/icons";
import Image from "~/components/image";
import SocialIcons from "~/components/social-icons";

function BlogMobileMenu({ store, menuItems }) {
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

  return (
    <div className="mobile-menu-wrapper blog">
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
              <Image
                src="/images/wow-logo.webp"
                loading="eager"
                alt="logo"
                height={60}
                width={80}
                objectFit="contain"
                loader="local"
              />
            </ALink>
          </div>
        </div>
        <div className="div-menu">
          <ul className="mobile-menu mmenu-anim">
            <li>
              {menuItems
                .filter((m) => m.path !== "/web-stories")
                .map((item, index) => (
                  <div key={index}>
                    <ALink
                      href={`/blog${item.path === "/" ? "" : item.path}`}
                      className="mobile-menu-link"
                      onClick={hideMobileMenu}
                    >
                      {item.label}
                    </ALink>
                  </div>
                ))}
            </li>
          </ul>
        </div>
      </div>
      <div className="mobile-menu-icons">
        <div className="d-flex flex-row justify-content-center align-items-center">
          <SocialIcons store={store} fillColor={"#808080"} />
        </div>
      </div>
    </div>
  );
}

// export default BlogMobileMenu;

function mapStateToProps(state) {
  return {
    store: state.system.store,
  };
}

export default connect(mapStateToProps)(BlogMobileMenu);
