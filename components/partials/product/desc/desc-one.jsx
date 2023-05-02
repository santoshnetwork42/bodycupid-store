import React, { useCallback, useState } from "react";
import { connect } from "react-redux";
import { useSetState } from "react-use";
import { API, graphqlOperation } from "aws-amplify";
import Reveal from "react-awesome-reveal";

import { modalActions } from "~/store/modal";
import { createReview, getReviews, getReviewsAnalytics } from "~/graphql/api";
import RatingStar from "../rating-star";
import Review from "../review";
import TokenPagination from "~/components/features/token-pagination";
import Accordion from "~/components/features/accordion/accordion";
import Card from "~/components/features/accordion/card";
import { uploadImages } from "~/utils/imageupload";
import { getPublicImageURL } from "~/utils/getPublicImageUrl";
import { errorHandler } from "~/utils/errorHandler";
import useWindowDimensions from "~/utils/getWindowDimension";
import SkillBar from "~/components/features/skill-bar";
import { alertToaster } from "../../../../utils/popupHelper";

const reviewDefault = {
  rating: 5,
  comment: "",
  name: "",
  email: "",
  images: [],
};

const reviewColor = ["#76DB98", "#B7EA83", "#F6D757", "#FBB851", "#F17A54"];

function DescOne(props) {
  const { product, openModal, user, productFAQs } = props;
  const { id, totalRatings, longDescription, title, rating } = product;

  const { width } = useWindowDimensions();
  const [reviewState, setReview] = useSetState({ ...reviewDefault });
  const [reviews, setReviews] = useState([]);
  const [total, setTotal] = useState(0);
  const [showReview, setShowReview] = useState(!totalRatings);
  const [token, setToken] = useState(null);
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
        const total = data.reduce((a, b) => (a = a + b.doc_count), 0);
     
        const final = Array(5)
          .fill({ key: "", doc_count: 0 })
          .map((item, index) => {
            const inputIndex = data.findIndex(
              (i) => i.key === String(index + 1)
            );
            return inputIndex !== -1
              ? data[inputIndex]
              : { ...item, key: (index + 1).toString() };
          }).reverse();

          const analytics = final.map((d) => ({
            ...d,
            percentage: getPer(total, +d.doc_count),
          }));

        setReviewAnalytics(analytics);
      }
    } catch (e) {
      errorHandler(e);
    }
  };

  const getProductReviews = useCallback(
    (reset = true) => {
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
          errorHandler(err);
          setLoading(false);
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

  // const showVideoModalHandler = (e) => {
  //   e.preventDefault();
  //   let link = e.currentTarget.closest(".btn-play").getAttribute("data");
  //   openModal(link);
  // };

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
        getStarAnalytics();
        alertToaster(
          "Review submitted successfully",
          "success"
        );
        
      } catch (error) {
        errorHandler(error);
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

  return (
    <div className="col-md-12 mb-6 product-description">
      <Accordion adClass="accordion-simple">
        <Card
          title="Description"
          expanded={width > 450}
          adClass="border-no"
          noDisplayStyle
          collapseEvent
        >
          <div className="row">
            <div className="col-md-12">
              {!!longDescription && (
                <>
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

        <Card
          title={`Customer Reviews  ${
            product?.totalRatings ? `(${product.totalRatings})` : ""
          }`}
          noDisplayStyle
          onExpanded={() => {
            if (!reviews.length) {
              getProductReviews();
              getStarAnalytics();
            }
          }}
        >
          <div className="product-tab-reviews">
            <div className="reply mb-8">
              <div className="title-wrapper text-left">
                {!!reviews.length && (
                  <div className="review-section">
                    <div className="total-review mb-2 w-100">
                      <div>
                        <div className="d-flex align-items-end">
                          {" "}
                          <h2 className="mb-1 lh-1 ml-1">{rating}</h2>{" "}
                          {!!product?.totalRatings && (
                            <span className="mt-2 mb-1 ml-1">
                              Based on {product.totalRatings} reviews
                            </span>
                          )}
                        </div>

                        <RatingStar value={rating} />
                      </div>
                    </div>
                    <div className="rating w-100">
                      {console.log("reviewAnalytics", reviewAnalytics)}
                      {reviewAnalytics.map((r, i) => (
                        <div
                          className="d-flex w-100 align-items-center  justify-content-center mt-2"
                          key={r.key}
                        >
                          <span className="mr-2 d-flex flex-column percent">
                            {r.key} Star
                          </span>
                          <SkillBar
                            color={reviewColor[+r.key]}
                            className="review-bar"
                            percentage={r.doc_count}
                          />
                          
                          <div className="ml-1 percent">{r.percentage}%</div>
                        </div>
                      ))}
                    </div>
                    <div className="w-100 d-flex align-items-center justify-content-end">
                      <div className="buttons  ml-1 mr-1 ">
                        <div className="justify-content-end w-100">
                          <button
                            className="btn w-100  btn-rounded mb-2"
                            onClick={() => {
                              setShowReview(!showReview);
                            }}
                          >
                            Write a review
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
