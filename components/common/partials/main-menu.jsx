import React from "react";
import { useRouter } from "next/router";
import { useMenu } from "@wow-star/utils";

import ALink from "~/components/features/custom-link";
import { DownAngle } from "~/components/icons";

import { connect } from "react-redux";
import { eventActions } from "~/store/events";

function MainMenu({ topNavbarClicked }) {
  const { pathname } = useRouter();
  const menu = useMenu();

  return (
    <nav className="main-nav">
      <ul className="menu">
        {menu.map((item, index) => (
          <li
            key={item.link}
            className={`${pathname.includes(item.link) ? "active" : ""} ${
              item?.subMenu?.length ? "submenu" : ""
            }
            `}
          >
            <ALink
              className="text-uppercase"
              onClick={() => {
                topNavbarClicked({
                  banner_name: item.label,
                  item_id: index + 1,
                  Source: "Web",
                  "Section Name": "Top Navbar",
                });
              }}
              href={item.link}
            >
              {item.label}
              {!!item?.subMenu?.length && (
                <i>
                  <DownAngle color="currentColor" size={12} />
                </i>
              )}
            </ALink>

            {!!item?.subMenu?.length && (
              <div className="megamenu">
                <div className="d-flex">
                  <ul>
                    {item?.subMenu.map((subItem) => (
                      <li key={`sub-categories-${subItem.link}`}>
                        <ALink
                          className="cat-name"
                          onClick={() => {
                            topNavbarClicked({
                              banner_name: subItem.label,
                              item_id: null,
                              Source: "Web",
                              "Section Name": "Top Navbar",
                            });
                          }}
                          href={subItem.link}
                        >
                          {subItem.label}
                        </ALink>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default connect(null, {
  topNavbarClicked: eventActions.topNavbarClicked,
})(React.memo(MainMenu));
