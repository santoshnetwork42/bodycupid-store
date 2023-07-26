import { useState, useEffect, useMemo } from "react";
// import { Magnifier } from "react-image-magnifiers";
import Image from "next/image";

import ALink from "~/components/features/custom-link";
import { Share } from "~/components/icons";
import OwlCarousel from "~/components/features/owl-carousel";

import ThumbOne from "~/components/partials/product/thumb/thumb-one";

import { mainSlider3 } from "~/utils/data/carousel";
import { getPublicImageURL } from "~/utils/getPublicImageUrl";
import { copyText } from "~/utils/helper";

export default function MediaOne(props) {
  const { product, variantId } = props;
  const [index, setIndex] = useState(0);
  const [mediaRef, setMediaRef] = useState(null);

  const lgImages = useMemo(() => {
    const images = [...product.images.items];
    images.sort((a, b) => a.position - b.position);
    if (product.variants.items.length > 0) {
      product.variants.items.forEach((i) => {
        images.push({
          ...i,
          variantId: i.id,
          imageKey: i.imageUrl,
          alt: i.alt || i.title,
        });
      });
    }
    return images;
  }, [product]);

  useEffect(() => {
    setIndex(0);
  }, [product?.slug]);

  useEffect(() => {
    if (variantId) {
      const i = lgImages.findIndex((img) => img.variantId === variantId);
      if (i > -1) {
        setIndex(i);
      }
    }
  }, [variantId, lgImages]);

  useEffect(() => {
    if (mediaRef !== null && mediaRef.current !== null && index >= 0) {
      mediaRef.current.$car.to(index, 300, true);
    }
  }, [index]);

  const setIndexHandler = (mediaIndex) => {
    if (mediaIndex !== index) {
      setIndex(mediaIndex);
    }
  };

  const changeRefHandler = (carRef) => {
    if (carRef.current !== undefined) {
      setMediaRef(carRef);
    }
  };

  let events = {
    onTranslate: function (e) {
      if (!e.target) return;
      if (document.querySelector(".product-thumbs")) {
        document
          .querySelector(".product-thumbs")
          .querySelector(".product-thumb.active")
          .classList.remove("active");
        document
          .querySelector(".product-thumbs")
          .querySelectorAll(".product-thumb")
          [e.item.index].classList.add("active");
      }
    },
  };

  return (
    <div
      className="product-gallery pg-vertical media-default"
      style={{ top: "88px" }}
    >
      <OwlCarousel
        adClass="product-single-carousel owl-theme owl-nav-inner"
        options={mainSlider3}
        onChangeIndex={setIndexHandler}
        onChangeRef={changeRefHandler}
        events={events}
      >
        {lgImages.map((image) => (
          <div key={image.imageKey}>
            <Image
              src={getPublicImageURL(image.imageKey)}
              priority
              height={480}
              width={480}
              quality={95}
              objectFit="contain"
              className="product-image large-image"
            />
          </div>
        ))}
      </OwlCarousel>

      <ALink href="#" className="product-image-full">
        <span
          onClick={() => {
            copyText(window.location.href, "Product link copied!");
          }}
        >
          <Share size={44} />
        </span>
      </ALink>
      <ThumbOne
        images={lgImages}
        index={index}
        onChangeIndex={setIndexHandler}
      />
    </div>
  );
}
