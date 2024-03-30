import { API, graphqlOperation } from "aws-amplify";
import { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import NextImage from "~/components/image";

import Modal from "~/components/common/modal";
import OwlCarousel from "~/components/features/owl-carousel";
import DetailOne from "~/components/partials/product/detail/detail-one";
import { getQuickViewProduct } from "~/graphql/api";
import { modalActions } from "~/store/modal";
import { mainSlider3 } from "~/utils/data/carousel";

function Quickview(props) {
  const { slug, closeQuickview, isOpen } = props;

  if (!isOpen) return <div></div>;

  const [product, setProduct] = useState(null);
  const [variant, setVariant] = useState(null);

  useEffect(() => {
    if (slug && isOpen) {
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
        setVariant(response?.variants?.items[0]?.id);
      })();
    }
  }, [slug, isOpen]);

  // useEffect(() => {
  //   document.body.classList.add("overflow-hidden");

  //   return () => {
  //     document.body.classList.remove("overflow-hidden");
  //   };
  // }, [isOpen]);

  const closeQuick = () => {
    document.querySelector(".ReactModal__Overlay").classList.add("removed");
    document.querySelector(".quickview-modal").classList.add("removed");
    setTimeout(() => {
      closeQuickview();
      setProduct(null);
      setVariant(null);
    }, 330);
  };

  const discount = !!(product && product.listingPrice && product.price)
    ? parseInt(
        ((product.listingPrice - product.price) * 100) / product.listingPrice,
        10
      )
    : 0;

  const lgImages = useMemo(() => {
    if (product) {
      const images = [...product?.images?.items];
      images?.sort((a, b) => a.position - b.position);
      if (product?.variants?.items?.length > 0) {
        product.variants.items.forEach((variant) => {
          variant.images.items.forEach((item) => {
            images.push({
              ...item,
              variantId: variant.id,
              imageKey: item.imageKey,
            });
          });
        });
      }
      return images;
    }
  }, [product]);

  if (!slug) return <></>;

  return (
    <Modal
      isOpen={isOpen}
      contentLabel="QuickView"
      onRequestClose={closeQuick}
      shouldFocusAfterRender={false}
      className="product product-single row product-popup quickview-modal"
      id="product-quickview"
    >
      <div className={`row p-0 m-0 ${!!product ? "" : "d-none"}`}>
        <div className="col-md-6">
          <div className="product-gallery mb-md-0 pb-0">
            <div className="product-label-group">
              {
                discount > 0 && (
                  // (product?.variants.items.length === 0 ? (
                  <label className="product-label label-sale">
                    {discount}% OFF
                  </label>
                )
                // ) : (
                //   <label className="product-label label-sale">Sale</label>
                // ))
              }
            </div>

            <OwlCarousel
              adClass="product-single-carousel owl-theme owl-nav-inner"
              options={mainSlider3}
            >
              {lgImages?.map((item) => (
                <NextImage
                  key={item.id}
                  src={item.imageKey}
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
              adClass="scrollable mb-10 wrapper-btn"
              isNav={false}
              variantId={variant}
              setVariant={setVariant}
              isQuickView={true}
            />
          )}
        </div>
      </div>
      {!product && (
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
