import { useEffect, useState } from "react";
import { connect } from "react-redux";
import NextImage from "next/image";
import imagesLoaded from "imagesloaded";
import { API, graphqlOperation } from "aws-amplify";

import { getQuickViewProduct } from "~/graphql/api";
import OwlCarousel from "~/components/features/owl-carousel";
import DetailOne from "~/components/partials/product/detail/detail-one";
import { modalActions } from "~/store/modal";
import { mainSlider3 } from "~/utils/data/carousel";
import { getPublicImageURL } from "~/utils/getPublicImageUrl";
import Modal from "~/components/common/modal";

function Quickview(props) {
  const { slug, closeQuickview, isOpen } = props;

  if (!isOpen) return <div></div>;

  const [loaded, setLoadingState] = useState(false);
  const [product, setProduct] = useState(null);
  const [variant, setVariant] = useState(null);

  useEffect(() => {
    if (slug) {
      setProduct(null);
      (async function () {
        const {
          data: {
            byslugProduct: {
              items: [response],
            },
          },
        } = await API.graphql(
          graphqlOperation(getQuickViewProduct, {
            slug,
            variantFilter: { status: { eq: "ENABLED" } },
          })
        );
        setProduct(response);
        setVariant(response.variants.items[0]?.id);
      })();
    }
  }, [slug]);

  useEffect(() => {
    setTimeout(() => {
      if (product && isOpen && document.querySelector(".quickview-modal"))
        imagesLoaded(".quickview-modal")
          .on("done", function () {
            setLoadingState(true);
            window
              .jQuery(".quickview-modal .product-single-carousel")
              .trigger("refresh.owl.carousel");
          })
          .on("progress", function () {
            setLoadingState(false);
          })
          .on("fail", function () {
            setLoadingState(true);
          });
    }, 200);
  }, [product, isOpen]);

  if (!slug || !product) return "";

  const closeQuick = () => {
    document.querySelector(".ReactModal__Overlay").classList.add("removed");
    document.querySelector(".quickview-modal").classList.add("removed");
    setLoadingState(false);
    setTimeout(() => {
      closeQuickview();
    }, 330);
  };

  const discount = !!(product && product.listingPrice && product.price)
    ? parseInt(
        ((product.listingPrice - product.price) * 100) / product.listingPrice,
        10
      )
    : 0;

  let lgImages = product?.images.items || [];
  if (product?.variants.items.length > 0) {
    lgImages.push(
      ...product.variants.items.map((i) => ({
        variantId: i.id,
        imageKey: i.imageUrl,
        alt: i.alt || i.title,
      }))
    );
  }

  return (
    <Modal
      isOpen={isOpen}
      contentLabel="QuickView"
      onRequestClose={closeQuick}
      shouldFocusAfterRender={false}
      className="product product-single row product-popup quickview-modal"
      id="product-quickview"
    >
      <div className={`row p-0 m-0 ${loaded ? "" : "d-none"}`}>
        <div className="col-md-6">
          <div className="product-gallery mb-md-0 pb-0">
            <div className="product-label-group">
              {discount > 0 &&
                (product?.variants.items.length === 0 ? (
                  <label className="product-label label-sale">
                    {discount}% OFF
                  </label>
                ) : (
                  <label className="product-label label-sale">Sale</label>
                ))}
            </div>

            <OwlCarousel
              adClass="product-single-carousel owl-theme owl-nav-inner"
              options={mainSlider3}
            >
              {lgImages.map((item) => (
                <NextImage
                  key={item.id}
                  src={getPublicImageURL(item.imageKey)}
                  imageAlt={item.alt}
                  height={500}
                  width={500}
                  objectFit="contain"
                  priority
                  loading="eager"
                />
              ))}
            </OwlCarousel>
          </div>
        </div>

        <div className="col-md-6">
          {product && (
            <DetailOne
              data={product}
              adClass="scrollable"
              isNav={false}
              variantId={variant}
              setVariant={setVariant}
            />
          )}
        </div>
      </div>
      {!loaded && (
        <div className="product row p-0 m-0 skeleton-body mfp-product">
          <div className="col-md-6">
            <div className="skel-pro-gallery"></div>
          </div>

          <div className="col-md-6">
            <div className="skel-pro-summary"></div>
          </div>
        </div>
      )}
    </Modal>
  );
}

function mapStateToProps(state) {
  return {
    slug: state.modal.singleSlug,
    isOpen: state.modal.quickview,
  };
}

export default connect(mapStateToProps, {
  closeQuickview: modalActions.closeQuickview,
})(Quickview);
