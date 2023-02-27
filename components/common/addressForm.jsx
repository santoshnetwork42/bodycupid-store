import React, { useCallback, useEffect } from "react";
import { useSetState } from "react-use";
import { API } from "aws-amplify";
import { connect } from "react-redux";

import { createUserAddress, updateUserAddress } from "~/graphql/mutations";
import { getProperAddress, removePhonePrefix } from "~/utils/helper";

const AddressForm = ({
  defaultAddress,
  user,
  onAddress,
  onSubmit,
  saveAddress,
}) => {
  const [address, setAddress] = useSetState(defaultAddress || {});
  useEffect(() => {
    if (onAddress) {
      let tempAddress = getProperAddress(address);
      onAddress(tempAddress);
    }
  }, [address]);
  useEffect(() => {
    if (defaultAddress) {
      setAddress({
        ...defaultAddress,
        firstName: defaultAddress.name.split(" ")[0],
        lastName: defaultAddress.name.split(" ")[1],
      });
    }
  }, [defaultAddress]);

  const addAddress = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        if (user) {
          let tempAddress = getProperAddress(address);
          const key = address.id ? "updateUserAddress" : "createUserAddress";
          const {
            data: { [key]: response },
          } = await API.graphql({
            query: address.id ? updateUserAddress : createUserAddress,
            variables: { input: { ...tempAddress, userID: user.username } },
            authMode: "AMAZON_COGNITO_USER_POOLS",
          });
          onSubmit(response);
        } else {
          onSubmit(tempAddress);
        }
      } catch (error) {
        console.log(error);
      }
      return false;
    },
    [address, user, onSubmit]
  );
  return (
    <div>
      <form className="form" onSubmit={addAddress}>
        <div className="row">
          <div className="col-lg-12  mb-6 mb-lg-0 pr-lg-4">
            <div className="row">
              <div className="col-xs-6">
                <label>First Name *</label>
                <input
                  type="text"
                  className="form-control"
                  name="firstName"
                  required
                  value={address?.firstName}
                  onChange={(e) =>
                    setAddress({ firstName: e.target.value.trim() })
                  }
                />
              </div>{" "}
              <div className="col-xs-6">
                <label>Last Name *</label>
                <input
                  type="text"
                  className="form-control"
                  name="lastName"
                  required
                  value={address?.lastName}
                  onChange={(e) =>
                    setAddress({ lastName: e.target.value.trim() })
                  }
                />
              </div>
              <div className="col-xs-6">
                <label>Phone *</label>
                <div className="input-tel">
                  <div className="prefix">+91</div>
                  <input
                    type="tel"
                    className="form-control mb-0"
                    name="phone"
                    value={removePhonePrefix(address.phone)}
                    required
                    onChange={(e) => setAddress({ phone: e.target.value })}
                    onBlur={(e) => setAddress({ phone: e.target.value.trim() })}
                  />
                </div>
              </div>
              <div className="col-xs-6">
                <label>Email Address *</label>
                <input
                  type="email"
                  className="form-control"
                  name="email-address"
                  required
                  value={address.email}
                  onChange={(e) => setAddress({ email: e.target.value })}
                  onBlur={(e) => setAddress({ email: e.target.value.trim() })}
                />
              </div>
              {/* <div className="col-xs-12">
            <label>Country / Region *</label>
            <div className="select-box">
              <select
                name="country"
                className="form-control"
                defaultValue="in"
                value={address.country}
                onChange={(e) =>
                  setAddress({ country: e.target.value })
                }
              >
                <option value="in">India</option>
                <option value="us">United States (US)</option>
                <option value="uk"> United Kingdom</option>
                <option value="fr">France</option>
                <option value="aus">Austria</option>
              </select>
            </div>
          </div> */}
            </div>

            <label>Street Address *</label>
            <input
              type="text"
              className="form-control"
              name="address1"
              required
              placeholder="House number and street name"
              value={address.address}
              onChange={(e) => setAddress({ address: e.target.value })}
              onBlur={(e) => setAddress({ address: e.target.value.trim() })}
            />
            <div className="row">
              <div className="col-xs-6">
                <label>Landmark (Optional)</label>
                <input
                  type="text"
                  className="form-control"
                  name="landmark"
                  placeholder="Landmark (optional)"
                  value={address.landmark}
                  onChange={(e) => setAddress({ landmark: e.target.value })}
                  onBlur={(e) =>
                    setAddress({ landmark: e.target.value.trim() })
                  }
                />
              </div>
              <div className="col-xs-6">
                <label>Area (Optional)</label>
                <input
                  type="text"
                  className="form-control"
                  name="address2"
                  placeholder="Area (optional)"
                  value={address.area}
                  onChange={(e) => setAddress({ area: e.target.value })}
                  onBlur={(e) => setAddress({ area: e.target.value.trim() })}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-xs-6">
                <label>Town / City *</label>
                <input
                  type="text"
                  className="form-control"
                  name="city"
                  required
                  value={address.city}
                  onChange={(e) => setAddress({ city: e.target.value })}
                  onBlur={(e) => setAddress({ city: e.target.value.trim() })}
                />
              </div>
              <div className="col-xs-6">
                <label>State *</label>
                <input
                  type="text"
                  className="form-control"
                  name="state"
                  required
                  value={address.state}
                  onChange={(e) => setAddress({ state: e.target.value })}
                  onBlur={(e) => setAddress({ state: e.target.value.trim() })}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-xs-6">
                <label>Pincode *</label>
                <input
                  type="text"
                  className="form-control"
                  name="pincode"
                  required
                  value={address.pinCode}
                  onChange={(e) => setAddress({ pinCode: e.target.value })}
                  onBlur={(e) => setAddress({ pinCode: e.target.value.trim() })}
                />
              </div>
            </div>
          </div>

          {!!saveAddress && (
            <div className="form-checkbox mb-5">
              <input
                type="checkbox"
                className="custom-checkbox"
                id="terms-condition"
                name="terms-condition"
                required
                onChange={(e) => setAddress({ saveAddress: e.target.checked })}
              />
              <label className="form-control-label" htmlFor="terms-condition">
                Save address for faster checkout
              </label>
            </div>
          )}

          {!onAddress && (
            <button
              type="submit"
              className="btn btn-dark btn-rounded btn-order"
            >
              Add Address
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    user: state.user.data,
  };
}

export default connect(mapStateToProps)(AddressForm);
