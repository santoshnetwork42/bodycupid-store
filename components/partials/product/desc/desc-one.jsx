import React, { useCallback, useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { useSetState } from "react-use";
import { API, graphqlOperation } from "aws-amplify";

import { modalActions } from "~/store/modal";
import {
  createReview,
  getReviews,
  getReviewsAnalytics,
  updateReview,
} from "~/graphql/api";
import RatingStar from "../rating-star";
import Review from "../review";
import TokenPagination from "~/components/features/token-pagination";
import Accordion from "~/components/features/accordion/accordion";
import Card from "~/components/features/accordion/card";
import { uploadImages } from "~/utils/imageupload";
import { getPublicImageURL } from "~/utils/getPublicImageUrl";
import { errorHandler } from "~/utils/errorHandler";
import SkillBar from "~/components/features/skill-bar";
import Loader from "~/components/common/partials/loader";
import { alertToaster } from "../../../../utils/popupHelper";
import ReadMore from "~/components/layouts/read-more";
import { useWindowDimensions } from "~/utils/getWindowDimension";
import { Close } from "~/components/icons";

const reviewDefault = {
  rating: 5,
  comment: "",
  name: "",
  email: "",
  images: [],
  reviewId: "",
};

const reviewColor = ["#F17A54", "#FBB851", "#F6D757", "#B7EA83", "#76DB98"];

const getManufacturerInformation = (product) => [
  {
    label: "Manufacturer Name :",
    value: product.manufacturer,
  },
  {
    label: "Country of Origin :",
    value: "India",
  },
  {
    label: "Marketed By & Contact details :",
    value:
      "Body Cupid Pvt Ltd - 4th Floor, Prestige Dotcom, Field Marshal Cariappa Road, Srinivas Nagar, Shanthala Nagar, Ashok Nagar, Bengaluru – 560025, Karnataka, India.",
  },
  {
    label: "Customer Care Details",
    value: "",
  },
  {
    label: "E-mail :",
    value: "support@bodycupid.com",
  },
  {
    label: "Phone Number :",
    value: "+91-9543000200",
  },
];

function DescOne(props) {
  const { product, user, openPasswordlessModal } = props;
  const { id, totalRatings, longDescription, additionalInfo, rating } = product;

  const { isSmallSize: isMobile } = useWindowDimensions();
  const [reviewState, setReview] = useSetState({ ...reviewDefault });
  const [reviews, setReviews] = useState([]);
  const [total, setTotal] = useState(0);
  const [showReview, setShowReview] = useState(!totalRatings);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reviewAnalytics, setReviewAnalytics] = useState([]);
  const [reviewLoading, setReviewLoading] = useState(true);
  const [userReview, setUserReview] = useState(null); //If user has already reviewed or not

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
            verified: { eq: true },
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
        const data = item.result?.buckets.sort((a, b) => +a.key - +b.key);
        const totalDocCount = data.reduce((a, b) => (a = a + b.doc_count), 0);

        const final = Array(5)
          .fill({ key: "", doc_count: 0 })
          .map((item, index) => {
            const inputIndex = data.findIndex(
              (i) => i.key === String(index + 1)
            );
            return inputIndex !== -1
              ? data[inputIndex]
              : { ...item, key: (index + 1).toString() };
          })
          .reverse();

        const analytics = final.map((d) => ({
          ...d,
          percentage: getPer(totalDocCount, +d.doc_count),
        }));

        setReviewAnalytics(analytics);
        setReviewLoading(false);
      }
    } catch (e) {
      setReviewLoading(false);
      errorHandler(e);
    }
  };

  const getProductReviews = useCallback(
    (reset = true) => {
      setLoading(true);
      setReviewLoading(true);

      const filter = { productId: { eq: id }, verified: { eq: true } };
      if (user) {
        filter.userId = { ne: user.id };
      }

      API.graphql(
        graphqlOperation(getReviews, {
          filter,
          sort: [{ field: "createdAt", direction: "desc" }],
          nextToken: reset ? null : token,
          limit: 10,
        })
      )
        .then(
          async ({
            data: {
              searchReviews: { items: response, total: totalCount, nextToken },
            },
          }) => {
            if (reset) {
              setReviews(response);
            } else {
              setReviews([...reviews, ...response]);
            }
            setToken(nextToken);
            setTotal(totalCount);
            setLoading(false);
            setReviewLoading(false);
          }
        )
        .catch((err) => {
          errorHandler(err);
          setLoading(false);
        });
    },
    [product, token, user, reviews]
  );

  useEffect(() => {
    if (user) {
      API.graphql(
        graphqlOperation(getReviews, {
          filter: {
            productId: { eq: id },
            userId: { eq: user.id },
          },
          limit: 1,
        })
      )
        .then((resp) => resp.data.searchReviews.items[0])
        .then(setUserReview)
        .catch((err) => {
          errorHandler(err);
        });
    }
  }, [!!user]);

  const getPer = (totalCount, allReview) => {
    if (totalCount && allReview)
      return Math.round((allReview * 100) / totalCount);
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

  const totalRating = useMemo(() => {
    if (total) {
      if (userReview?.verified) return total + 1;
      return total;
    }
    return product?.totalRatings ?? 0;
  }, [total, product?.totalRatings, userReview]);

  // const showVideoModalHandler = (e) => {
  //   e.preventDefault();
  //   let link = e.currentTarget.closest(".btn-play").getAttribute("data");
  //   openModal(link);
  // };

  const submitReview = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        const { reviewId, rating, comment, name, email, images } = reviewState;

        if (reviewId) {
          await API.graphql({
            query: updateReview,
            authMode: "AMAZON_COGNITO_USER_POOLS",
            variables: {
              input: {
                id: reviewId,
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
          })
            .then((resp) => resp.data.updateReview)
            .then((res) =>
              setUserReview({
                ...res,
                rating,
                comment,
                reviewer: { name: name, email: email },
                images,
              })
            );
        } else {
          await API.graphql({
            query: createReview,
            authMode: "AMAZON_COGNITO_USER_POOLS",
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
          })
            .then((resp) => resp.data.createReview)
            .then(setUserReview);
        }
        setReview({ ...reviewDefault });
        setShowReview(!showReview);
        getStarAnalytics();
        getProductReviews();
        alertToaster("Your review has been submitted.", "success");
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

  const manufacturerInformation = getManufacturerInformation(product);

  return (
    <div
      className="col-md-12 mb-6 product-description"
      key={`desc-${product.id}`}
    >
      <Accordion adClass="accordion-simple">
        {!!longDescription && (
          <Card
            expanded={!isMobile}
            title="PRODUCT DESCRIPTION"
            adClass="border-no"
            noDisplayStyle
            collapseEvent
          >
            <div className="row mb-2">
              <div className="col-md-12">
                {isMobile && (
                  <div className="product-longdescription-wrapper">
                    <ReadMore position="start" content={longDescription} />
                  </div>
                )}
                {!isMobile && (
                  <div
                    className="product-longdescription-wrapper"
                    dangerouslySetInnerHTML={{
                      __html: longDescription,
                    }}
                  />
                )}
              </div>
            </div>
          </Card>
        )}

        <Card title="PRODUCT DETAILS" noDisplayStyle collapseEvent>
          <div className="row">
            <div className="col-md-12">
              <div className="additional-info-container">
                <h6 className="additional-info-label m-0">Product Name</h6>
                <p className="additional-info-value">{product.title}</p>
              </div>
              {!!additionalInfo && (
                <>
                  {additionalInfo.map((info) => {
                    return (
                      <div
                        className="additional-info-container"
                        key={info.label}
                      >
                        <h6 className="additional-info-label m-0">
                          {info.label}
                        </h6>
                        <p className="additional-info-value">{info.value}</p>
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          </div>
        </Card>

        <Card
          title={`CUSTOMER REVIEWS  ${totalRating ? `(${totalRating})` : ""}`}
          id="product-review"
          noDisplayStyle
          onExpanded={() => {
            if (!reviews.length) {
              getProductReviews();
              getStarAnalytics();
            }
          }}
        >
          {reviewLoading && (
            <div className="p-relative mt-3 review-loading-wrapper  mb-3">
              <Loader loading small />
            </div>
          )}
          {!reviewLoading && (
            <div className="product-tab-reviews">
              <div className="reply">
                <div className="title-wrapper text-left">
                  {(!!reviews.length || !!userReview) && (
                    <div className="review-section">
                      <div className="total-review mb-2 w-100">
                        <div>
                          <div className="d-flex align-items-end">
                            <h2 className="mb-1 lh-1">{rating.toFixed(1)}</h2>
                            {!!totalRating && (
                              <span className="mt-2 mb-1 ml-1">
                                Based on {totalRating} reviews
                              </span>
                            )}
                          </div>

                          <RatingStar value={rating} />
                        </div>
                      </div>
                      <div className="rating w-100">
                        {reviewAnalytics.map((r, i) => (
                          <div
                            className="d-flex w-100 align-items-center  justify-content-center mt-2"
                            key={r.key}
                          >
                            <span className="mr-2 d-flex flex-column percent">
                              {r.key} Star
                            </span>
                            <SkillBar
                              color={reviewColor[+r.key - 1]}
                              className="review-bar"
                              percentage={r.percentage}
                            />

                            <div className="ml-1 percent">{r.percentage}%</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {showReview && (
                    <>
                      <hr className="product-divider"></hr>
                      <p>
                        Your email address will not be published. Required
                        fields are marked *
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
                            <span
                              className="close"
                              onClick={() => removeImage(index)}
                            >
                              <Close color="grey" size={18} />
                            </span>
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
                          {loading && <div className="spin-loader ml-2" />}
                        </div>
                      </button>
                    </div>
                  </form>
                )}
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <div className="comments mb-2 pt-2 pb-2 border-no">
                  {!reviews.length &&
                    !userReview &&
                    "There are no reviews yet."}
                </div>
                {!showReview && !userReview && (
                  <div className="d-flex align-items-center justify-content-end">
                    <div className="buttons mr-1 ">
                      <div className="justify-content-end w-100">
                        {/* {!userReview && ( */}
                        <button
                          className="btn w-100  btn-rounded mb-2"
                          onClick={() => {
                            user
                              ? setShowReview(!showReview)
                              : openPasswordlessModal(false);
                          }}
                        >
                          Write a review
                        </button>
                        {/* )} */}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {(!!reviews.length || !!userReview) && (
                <div className="comments mb-8 pt-2 pb-2 border-no">
                  <ul>
                    {!!userReview && (
                      <Review
                        key={userReview.id}
                        review={userReview}
                        onUpdate={(userReview) => {
                          setReview(userReview);
                          setShowReview(true);
                        }}
                      />
                    )}

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
          )}
        </Card>

        {/* {!!product.hasFaq && (
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
        )} */}

        <Card title="MANUFACTURER INFORMATION" noDisplayStyle collapseEvent>
          <div className="row mb-2">
            <div className="col-md-12">
              {manufacturerInformation.map((item) => {
                return (
                  <div className="additional-info-container" key={item.label}>
                    {!!(item.value && item.label) && (
                      <>
                        <h6 className="additional-info-label m-0">
                          {item.label}
                        </h6>
                        <p className="additional-info-value">{item.value}</p>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </Card>
      </Accordion>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    user: state.user.data,
  };
}

export default connect(mapStateToProps, {
  openModal: modalActions.openModal,
  openPasswordlessModal: modalActions.openPasswordlessModal,
})(DescOne);
