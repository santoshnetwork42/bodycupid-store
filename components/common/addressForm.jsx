import React, { useCallback, useEffect, useState } from "react";
import { useSetState } from "react-use";
import { API } from "aws-amplify";
import { connect } from "react-redux";
import { toast } from "react-toastify";

import { createUserAddress, updateUserAddress } from "~/graphql/mutations";
import { getProperAddress, removePhonePrefix } from "~/utils/helper";
import States from "~/lib/states.json";
import AlertPopup from "../features/product/common/alert-popup";
import { checkValidation } from "~/utils/addressFormValidation";

const AddressForm = (props) => {
  const { defaultAddress, user, onAddress, onSubmit, formErorrs } = props;
  const { firstName, lastName, email, phone } = user;
  const [address, setAddress] = useSetState({
    firstName: firstName,
    lastName: lastName,
    email: email,
    phone: phone,
    address: "",
    state: "AN",
    city: "",
    pinCode: "",
    landmark: "",
    area: "",
  });

  const [errors, setErrors] = useState(formErorrs || null);

  useEffect(() => {
    setErrors(formErorrs);
  }, [formErorrs]);

  useEffect(() => {
    if (onAddress) {
      onAddress(address);
    }
  }, [address]);

  useEffect(() => {
    if (defaultAddress && defaultAddress.name) {
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
        const isFormValid = await checkValidation(address);
        if (!isFormValid) {
          if (user) {
            const tempAddress = getProperAddress(address);
            const key = address.id ? "updateUserAddress" : "createUserAddress";
            const {
              data: { [key]: response },
            } = await API.graphql({
              query: address.id ? updateUserAddress : createUserAddress,
              variables: { input: { ...tempAddress, userID: user.id } },
              authMode: "AMAZON_COGNITO_USER_POOLS",
            });
            onSubmit(response);
          } else {
            onSubmit(tempAddress);
          }
        } else {
          setErrors(isFormValid);
        }
      } catch (errors) {
        toast(<AlertPopup message={"Something went wrong"} status="error" />);
      }
      return false;
    },
    [address, user, onSubmit, errors]
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
              <div className="col-xs-6 mb-3">
                <label>Phone *</label>
                <div className="input-tel">
                  <div className="prefix">+91</div>
                  <input
                    type="tel"
                    className="form-control mb-0"
                    name="phone"
                    maxLength={10}
                    value={removePhonePrefix(address.phone)}
                    required
                    onChange={(e) =>
                      setAddress({
                        phone: e.target.value.replaceAll(/[^0-9]+/g, "").trim(),
                      })
                    }
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
                  onChange={(e) => setAddress({ email: e.target.value.trim() })}
                />
              </div>
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
                  placeholder="Your city"
                  required
                  value={address.city}
                  onChange={(e) => setAddress({ city: e.target.value })}
                  onBlur={(e) => setAddress({ city: e.target.value.trim() })}
                />
              </div>
              <div className="col-xs-6">
                <label>State *</label>
                <select
                  name="state"
                  className="form-control"
                  required
                  value={address.state}
                  onChange={(e) => {
                    setAddress({ state: e.target.value });
                  }}
                >
                  {States.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-6">
                <label>Pincode *</label>
                <input
                  type="text"
                  className="form-control"
                  name="pincode"
                  placeholder="Your pincode"
                  required
                  value={address.pinCode}
                  onChange={(e) => setAddress({ pinCode: e.target.value })}
                  onBlur={(e) => {
                    setAddress({ pinCode: e.target.value.trim() });
                  }}
                />
              </div>
            </div>
          </div>

          {!!errors && (
            <div className="overflow-hidden mb-4">
              <div className="alert alert-danger alert-summary alert-light alert-message alert-inline">
                <ul className="m-0">
                  {Object.values(errors).map((val) => {
                    return <li>{val}</li>;
                  })}
                </ul>
              </div>
            </div>
          )}

          {!onAddress && (
            <button
              type="submit"
              className="btn btn-dark btn-rounded btn-order"
            >
              {address.id ? "Save Address" : "Add Address"}
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
