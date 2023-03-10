import React, { useCallback, useState } from "react";
import { connect } from "react-redux";
import { API } from "aws-amplify";

import { updateUser as updateUserMutation } from "~/graphql/api";
import { removePhonePrefix } from "~/utils/helper";
import { userActions } from "~/store/user";

function AccountDetails({ user, updateUserData }) {
  const [userDetail, setUser] = useState({ ...user });
  const updateUser = useCallback(
    async (e) => {
      e.preventDefault();
      await API.graphql({
        query: updateUserMutation,
        variables: {
          input: {
            id: user.id,
            firstName: userDetail.firstName,
            lastName: userDetail.lastName,
          },
        },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      })
        .then(({ data: { updateUser } }) => {
          updateUserData(updateUser);
        })
        .catch((_err) => {});
      return false;
    },
    [userDetail, user]
  );
  return (
    <form onSubmit={updateUser} className="form">
      <div className="row">
        <div className="col-sm-6">
          <label>First Name *</label>
          <input
            type="text"
            className="form-control"
            name="first_name"
            required
            value={userDetail.firstName}
            onChange={(e) => setUser({ firstName: e.target.value })}
          />
        </div>
        <div className="col-sm-6">
          <label>Last Name *</label>
          <input
            type="text"
            className="form-control"
            name="last_name"
            required
            value={userDetail.lastName}
            onChange={(e) => setUser({ lastName: e.target.value })}
          />
        </div>
      </div>

      <label>Email Address *</label>
      <input
        type="email"
        className="form-control"
        name="email"
        required
        value={userDetail.email}
        onChange={(e) => setUser({ email: e.target.value })}
        disabled
      />
      <label>Phone *</label>
      <div className="input-tel form-control">
        <div className="prefix">+91</div>
        <input
          type="tel"
          name="phone"
          required
          maxLength={10}
          value={removePhonePrefix(userDetail.phone)}
          onChange={(e) => setUser({ phone: e.target.value })}
          disabled
        />
      </div>

      <button type="submit" className="btn btn-primary">
        SAVE CHANGES
      </button>
    </form>
  );
}

function mapStateToProps(state) {
  return {
    user: state.user.data,
  };
}

export default connect(mapStateToProps, {
  updateUserData: userActions.setUser,
})(AccountDetails);
