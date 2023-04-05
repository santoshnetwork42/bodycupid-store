import React, { useCallback, useMemo, useState, useEffect } from "react";
import { connect } from "react-redux";
import { useSetState } from "react-use";
import { API, graphqlOperation } from "aws-amplify";
import { toast } from "react-toastify";
import Reveal from "react-awesome-reveal";

import { modalActions } from "~/store/modal";
import {
  createReview,
  getReviews,
  getReviewsAnalytics,
  searchProductFaqs,
} from "~/graphql/api";
import AlertPopup from "~/components/features/product/common/alert-popup";
import RatingStar from "../rating-star";
import Review from "../review";
import TokenPagination from "~/components/features/token-pagination";
import ProductSpecifications from "../product-specifications";
import Specifications from "~/lib/specifications.json";
import { fadeIn } from "~/utils/data/keyframes";
import Accordion from "~/components/features/accordion/accordion";
import Card from "~/components/features/accordion/card";
import { uploadImages } from "~/utils/imageupload";
import { getPublicImageURL } from "~/utils/getPublicImageUrl";
const reviewDefault = {
  rating: 5,
  comment: "",
  name: "",
  email: "",
  images: [],
};

function DescOne(props) {
  const { product, openModal, user, productFAQs, productReviews } = props;
  const {
    id,
    totalRatings,
    longDescription,
    brand,
    vendor,
    weight,
    weightUnit,
    video,
    title,
    rating,
  } = product;
  const {
    reviews: productReview,
    total: totalreview,
    nextToken,
  } = productReviews;
  const [reviewState, setReview] = useSetState({ ...reviewDefault });
  const [reviews, setReviews] = useState([...productReview]);
  const [total, setTotal] = useState(totalreview);
  const [showReview, setShowReview] = useState(!totalRatings);
  const [token, setToken] = useState(nextToken);
  const [loading, setLoading] = useState(false);
  const [reviewAnalytics, setReviewAnalytics] = useState([]);

  const getStarAnalytics = async () => {
    try {
      const {
        data: {
          searchReviews: {
            aggregateItems: [item],
          },
        },
      } = await API.graphql(
        graphqlOperation(getReviewsAnalytics, {
          filter: {
            productId: { eq: id },
          },
          aggregates: [
            {
              name: "perStartGrouping",
              type: "terms",
              field: "rating",
            },
          ],
        })
      );
      if (item) {
        const data = item.result.buckets
          .sort((a, b) => +a.key - +b.key)
          .reverse();
        setReviewAnalytics(data);
      }
    } catch (e) {
      console.log("e", e);
    }
  };

  const getProductReviews = useCallback(
    (reset) => {
      setLoading(true);
      API.graphql(
        graphqlOperation(getReviews, {
          filter: {
            productId: { eq: id },
          },
          sort: [{ field: "createdAt", direction: "desc" }],
          nextToken: reset ? null : token,
        })
      )
        .then(
          ({
            data: {
              searchReviews: { items: response, total, nextToken },
            },
          }) => {
            if (reset) {
              setReviews(response);
            } else {
              setReviews([...reviews, ...response]);
            }
            setToken(nextToken);
            setTotal(total);
            setLoading(false);
          }
        )
        .catch((err) => {
          setLoading(false);
          console.log("err", err);
        });
    },
    [product, token]
  );

  const getPer = (total, allReview) => {
    if (total && allReview) return Math.round((allReview * 100) / total);
    return 0;
  };

  const onPhotoChange = async (e) => {
    const files = [...e.target.files];
    if (files) {
      const urls = await Promise.all(
        files.map(async (element) => {
          const key = await uploadImages(element, "review");
          return key;
        })
      );
      setReview({
        ...reviewState,
        images: [...reviewState.images, ...urls],
      });
    }
  };

  const showVideoModalHandler = (e) => {
    e.preventDefault();
    let link = e.currentTarget.closest(".btn-play").getAttribute("data");
    openModal(link);
  };

  const submitReview = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        const { rating, comment, name, email, images } = reviewState;
        await API.graphql({
          query: createReview,
          variables: {
            input: {
              rating,
              comment,
              reviewer: {
                name,
                email,
              },
              userId: user?.id,
              productId: id,
              images,
            },
          },
        });
        setReview({ ...reviewDefault });
        setReviews([
          {
            id: new Date().toUTCString(),
            reviewer: {
              name,
              email,
            },
            productId: id,
            rating,
            comment,
            images,
            updatedAt: new Date().toUTCString(),
          },
          ...reviews,
        ]);
        setShowReview(!showReview);
        toast(
          <AlertPopup
            message="Review submitted successfully"
            status="success"
          />
        );
      } catch (error) {
        toast(<AlertPopup message={error.message} status="error" />);
        console.log(error);
      }
      return false;
    },
    [reviewState, user?.id, id]
  );

  const removeImage = (index) => {
    const temp = [...reviewState.images];
    temp.splice(index, 1);
    setReview({
      ...reviewState,
      images: temp,
    });
  };

  useEffect(() => {
    getStarAnalytics();
  }, []);

  return (
    <div className="col-md-12 mb-6">
      <Accordion adClass="accordion-simple">
        <Card title="Description" adClass="border-no" noDisplayStyle>
          <div className="row">
            <div className="col-md-12">
              {!!longDescription && (
                <>
                  <h5 className="description-title mb-4 font-weight-semi-bold ls-m">
                    Features
                  </h5>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: longDescription,
                    }}
                  />
                </>
              )}
            </div>
          </div>
        </Card>

        <Card title="Specifications" noDisplayStyle>
          <div className="row mt-6">
            <div className="pl-md-6 pt-4 pt-md-0">
              <div className="all-options-container d-flex flex-wrap align-item-center justify-content-center">
                {Specifications.map((options, index) => (
                  <ProductSpecifications key={index} {...options} />
                ))}
              </div>
              <hr className="product-divider"></hr>
              <h5 className="description-title mb-3 font-weight-semi-bold ls-m">
                Specifications
              </h5>
              <table className="table">
                <tbody>
                  <tr>
                    <th className="font-weight-semi-bold text-dark pl-0 text-left">
                      Brand
                    </th>
                    <td className="pl-4">{brand || vendor}</td>
                  </tr>
                  {!!(weight && weightUnit) && (
                    <tr>
                      <th className="font-weight-semi-bold text-dark pl-0">
                        Weight
                      </th>
                      <td className="pl-4">{weight + " " + weightUnit}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="pl-md-6 pt-4 pt-md-0">
              {!!video && (
                <>
                  <h5 className="description-title font-weight-semi-bold ls-m mb-5">
                    Video Description
                  </h5>
                  <figure className="p-relative d-inline-block mb-3">
                    <img
                      src="/images/product.jpg"
                      width="559"
                      height="370"
                      alt="Product"
                    />

                    <a
                      className="btn-play btn-iframe"
                      href="#"
                      data={video}
                      onClick={showVideoModalHandler}
                    >
                      <i className="d-icon-play-solid"></i>
                    </a>
                  </figure>
                </>
              )}
            </div>
          </div>
        </Card>

        <Card
          title={`Reviews  ${
            product?.totalRatings ? `(${product.totalRatings})` : ""
          }`}
          noDisplayStyle
        >
          <div className="product-tab-reviews">
            <div className="reply mt-8 mb-8">
              <div className="title-wrapper text-left">
                <h3 className="title title-simple text-left text-normal">
                  {reviews.length > 0
                    ? "Add a Review"
                    : "Be The First To Review “" + title + "”"}
                </h3>{" "}
                {!!reviews.length && (
                  <div className="review-section">
                    <div className="total-review w-100">
                      <h4>{rating}</h4>
                      <RatingStar value={rating} />
                      {!!product?.totalRatings && (
                        <span>Based on {product.totalRatings} reviews</span>
                      )}
                    </div>
                    <div className="rating w-100">
                      {reviewAnalytics.map((r) => (
                        <div
                          className="d-flex align-items-center justify-content-center mt-2"
                          key={r.key}
                        >
                          <RatingStar value={+r.key} />
                          <div className="ml-1 percent">
                            ({getPer(total, +r.doc_count)}%)
                          </div>
                          <span className="ml-1">{+r.doc_count}</span>
                        </div>
                      ))}
                    </div>
                    <div className="w-100 d-flex align-items-center justify-content-center">
                      <div className="buttons">
                        <div className="justify-content-end">
                          <button
                            className="btn btn-primary  btn-rounded mb-2"
                            onClick={() => {
                              setShowReview(!showReview);
                            }}
                          >
                            Add Review
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {showReview && (
                  <>
                    <hr className="product-divider"></hr>
                    <p>
                      Your email address will not be published. Required fields
                      are marked *
                    </p>
                  </>
                )}
              </div>
              {showReview && (
                <form action="#" onSubmit={submitReview}>
                  <div className="row">
                    <div className="col-md-6 mb-5">
                      <input
                        type="text"
                        className="form-control"
                        id="reply-name"
                        name="reply-name"
                        placeholder="Name *"
                        required
                        value={reviewState.name}
                        onChange={(e) =>
                          setReview({ ...reviewState, name: e.target.value })
                        }
                        onBlur={(e) =>
                          setReview({
                            ...reviewState,
                            name: e.target.value.trim(),
                          })
                        }
                      />
                    </div>
                    <div className="col-md-6 mb-5">
                      <input
                        type="email"
                        className="form-control"
                        id="reply-email"
                        name="reply-email"
                        placeholder="Email *"
                        required
                        value={reviewState.email}
                        onChange={(e) =>
                          setReview({ ...reviewState, email: e.target.value })
                        }
                        onBlur={(e) =>
                          setReview({
                            ...reviewState,
                            email: e.target.value.trim(),
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="rating-form">
                    <label htmlFor="rating" className="text-dark">
                      Your rating *{" "}
                    </label>
                    <RatingStar
                      onClick={(num) => {
                        setReview({ ...reviewState, rating: num });
                      }}
                      value={reviewState.rating}
                      editable
                    />
                  </div>
                  <textarea
                    id="reply-message"
                    cols="30"
                    rows="6"
                    className="form-control mb-4"
                    placeholder="Comment *"
                    required
                    value={reviewState.comment}
                    onChange={(e) =>
                      setReview({ ...reviewState, comment: e.target.value })
                    }
                    onBlur={(e) =>
                      setReview({
                        ...reviewState,
                        comment: e.target.value.trim(),
                      })
                    }
                  />
                  <div className="d-flex w-100 img-wrapper justify-content-end">
                    <div className=" img-wrapper">
                      {reviewState.images.map((img, index) => (
                        <div className="img_wrp mr-2" key={img}>
                          <img
                            src={getPublicImageURL(img)}
                            className="img-preview"
                            alt=""
                          />

                          <i
                            className="d-icon-close close"
                            onClick={() => removeImage(index)}
                          ></i>
                        </div>
                      ))}
                    </div>

                    <input
                      className="d-none"
                      onChange={onPhotoChange}
                      type="file"
                      accept="image/*"
                      id="review-photo"
                      name="filename"
                      multiple
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById("review-photo").click();
                      }}
                      className="btn btn-rounded mr-2"
                    >
                      Add Photo
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary btn-rounded"
                    >
                      <div className="d-flex justify-content-center align-items-center">
                        Submit
                        {loading ? (
                          <div className="spin-loader ml-2" />
                        ) : (
                          <i className="d-icon-arrow-right"></i>
                        )}
                      </div>
                    </button>
                  </div>
                </form>
              )}
            </div>
            <hr className="product-divider"></hr>
            {reviews.length === 0 ? (
              <div className="comments mb-2 pt-2 pb-2 border-no">
                There are no reviews yet.
              </div>
            ) : (
              <div className="comments mb-8 pt-2 pb-2 border-no">
                <ul>
                  {reviews.map((review, id) => (
                    <Review key={id} review={review} />
                  ))}
                </ul>
              </div>
            )}
            <TokenPagination
              onPage={() => getProductReviews(false)}
              total={total}
              loaded={reviews?.length}
              nextToken={token}
              content="reviews"
            />
          </div>
        </Card>

        {!!product.hasFaq && (
          <Card title="FAQs" noDisplayStyle>
            <div className="col-md-12">
              <Reveal
                keyframes={fadeIn}
                delay="100"
                duration="1000"
                triggerOnce
              >
                <div className="col-md-12">
                  {!!productFAQs.length && (
                    <Accordion adClass="accordion-border">
                      <>
                        {productFAQs.map((faq) => (
                          <div key={faq?.id}>
                            <Card
                              title={
                                <div
                                  className="card-title w-100"
                                  dangerouslySetInnerHTML={{
                                    __html: faq?.title,
                                  }}
                                />
                              }
                              noDisplayStyle
                            >
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: faq?.description,
                                }}
                              />
                            </Card>
                          </div>
                        ))}
                      </>
                    </Accordion>
                  )}
                </div>
              </Reveal>
            </div>
          </Card>
        )}
      </Accordion>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    user: state.user.data,
  };
}

export default connect(mapStateToProps, { openModal: modalActions.openModal })(
  DescOne
);
