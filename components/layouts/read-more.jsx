import React, { useState } from "react";

import { DownAngle, UpAngle } from "~/components/icons";

export default function ReadMore({
  content,
  maxCharacterCount = 300,
  position = "center",
}) {
  const text = content;
  const [isTruncated, setIsTruncated] = useState(true);

  const resultString =
    isTruncated && text ? `${text.slice(0, maxCharacterCount)}...` : text;

  function toggleIsTruncated() {
    setIsTruncated(!isTruncated);
  }

  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: resultString }} />

      <div
        onClick={toggleIsTruncated}
        className={`mt-1 d-flex align-items-center justify-content-${position} text-underline cursor-pointer`}
      >
        {text.length > maxCharacterCount &&
          (!isTruncated ? (
            <>
              Read less
              <UpAngle size={14} color={"currentColor"} />
            </>
          ) : (
            <>
              Read more
              <DownAngle size={14} color={"currentColor"} />
            </>
          ))}
      </div>
    </div>
  );
}
