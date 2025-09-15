import React from "react";
import { useAppRouter } from "~/utils/navigation";
import { useMenu } from "@wow-star/utils";

import ALink from "~/components/features/custom-link";
import { DownAngle } from "~/components/icons";

import { connect } from "react-redux";
import { eventActions } from "~/store/events";

function MainMenu({ topNavbarClicked }) {
  const { pathname } = useAppRouter();

  const menu = useMenu();

  return (
    <nav className="main-nav">
      <ul className="menu">
        {menu
          ?.filter((item) => item.parentId === null)
          .map((item, index) => (
            <li
              key={item.link}
              className={`${pathname.includes(item.link) ? "active" : ""} ${
                item?.menus?.items.length ? "submenu" : ""
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
                {!!item?.menus.items?.length && (
                  <i>
                    <DownAngle color="currentColor" size={12} />
                  </i>
                )}
              </ALink>

              {!!item?.menus.items?.length && (
                <div className="megamenu">
                  <div className="d-flex">
                    <ul>
                      {item?.menus.items.map((subItem) => (
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
