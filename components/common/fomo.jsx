import Image from "~/components/image";
import { useFomo } from "~/utils/contexts/fomoContext"; // Import the custom hook
import { Close } from "../icons";
import ALink from "~/components/features/custom-link";

const Fomo = () => {
  const { isVisible, products, currentProductIndex, handleManualHide } =
    useFomo();

  const currentProduct = products[currentProductIndex];

  
  if (!currentProduct) {
    return null;
  }

  return (
    <div className={`fomo-wrapper ${isVisible ? "visible" : "hidden"}`}>
      <div className="d-flex gap-8 fomo-inner-wrapper">
        <>
          <Image
            src={
              currentProduct?.images?.items?.length
                ? currentProduct.images.items[0]?.imageKey
                : ""
            }
            loading="eager"
            alt="product-logo"
            height={60}
            width={80}
            objectFit="contain"
          />
          <div className="d-flex-col gap-2 fomo-msg-wrapper">
            <p className="mb-0 font-weight-bolder product-title-overflow-hidden">
              Someone just ordered:&nbsp;
              <ALink href={`/products/` + currentProduct.slug} className="">
                {currentProduct.title}
              </ALink>
            </p>
            <p className="mb-0">Don't miss out. This offer ends soon.</p>
            <div className="close-icon-wrapper" onClick={handleManualHide}>
              <Close size={18} />
            </div>
          </div>
        </>
      </div>
    </div>
  );
};

export default Fomo;
