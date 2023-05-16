import React from "react";

import ALink from "~/components/features/custom-link";
import { DownAngle, RightAngle } from "~/components/icons";

import SlideToggle from "react-slide-toggle";

export default function Card(props) {
  const {
    title,
    expanded = false,
    adClass,
    iconClass,
    type = "normal",
    url,
    onLinkClick = () => {},
    id,
    hideDropDown,
    ...restProps
  } = props;

  return "normal" === type ? (
    <SlideToggle {...restProps} collapsed={expanded ? false : true}>
      {({ onToggle, setCollapsibleElement, toggleState }) => (
        <div className={`card ${adClass}`}>
          <div id={id} className={`card-header`} onClick={onToggle}>
            <ALink
              onClick={onLinkClick}
              href="#"
              className={`toggle-button ${toggleState.toLowerCase()}`}
            >
              {iconClass ? <i className={iconClass}></i> : ""}
              {title ? title : ""}
              {!hideDropDown && (
                <i className="icon">
                  <DownAngle size={12} color="currentColor" />
                </i>
              )}
            </ALink>
          </div>

          <div ref={setCollapsibleElement}>
            <div className="card-body overflow-hidden">{props.children}</div>
          </div>
        </div>
      )}
    </SlideToggle>
  ) : "parse" === type ? (
    <SlideToggle collapsed={expanded ? false : true}>
      {({ onToggle, setCollapsibleElement, toggleState }) => (
        <>
          <ALink
            href={url ? url : "#"}
            content={title}
            className={`parse-content ${toggleState.toLowerCase()}`}
            onClick={(e) => {
              onToggle();
            }}
          ></ALink>

          <div ref={setCollapsibleElement} className="overflow-hidden">
            {props.children}
          </div>
        </>
      )}
    </SlideToggle>
  ) : (
    <SlideToggle collapsed={expanded ? false : true}>
      {({ onToggle, setCollapsibleElement, toggleState }) => (
        <>
          <ALink onClick={onLinkClick} href={url ? url : "#"}>
            {title}
            <span
              className={`toggle-btn ${toggleState.toLowerCase()}`}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onToggle();
              }}
            >
              {!hideDropDown &&
                (["expanded", "expanding"].includes(
                  toggleState.toLowerCase()
                ) ? (
                  <DownAngle size={12} color="currentColor" />
                ) : (
                  <RightAngle size={12} color="currentColor" />
                ))}
            </span>
          </ALink>

          <div ref={setCollapsibleElement} className="overflow-hidden">
            {props.children}
          </div>
        </>
      )}
    </SlideToggle>
  );
  return "";
}
