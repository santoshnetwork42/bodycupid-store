import React, { useCallback, useState } from "react";
import { connect } from "react-redux";
import { API } from "aws-amplify";
import { Logger } from 'aws-amplify';
import { updateUser as updateUserMutation } from "~/graphql/api";
import { removePhonePrefix } from "~/utils/helper";
import { userActions } from "~/store/user";
import { errorHandler } from "~/utils/errorHandler";

const logger = new Logger('AccountDetails');

function AccountDetails({ user, updateUserData }) {
  const [userDetail, setUser] = useState({ ...user });
  const [loading, setLoading] = useState(false);
  const updateUser = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);
      await API.graphql({
        query: updateUserMutation,
        variables: {
          input: {
            id: user.id,
            firstName: userDetail.firstName,
            lastName: userDetail.lastName,
            email: userDetail.email,
          },
        },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      })
        .then(({ data: { updateUser } }) => {
          updateUserData(updateUser);
          setLoading(false);
          logger.info('User data updated');
          logger.debug('User data updated:', updateUser);
        })
        .catch((_err) => {
          errorHandler(_err)
          setLoading(false);
          logger.error('Failed to update user data:', _err);
        });
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
            onChange={(e) =>
              setUser({ ...userDetail, firstName: e.target.value })
            }
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
            onChange={(e) =>
              setUser({ ...userDetail, lastName: e.target.value })
            }
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
        onChange={(e) => setUser({ ...userDetail, email: e.target.value })}
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
          disabled
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary d-flex justify-content-center align-items-center"
        disabled={loading}
      >
        SAVE CHANGES
        {loading && <div className="spin-loader ml-2" />}
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
