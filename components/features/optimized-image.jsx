import React, { useEffect, useRef } from "react";

const OptimizedImage = ({ placeholder, url, ...props }) => {
  const imageRef = useRef(null);

  const fetchImage = async () => {
    const image = new Image();
    image.src = url;

    image.addEventListener("load", (e) => {
      if (!imageRef.current) return;

      imageRef.current.innerHTML = "";
      imageRef.current.replaceWith(image);
    });
  };

  useEffect(() => {
    setTimeout(() => {
      fetchImage();
    }, 400);
  }, []);

  return <img {...props} src={placeholder} ref={imageRef} alt="" />;
};

export default OptimizedImage;
