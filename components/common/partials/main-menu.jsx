import React from "react";
import { useRouter } from "next/router";

import ALink from "~/components/features/custom-link";
import { DownAngle } from "~/components/icons";

import { getSplitedArray } from "~/utils/helper";
import { useMenu } from "~/utils/contexts/navbar";

function MainMenu() {
  const { pathname } = useRouter();

  const menu = useMenu();
  return (
    <nav className="main-nav">
      <ul className="menu">
        {menu.map((item) => (
          <li
            key={item.slug}
            className={`${pathname.includes(item.link) ? "active" : ""} ${
              item?.subMenu?.length ? "submenu" : ""
            }
            `}
          >
            <ALink className="text-uppercase" href={item.link}>
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
                  {getSplitedArray(item?.subMenu, 10).map((cat, i) => (
                    <ul key={`cat-${i}`}>
                      {cat.map((subItem) => (
                        <li key={`sub-categories-${subItem.slug}`}>
                          <ALink className="cat-name" href={subItem.link}>
                            {subItem.label}
                          </ALink>
                        </li>
                      ))}
                    </ul>
                  ))}
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default React.memo(MainMenu);
