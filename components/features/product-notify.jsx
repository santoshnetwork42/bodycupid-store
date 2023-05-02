import { API } from "aws-amplify";
import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";

import { addProductNotification } from "~/graphql/mutations";
import { errorHandler } from "~/utils/errorHandler";
import { alertToaster } from "../../utils/popupHelper";

function ProductNotify(props) {
  const { user, productId, variantId } = props;
  const [notifyEmail, setNotifyEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [allreadyNotify, setAllreadyNotify] = useState(false);

  useEffect(() => {
    if (user?.email) {
      setNotifyEmail(user?.email);
    }
  }, [user?.email]);

  const handleNotify = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        setLoading(true);
        const {
          data: { addProductNotification: response },
        } = await API.graphql({
          query: addProductNotification,
          variables: {
            productId: productId,
            email: notifyEmail,
            userId: user?.id,
            varientId: variantId,
          },
          authMode: user ? "AMAZON_COGNITO_USER_POOLS" : "API_KEY",
        });
        if (response?.success) {
          alertToaster(
            "We'll notify you when this product is back in stock",
            "success"
          );
        } else {
          alertToaster(
            "Something went wrong",
            "error"
          );
        }
        setAllreadyNotify(true);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        errorHandler(error);
      }
    },
    [notifyEmail, productId, variantId, user]
  );

  return (
    <div className="notify-container">
      <div className="out-of-stock">
        <p className="m-0">Temporarily out of stock.</p>
        <p className="m-0">
          We are working hard to be back in stock as soon as possible
        </p>
      </div>
      {!!allreadyNotify ? (
        <div className="d-flex align-items-center">
          <i className="check-mark fas fa-check-circle mr-2"></i>
          <p className="m-0">
            We'll notify you when this product is back in stock
          </p>
        </div>
      ) : (
        <form onSubmit={handleNotify}>
          <label>*This product is currently out of stock</label>
          {!user && (
            <input
              className="form-control mt-1"
              type="email"
              id="email"
              required
              name="email"
              placeholder="Enter email to find out when it's back"
              value={notifyEmail}
              onChange={(e) => setNotifyEmail(e.target.value.trim())}
            />
          )}
          <button
            className="notify-btn btn  btn-block btn-rounded d-flex justify-content-center align-items-center text-capitalize font-weight-semi-bold mt-3"
            type="submit"
            disabled={loading}
          >
            Notify me when available
            {loading && <div className="spin-loader ml-2" />}
          </button>
        </form>
      )}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    user: state.user.data,
  };
}

export default connect(mapStateToProps)(ProductNotify);
