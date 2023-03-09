import { useState, useEffect, useMemo } from "react";

import ALink from "~/components/features/custom-link";
import OwlCarousel from "~/components/features/owl-carousel";

import ThumbOne from "~/components/partials/product/thumb/thumb-one";
import ThumbTwo from "~/components/partials/product/thumb/thumb-two";
import MediaLightBox from "~/components/partials/product/light-box";
import OptimizedImage from "~/components/features/optimized-image";

import { mainSlider3 } from "~/utils/data/carousel";
import { getPublicImageURL } from "~/utils/getPublicImageUrl";

export default function MediaOne(props) {
  const { product, variantId } = props;
  const [index, setIndex] = useState(0);
  const [isOpen, setOpenState] = useState(false);
  const [mediaRef, setMediaRef] = useState(null);

  const lgImages = useMemo(() => {
    const images = [...product.images.items];
    if (product.variants.items.length > 0) {
      images.push(
        ...product.variants.items.map((i) => ({
          variantId: i.id,
          imageKey: i.imageUrl,
          alt: i.alt || i.title,
        }))
      );
    }
    return images;
  }, [product]);

  useEffect(() => {
    setIndex(0);
  }, [window.location.pathname]);

  useEffect(() => {
    if (variantId) {
      const i = lgImages.findIndex((img) => img.variantId === variantId);
      if (i > -1) {
        setIndex(i);
      }
    }
  }, [variantId]);

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

  const changeOpenState = (openState) => {
    setOpenState(openState);
  };

  const openLightBox = () => {
    setOpenState(true);
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

  const discount = !!(product.listingPrice && product.price)
    ? parseInt(
        ((product.listingPrice - product.price) * 100) / product.listingPrice,
        10
      )
    : 0;

  return (
    <>
      <div
        className="product-gallery pg-vertical media-default"
        style={{ top: "88px" }}
      >
        <div className="product-label-group">
          {product.inventory === 0 && (
            <label className="product-label label-out">out</label>
          )}

          {product.isFeatured && (
            <label className="product-label label-top">top</label>
          )}

          {product.isFeatured && (
            <label className="product-label label-new">new</label>
          )}

          {!!discount && (
            <label className="product-label label-sale">sale</label>
          )}
        </div>

        <OwlCarousel
          adClass="product-single-carousel owl-theme owl-nav-inner"
          options={mainSlider3}
          onChangeIndex={setIndexHandler}
          onChangeRef={changeRefHandler}
          events={events}
        >
          {lgImages.map((image, i) => (
            <div key={i}>
              <OptimizedImage
                optimizedData={image.image}
                alt={image.alt}
                spanAttributes={{
                  className: "product-image-hover",
                }}
                src={getPublicImageURL(image.imageKey)}
              />
              {/* <Magnifier
                imageSrc={getPublicImageURL(image.imageKey)}
                imageAlt={image.alt}
                largeImageSrc={getPublicImageURL(image.imageKey)}
                dragToMove={false}
                cursorStyleActive="crosshair"
                className="product-image large-image"
              /> */}
            </div>
          ))}
        </OwlCarousel>

        <ALink href="#" className="product-image-full" onClick={openLightBox}>
          <i className="d-icon-zoom"></i>
        </ALink>

        <ThumbOne
          images={lgImages}
          index={index}
          onChangeIndex={setIndexHandler}
        />
        <ThumbTwo
          images={lgImages}
          index={index}
          onChangeIndex={setIndexHandler}
        />
      </div>

      <MediaLightBox
        images={lgImages}
        isOpen={isOpen}
        changeOpenState={changeOpenState}
        index={index}
        product={product}
      />
    </>
  );
}
