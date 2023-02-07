import React, { useEffect, useMemo, useRef } from "react";

const OptimizedImage = ({ optimizedData, alt, ...props }) => {
  const { originalUrl, placeholder, width, height } = optimizedData;
  const imageRef = useRef(null);

  const fetchImage = async () => {
    const image = new Image();
    image.src = originalUrl;

    image.width = width;
    image.height = height;

    image.addEventListener("load", (e) => {
      if (!imageRef.current) return;
      imageRef.current.innerHTML = "";
      imageRef.current.replaceWith(image);
    });
  };

  useEffect(() => {
    setTimeout(() => {
      fetchImage();
    }, 1200);
  }, []);

  return (
    <img
      {...props}
      src={placeholder}
      ref={imageRef}
      width={width}
      height={height}
      alt={alt}
    />
  );
};

export default OptimizedImage;
