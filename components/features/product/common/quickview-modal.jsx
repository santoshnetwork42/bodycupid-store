import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Magnifier } from "react-image-magnifiers";
import Modal from "react-modal";
import imagesLoaded from "imagesloaded";
import { API, graphqlOperation } from "aws-amplify";

import { getQuickViewProduct } from "~/graphql/api";
import OwlCarousel from "~/components/features/owl-carousel";
import DetailOne from "~/components/partials/product/detail/detail-one";
import { modalActions } from "~/store/modal";
import { mainSlider3 } from "~/utils/data/carousel";
import { getPublicImageURL } from "~/utils/getPublicImageUrl";

const customStyles = {
  content: {
    position: "relative",
  },
  overlay: {
    background: "rgba(0,0,0,.4)",
    zIndex: "10000",
    overflowX: "hidden",
    overflowY: "auto",
  },
};

Modal.setAppElement("#__next");

function Quickview(props) {
  const { slug, closeQuickview, isOpen } = props;

  if (!isOpen) return <div></div>;

  const [loaded, setLoadingState] = useState(false);
  const [product, setProduct] = useState(null);

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
        } = await API.graphql(graphqlOperation(getQuickViewProduct, { slug }));
        setProduct(response);
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

  return (
    <Modal
      isOpen={isOpen}
      contentLabel="QuickView"
      onRequestClose={closeQuick}
      shouldFocusAfterRender={false}
      style={customStyles}
      className="product product-single row product-popup quickview-modal"
      id="product-quickview"
    >
      <>
        <div className={`row p-0 m-0 ${loaded ? "" : "d-none"}`}>
          <div className="col-md-6">
            <div className="product-gallery mb-md-0 pb-0">
              <div className="product-label-group">
                {product?.isNew && (
                  <label className="product-label label-new">New</label>
                )}
                {product?.isFeatured && (
                  <label className="product-label label-top">Top</label>
                )}
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
                {product?.images.items.map((item) => (
                  <Magnifier
                    key={item.id}
                    imageSrc={getPublicImageURL(item.imageKey)}
                    imageAlt={item.alt}
                    largeImageSrc={getPublicImageURL(item.imageKey)}
                    dragToMove={false}
                    mouseActivation="hover"
                    cursorStyleActive="crosshair"
                    className="product-image large-image"
                  />
                ))}
              </OwlCarousel>
            </div>
          </div>

          <div className="col-md-6">
            {product && (
              <DetailOne
                data={product}
                adClass="scrollable pr-3"
                isNav={false}
              />
            )}
          </div>
        </div>

        <button
          title="Close (Esc)"
          type="button"
          className="mfp-close p-0"
          onClick={closeQuick}
        >
          <span>×</span>
        </button>
      </>
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
