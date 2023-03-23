import React, { useCallback, useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import { Tabs, Tab, TabList, TabPanel } from "react-tabs";
import { useSetState } from "react-use";
import { API, graphqlOperation } from "aws-amplify";
import { toast } from "react-toastify";
import Reveal from "react-awesome-reveal";

import { modalActions } from "~/store/modal";
import { createReview, getReviews, searchProductFaqs } from "~/graphql/api";
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
  image: [],
};

function DescOne(props) {
  const { product, isDivider = true, openModal, user } = props;
  const [reviewState, setReview] = useSetState({ ...reviewDefault });
  const [reviews, setReviews] = useState([]);
  const [total, setTotal] = useState(0);
  const [showReview, setShowReview] = useState(false);
  const [token, setToken] = useState(null);
  const [tabIndex, setTabIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [productsFAQs, setProductsFAQs] = useState([]);
  const [reviewImages, setReviewImages] = useState([]);
  let sizes = [];
  if (product.variants.items.length > 0) {
    if (product.variants.items[0].size)
      product.variants.items.forEach((item) => {
        if (sizes.findIndex((size) => size.name === item.size.name) === -1) {
          sizes.push({ name: item.size.name, value: item.size.size });
        }
      });

    if (product.variants.items[0].color) {
      product.variants.items.forEach((item) => {
        if (colors.findIndex((color) => color.name === item.color.name) === -1)
          colors.push({ name: item.color.name, value: item.color.color });
      });
    }
  }
  const allReviews = useMemo(() => {
    if (reviews && reviews.length) {
      return [1, 2, 3, 4, 5].reduce((acc, cur) => {
        acc = {
          ...acc,
          [cur]: reviews.filter((d) => d.rating === cur),
        };
        return acc;
      }, {});
    }
    return 0;
  }, [reviews]);
  const getProductReviews = useCallback(
    (reset) => {
      setLoading(true);
      API.graphql(
        graphqlOperation(getReviews, {
          filter: {
            productId: { eq: product.id },
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

  const getProductFAQs = useCallback(() => {
    setLoading(true);
    API.graphql(
      graphqlOperation(searchProductFaqs, {
        filter: {
          productId: { eq: product.id },
        },
      })
    )
      .then(
        ({
          data: {
            searchProductFaqs: { items: response },
          },
        }) => {
          if (response) {
            console.log(response);
            setProductsFAQs(response);
          }
          setLoading(false);
        }
      )
      .catch(() => {
        setLoading(false);
      });
  }, [product]);

  useEffect(() => {
    if (tabIndex === 2 && reviews.length === 0) {
      getProductReviews(true);
    }

    if (tabIndex === 3 && productsFAQs.length === 0) {
      getProductFAQs();
    }
  }, [tabIndex]);

  const getPer = (total, allReview) => {
    if (total && allReview) return Math.round((allReview * 100) / total);
    return 0;
  };

  const onPhotoChange = async (e) => {
    const files = [...reviewImages, ...e.target.files];
    setReviewImages(files);
    if (reviewImages) {
      const urls = await Promise.all(
        files.map(async (element) => {
          const key = await uploadImages(element, "review");
          return key;
        })
      );
      setReview({
        ...reviewState,
        image: urls,
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
        const { rating, comment, name, email, image } = reviewState;
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
              productId: product?.id,
              images: image,
            },
          },
        });
        setReview({ ...reviewDefault });
        setReviewImages([]);
        setReviews([
          {
            id: new Date().toUTCString(),
            reviewer: {
              name,
              email,
            },
            productId: product?.id,
            rating,
            comment,
            images: image,
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
    [reviewState, user?.id, product?.id]
  );

  return (
    <Tabs
      className="tab tab-nav-simple product-tabs"
      selectedTabClassName="show"
      selectedTabPanelClassName="active"
      selectedIndex={tabIndex}
      onSelect={(index) => setTabIndex(index)}
    >
      <TabList className="nav nav-tabs justify-content-center" role="tablist">
        <Tab className="nav-item">
          <span className="nav-link">Description</span>
        </Tab>
        <Tab className="nav-item">
          <span className="nav-link">Specifications</span>
        </Tab>
        <Tab className="nav-item">
          <span className="nav-link" id="product-review">
            Reviews {!!product?.totalRatings && `(${product?.totalRatings})`}
          </span>
        </Tab>

        <Tab className="nav-item">
          <span className="nav-link">FAQ</span>
        </Tab>
      </TabList>

      <div className="tab-content">
        <TabPanel className="tab-pane product-tab-description">
          <div className="row mt-6">
            <div className="col-md-12">
              {!!product.longDescription && (
                <>
                  <h5 className="description-title mb-4 font-weight-semi-bold ls-m">
                    Features
                  </h5>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: product.longDescription,
                    }}
                  />
                </>
              )}
            </div>
          </div>
        </TabPanel>

        <TabPanel className="tab-pane product-tab-specifications">
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
                    <td className="pl-4">{product.brand || product.vendor}</td>
                  </tr>
                  {!!(product.weight && product.weightUnit) && (
                    <tr>
                      <th className="font-weight-semi-bold text-dark pl-0">
                        Weight
                      </th>
                      <td className="pl-4">
                        {product.weight + " " + product.weightUnit}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="pl-md-6 pt-4 pt-md-0">
              {!!product.video && (
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
                      data={product.video}
                      onClick={showVideoModalHandler}
                    >
                      <i className="d-icon-play-solid"></i>
                    </a>
                  </figure>
                </>
              )}
            </div>
          </div>
        </TabPanel>

        <TabPanel className="tab-pane product-tab-reviews">
          <div className="reply mt-8 mb-8">
            <div className="title-wrapper text-left">
              <h3 className="title title-simple text-left text-normal">
                {reviews > 0
                  ? "Add a Review"
                  : "Be The First To Review “" + product.title + "”"}
              </h3>{" "}
              <div className="review-section ">
                <div className="total-review w-100">
                  <h4>{product?.rating}</h4>
                  <RatingStar value={product?.rating} />
                  {!!product?.totalRatings && (
                    <span>Based on {product.totalRatings} reviews</span>
                  )}
                </div>
                <div className="rating w-100">
                  {[5, 4, 3, 2, 1].map((num, i) => (
                    <div
                      className="d-flex align-items-center justify-content-center mt-2"
                      key={i}
                    >
                      <RatingStar value={num} />
                      <div className="ml-1 percent">
                        ({getPer(total, allReviews[num]?.length)}%)
                      </div>
                      <span className="ml-1">{allReviews[num]?.length}</span>
                    </div>
                  ))}
                </div>
                <div className="w-100 d-flex align-items-center justify-content-center">
                  <div className="buttons">
                    <div className=" justify-content-end">
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
                      onChange={(e) => setReview({ name: e.target.value })}
                      onBlur={(e) => setReview({ name: e.target.value.trim() })}
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
                      onChange={(e) => setReview({ email: e.target.value })}
                      onBlur={(e) =>
                        setReview({ email: e.target.value.trim() })
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
                      setReview({ rating: num });
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
                  onChange={(e) => setReview({ comment: e.target.value })}
                  onBlur={(e) => setReview({ comment: e.target.value.trim() })}
                ></textarea>
                <div className="d-flex w-100 img-wrapper justify-content-end">
                  {reviewState.image &&
                    reviewState.image.map((img, index) => (
                      <div className="img_wrp mr-2">
                        <img
                          src={getPublicImageURL(img)}
                          className="img-preview"
                          alt=""
                        />
                        <img
                          className="close"
                          src="https://cdn-icons-png.flaticon.com/512/2961/2961937.png"
                          onClick={() => {
                            const temp = [...reviewState.image];
                            temp.splice(index, 1);
                            setReview({
                              ...reviewState,
                              image: temp,
                            });
                          }}
                        />
                      </div>
                    ))}

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
                  <button type="submit" className="btn btn-primary btn-rounded">
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
        </TabPanel>

        <TabPanel className="tab-pane product-tab-faq">
          <div className="row">
            <div className="col-md-12">
              <Reveal
                keyframes={fadeIn}
                delay="100"
                duration="1000"
                triggerOnce
              >
                <section>
                  <div className="container">
                    <div className="row">
                      <div className="col-md-12 mt-10">
                        {!!productsFAQs.length && (
                          <Accordion adClass="accordion-border accordion-boxed accordion-plus">
                            {productsFAQs.map((faq) => (
                              <div key={faq?.id}>
                                <Card
                                  title={
                                    <div
                                      className="card-title"
                                      dangerouslySetInnerHTML={{
                                        __html: faq?.title,
                                      }}
                                    />
                                  }
                                >
                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html: faq?.description,
                                    }}
                                  />
                                </Card>
                              </div>
                            ))}
                          </Accordion>
                        )}
                      </div>
                    </div>
                  </div>
                </section>
              </Reveal>
            </div>
          </div>
        </TabPanel>
      </div>
    </Tabs>
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
