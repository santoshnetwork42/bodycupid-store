import React, { useCallback, useState } from "react";
import { connect } from "react-redux";

function ProductNotify(props) {
  const { user } = props;
  const { email } = user;
  const [notifyEmail, setNotifyEmail] = useState(email);
  const [loading, setLoading] = useState(false);

  const handleNotify = useCallback((e) => {
    e.preventDefault();
  });

  return (
    <div className="notify-container">
      <div className="out-of-stock">
        <p className="m-0">Temporarily out of stock.</p>
        <p className="m-0">
          we are working hard to be back in stock as soon as possible
        </p>
      </div>
      <form onSubmit={handleNotify}>
        <label>*This product is currently out of stock</label>
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
        <button
          className="notify-btn btn btn-dark btn-block btn-rounded d-flex justify-content-center align-items-center text-capitalize font-weight-semi-bold mt-3"
          type="submit"
          disabled={loading}
        >
          Notify me when available
          {loading && <div className="spin-loader ml-2" />}
        </button>
      </form>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    user: state.user.data,
  };
}

export default connect(mapStateToProps)(ProductNotify);
