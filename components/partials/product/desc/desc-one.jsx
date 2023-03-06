import React, { useCallback } from "react";
import { connect } from "react-redux";
import { Tabs, Tab, TabList, TabPanel } from "react-tabs";
import { useSetState } from "react-use";
import { API } from "aws-amplify";
import { toast } from "react-toastify";

import ALink from "~/components/features/custom-link";
import { modalActions } from "~/store/modal";
import { formateDate, toDecimal } from "~/utils";
import { createReview } from "~/graphql/api";
import AlertPopup from "~/components/features/product/common/alert-popup";
import ProductsOptions from "../product-options";
import productsOptions from "~/lib/productsOptions.json";

const reviewDefault = {
  rating: 1,
  comment: "",
  name: "",
  email: "",
};

function DescOne(props) {
  const { product, isDivider = true, openModal, user } = props;
  const [reviewState, setReview] = useSetState({ ...reviewDefault });
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

  const setRating = (e) => {
    e.preventDefault();

    if (e.currentTarget.parentNode.querySelector(".active")) {
      e.currentTarget.parentNode
        .querySelector(".active")
        .classList.remove("active");
    }

    e.currentTarget.classList.add("active");
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
        await API.graphql({
          query: createReview,
          variables: {
            input: {
              rating: reviewState.rating,
              comment: reviewState.comment,
              reviewer: {
                name: reviewState.name,
                email: reviewState.email,
              },
              userId: user?.id,
              productId: product?.id,
            },
          },
        });
        setReview({ ...reviewDefault });
        toast(
          <AlertPopup
            message="Review submitted successfully"
            status="success"
          />
        );
      } catch (error) {
        toast(<AlertPopup message={error.message} status="error" />);
        console.log(err);
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
            Reviews ({product.reviews.items.length})
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
            <div className="pl-md-6 pt-4 pt-md-0">
              <div className="all-options-container d-flex flex-wrap align-item-center justify-content-center">
                {productsOptions.map((options) => (
                  <ProductsOptions key={options.id} options={options} />
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
                {product.reviews > 0
                  ? "Add a Review"
                  : "Be The First To Review “" + product.title + "”"}
              </h3>
              <p>
                Your email address will not be published. Required fields are
                marked *
              </p>
            </div>
            <div className="rating-form">
              <label htmlFor="rating" className="text-dark">
                Your rating *{" "}
              </label>
              <span className="rating-stars selected">
                {[1, 2, 3, 4, 5].map((num, index) => (
                  <a
                    className={`star-${num}`}
                    href="#"
                    onClick={(e) => {
                      setRating(e);
                      setReview({ rating: num });
                    }}
                    key={"star-" + index}
                  >
                    {num}
                  </a>
                ))}
              </span>
            </div>
            <form action="#" onSubmit={submitReview}>
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
                    onBlur={(e) => setReview({ email: e.target.value.trim() })}
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-primary btn-rounded">
                Submit<i className="d-icon-arrow-right"></i>
              </button>
            </form>
          </div>
          {product.reviews.items.length === 0 ? (
            <div className="comments mb-2 pt-2 pb-2 border-no">
              There are no reviews yet.
            </div>
          ) : (
            <div className="comments mb-8 pt-2 pb-2 border-no">
              <ul>
                {product.reviews.items.map((review) => (
                  <li key={review.id}>
                    <div className="comment">
                      {/* <figure className="comment-media">
                        <ALink href="#">
                          <img
                            src="/images/blog/comments/1.jpg"
                            alt="avatar"
                            width="100"
                            height="100"
                          />
                        </ALink>
                      </figure> */}
                      <div className="comment-body">
                        <div className="comment-rating ratings-container mb-0">
                          <div className="ratings-full">
                            <span
                              className="ratings"
                              style={{ width: review.rating * 20 + "%" }}
                            ></span>
                            <span className="tooltiptext tooltip-top">
                              {toDecimal(review.rating)}
                            </span>
                          </div>
                        </div>
                        <div className="comment-user">
                          <span className="comment-date text-body">
                            {formateDate(review.createdAt)}
                          </span>
                          <h4>
                            <ALink href="#">{review.reviewer.name}</ALink>
                          </h4>
                        </div>

                        <div className="comment-content">
                          <p>{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  </li>
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
