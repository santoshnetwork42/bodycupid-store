import React, { useEffect, useRef, useState } from "react";
import { DownAngle, UpAngle } from "../icons";
export default function ReadMore({ children, position = "center" }) {
  const [read, setRead] = useState(false);
  const [isShowMore, setIsShowMore] = useState(false);

  const pref = useRef(null);

  useEffect(() => {
    if (pref.current?.clientHeight > 80) {
      pref.current.className = "overflow-ellipsis";
      setIsShowMore(true);
    } else {
      setIsShowMore(false);
    }
  }, []);

  const onChange = () => {
    if (!pref.current) return;
    setRead(!read);
    if (read) {
      pref.current.className = "overflow-ellipsis";
    } else {
      pref.current.className = "";
    }
  };

  return (
    <div>
      <div ref={pref}>{children}</div>
      <span
        className={` read-more  align-items-center justify-content-${position} text-underline cursor-pointer ${
          !isShowMore ? "d-none" : "d-flex"
        }`}
        onClick={onChange}
      >
        {!read ? (
          <>
            Read more <DownAngle size={14} color={"currentColor"} />
          </>
        ) : (
          <>
            Read less <UpAngle size={14} color={"currentColor"} />
          </>
        )}
      </span>
    </div>
  );
}
