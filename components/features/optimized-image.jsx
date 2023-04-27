import React, { useEffect, useMemo, useRef } from "react";

const OptimizedImage = ({
  optimizedData,
  src,
  alt,
  spanAttributes,
  resize = true,
  ...props
}) => {
  const { originalUrl = src, placeholder, width, height } = optimizedData || {};
  const imageRef = useRef(null);

  const fetchImage = async () => {
    const { width: imageWidth } = imageRef.current?.getBoundingClientRect();
    if (!imageWidth) return;

    window.imagesReplaced = true;
    const image = new Image();
    image.src = originalUrl;

    if (resize) {
      image.src = `${originalUrl}?resize=${imageWidth.toFixed(0)}`;
    }

    image.width = width;
    image.height = height;
    image.alt = alt;

    image.addEventListener("load", () => {
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
