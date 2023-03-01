import React, { useCallback, useMemo, useState } from "react";
import { connect } from "react-redux";
import { Tabs, Tab, TabList, TabPanel } from "react-tabs";
import { useSetState } from "react-use";
import { API } from "aws-amplify";
import { toast } from "react-toastify";

import { modalActions } from "~/store/modal";
import { createReview } from "~/graphql/api";
import AlertPopup from "~/components/features/product/common/alert-popup";
import RatingStar from "../rating-start";
import Review from "../review";

const reviewDefault = {
  rating: 5,
  comment: "",
  name: "",
  email: "",
  image: "",
};

function DescOne(props) {
  const { product, isDivider = true, openModal, user } = props;
  const [reviewState, setReview] = useSetState({ ...reviewDefault });
  const [reviews, setReviews] = useState([]);
  const [filter, setFilter] = useState("helpful");
  const [showReview, setShowReview] = useState(false);
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
  const { allReviews, avg, total } = useMemo(() => {
    const { reviews } = product;
    if (reviews && reviews.items.length) {
      setReviews(reviews.items);
      const total = reviews.items.reduce(function (acc, obj) {
        return acc + obj.rating;
      }, 0);
      let allReviews = {};
      [1, 2, 3, 4, 5].map((num) => {
        allReviews = {
          ...allReviews,
          [num]: reviews.items.filter((d) => d.rating === num),
        };
      });

      return {
        total: reviews.items.length,
        avg: total / reviews.items.length,
        allReviews,
      };
    }
    return {
      total: 0,
      avg: 0,
      allReviews: 0,
    };
  }, [product]);

  const getPer = (total, allReview) => {
    if (total && allReview) return Math.round((allReview * 100) / total);
    return 0;
  };

  const onPhotoChange = (e) => {
    setReview({
      ...reviewState,
      image: e.target.files[0],
    });
  };
  const changeFilter = (e) => {
    if (!reviews.length) return;
    setFilter(e.target.value);
    if (e.target.value === "helpful") {
      setReviews(reviews.sort((a, b) => a.rating - b.rating).reverse());
    } else {
      setReviews(
        reviews.sort((a, b) =>
          a.updateAt > b.updateAt ? 1 : b.updateAt > a.updateAt ? -1 : 0
        )
      );
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
        const { rating, comment, name, email } = reviewState;
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
            },
          },
        });
        setReview({ ...reviewDefault });
        setReviews([
          ...reviews,
          {
            id: new Date().toUTCString(),
            reviewer: {
              name,
              email,
            },
            productId: product?.id,
            rating,
            comment,
            updatedAt: new Date().toUTCString(),
          },
        ]);
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
      defaultIndex={0}
    >
      <TabList className="nav nav-tabs justify-content-center" role="tablist">
        <Tab className="nav-item">
          <span className="nav-link">Description</span>
        </Tab>
        <Tab className="nav-item">
          <span className="nav-link">Specifications</span>
        </Tab>
        {/* {isGuide ? (
          <Tab className="nav-item">
            <span className="nav-link">Size Guide</span>
          </Tab>
        ) : (
          ""
        )} */}
        <Tab className="nav-item">
          {/* <span className="nav-link">Reviews ({product.reviews})</span> */}
          <span className="nav-link" id="product-review">
            Reviews ({reviews.length})
          </span>
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
            <div className="col-md-6 pl-md-6 pt-4 pt-md-0">
              <div className="icon-box-wrap d-flex flex-wrap">
                <div className="icon-box icon-box-side icon-border pt-2 pb-2 mb-4 mr-10">
                  <div className="icon-box-icon">
                    <i className="d-icon-lock"></i>
                  </div>
                  <div className="icon-box-content">
                    <h4 className="icon-box-title lh-1 pt-1 ls-s text-normal">
                      2 year warranty
                    </h4>
                    <p>Guarantee with no doubt</p>
                  </div>
                </div>
                {isDivider && <div className="divider d-xl-show mr-10"></div>}
                <div className="icon-box icon-box-side icon-border pt-2 pb-2 mb-4">
                  <div className="icon-box-icon">
                    <i className="d-icon-truck"></i>
                  </div>
                  <div className="icon-box-content">
                    <h4 className="icon-box-title lh-1 pt-1 ls-s text-normal">
                      Free shipping
                    </h4>
                    <p>On orders over ₹399</p>
                  </div>
                </div>
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
            <div className="col-md-6 pl-md-6 pt-4 pt-md-0">
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
                {product.reviews > 0
                  ? "Add a Review"
                  : "Be The First To Review “" + product.title + "”"}
              </h3>{" "}
              <div className="review-section ">
                <div className="d-flex review-wrapper justify-content-around w-100">
                  <div className="total-review">
                    <h4>{avg.toFixed(1)}</h4>
                    <RatingStar value={3} />
                    <span>Based on {total} reviews</span>
                  </div>
                  <div className="rating">
                    {[1, 2, 3, 4, 5].map((num, i) => (
                      <div className="d-flex align-items-center mt-2" key={i}>
                        <RatingStar value={num} />
                        <div className="ml-1 percent">
                          ({getPer(total, allReviews[num]?.length)}%)
                        </div>
                        <span className="ml-1">{allReviews[num]?.length}</span>
                      </div>
                    ))}
                  </div>
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
                      <select
                        className="form-control"
                        value={filter}
                        onChange={changeFilter}
                      >
                        <option value="helpful">Most helpful</option>
                        <option value="new">Newest</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              {showReview && (
                <p>
                  Your email address will not be published. Required fields are
                  marked *
                </p>
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
                <div className="d-flex w-100 justify-content-end">
                  <input
                    className="d-none"
                    onChange={onPhotoChange}
                    type="file"
                    id="review-photo"
                    name="filename"
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById("review-photo").click();
                    }}
                    className="btn   btn-rounded mr-2"
                  >
                    {reviewState.image ? "Change" : "Add"} Photo
                  </button>
                  <button type="submit" className="btn btn-primary btn-rounded">
                    Submit<i className="d-icon-arrow-right"></i>
                  </button>
                </div>
              </form>
            )}
          </div>
          {reviews.length === 0 ? (
            <div className="comments mb-2 pt-2 pb-2 border-no">
              There are no reviews yet.
            </div>
          ) : (
            <div className="comments mb-8 pt-2 pb-2 border-no">
              <ul>
                {reviews.map((review) => (
               <Review review={review}/>
                ))}
              </ul>
            </div>
          )}
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
