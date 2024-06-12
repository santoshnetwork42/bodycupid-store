import { useState, useEffect, useCallback, memo } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "~/components/image";
import useWindowDimensions from "~/utils/getWindowDimension";
import { DotButton, useDotButton } from "./dot-button";

const ImageCarousel = (props) => {
  const { options, images } = props;
  const { isSmallSize: isMobile } = useWindowDimensions();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
    axis: "y",
    align: "start",
  });

  const onThumbClick = useCallback(
    (index) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();
    emblaMainApi.on("select", onSelect);
    emblaMainApi.on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);

  const onNavButtonClick = useCallback((emblaApi) => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;

    const resetOrStop =
      autoplay.options.stopOnInteraction === false
        ? autoplay.reset
        : autoplay.stop;

    resetOrStop();
  }, []);

  const { scrollSnaps, onDotButtonClick } = useDotButton(
    emblaMainApi,
    onNavButtonClick
  );

  return (
    <div
      className="embla"
      style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "auto 1fr",
        gap: "1rem",
      }}
    >
      {/* Thumb Image  */}

      <div className="embla-thumbs d-sm-none">
        <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
          <div className="embla-thumbs__container">
            {!!images?.length &&
              images.map((image, index) => (
                <ImageThumb
                  key={`thumb-${index}`}
                  onClick={() => onThumbClick(index)}
                  selected={index === selectedIndex}
                  image={image}
                  priority
                />
              ))}
          </div>
        </div>
      </div>

      <div>
        {/* Main Image  */}

        <div className="embla__viewport" ref={emblaMainRef}>
          <div className="embla__container" style={{ marginLeft: "-0.5rem" }}>
            {!!images?.length &&
              images.map((image, index) => (
                <div
                  key={`embla__slide-${index}`}
                  className="embla__slide"
                  style={{ paddingLeft: "1rem" }}
                >
                  <Image
                    src={image}
                    width={480}
                    height={480}
                    objectFit="contain"
                    priority={index === 0 || index === selectedIndex}
                  />
                </div>
              ))}
          </div>
        </div>

        {/* Dot buttons */}

        <div className="embla__controls">
          <div className="embla__dots">
            {scrollSnaps.map((_, index) => (
              <DotButton
                key={index}
                onClick={() => onDotButtonClick(index)}
                className={"embla__dot".concat(
                  index === selectedIndex ? " embla__dot--selected" : ""
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ImageCarousel);

export const ImageThumb = memo(({ selected, image, onClick, priority }) => {
  return (
    <div
      className={"embla-thumbs__slide".concat(
        selected ? " embla-thumbs__slide--selected" : ""
      )}
    >
      <button
        onClick={onClick}
        type="button"
        className="embla-thumbs__slide__button"
      >
        <Image
          src={image}
          height={120}
          width={120}
          objectFit="contain"
          priority={priority}
        />
      </button>
    </div>
  );
});
