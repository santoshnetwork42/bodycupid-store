import { useCallback } from "react";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { DotButton, useDotButton } from "./dot-button";

const EmblaCarousel = (props) => {
  const {
    children,
    options,
    hideControls,
    autoPlay,
    adClass,
    mainStyle,
    viewportStyle,
    containerStyle,
    ControlsStyle,
    controlsAbsolute,
  } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(
    options,
    autoPlay && [Autoplay()]
  );

  const onNavButtonClick = useCallback((emblaApi) => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;

    const resetOrStop =
      autoplay.options.stopOnInteraction === false
        ? autoplay.reset
        : autoplay.stop;

    resetOrStop();
  }, []);

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
    emblaApi,
    onNavButtonClick
  );

  return (
    <section className="embla" style={mainStyle}>
      <div className="embla__viewport" ref={emblaRef} style={viewportStyle}>
        <div className={`embla__container ${adClass}`} style={containerStyle}>
          {children}
        </div>
      </div>

      {!hideControls && (
        <div
          className={"embla__controls".concat(
            controlsAbsolute ? " embla__controls-absolute" : ""
          )}
          style={ControlsStyle}
        >
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
      )}
    </section>
  );
};

export default EmblaCarousel;
