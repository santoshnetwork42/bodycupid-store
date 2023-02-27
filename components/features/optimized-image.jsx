import React, { useEffect, useMemo, useRef } from "react";

const OptimizedImage = ({ optimizedData, alt, spanAttributes, ...props }) => {
  const { originalUrl, placeholder, width, height } = optimizedData;
  const imageRef = useRef(null);

  const fetchImage = async () => {
    window.imagesReplaced = true;
    const image = new Image();
    image.src = originalUrl;
    image.width = width;
    image.height = height;
    image.alt = alt;
    image.addEventListener("load", (e) => {
      if (!imageRef.current) return;
      imageRef.current.innerHTML = "";
      imageRef.current.replaceWith(image);
    });
  };

  useEffect(() => {
    if (document.readyState === "loading") {
      window.addEventListener("load", () => {
        setTimeout(() => {
          fetchImage();
        }, 400);
      });
    } else {
      fetchImage();
    }
  }, []);

  return (
    <span {...spanAttributes}>
      <img
        {...props}
        src={placeholder || originalUrl}
        ref={imageRef}
        width={width}
        height={height}
        alt={alt}
      />
    </span>
  );
};

export default OptimizedImage;
