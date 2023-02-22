import React, { useCallback, useEffect } from "react";
import { useSetState } from "react-use";
import { API } from "aws-amplify";

import { createUserAddress, updateUserAddress } from "~/graphql/mutations";
import { removePhonePrefix } from "~/utils/helper";

const AddressForm = ({
  defaultAddress,
  setAddresses,
  addresses,
  user,
  onAddressClick = () => {},
  onAddress = () => {},
  setOpen = () => {},
  isOpen,
  onAddressChange,
  hideSubmit = false,
}) => {
  const [address, setAddress] = useSetState(defaultAddress);

  useEffect(() => {
    if (!isOpen) {
      setAddress({
        userID: user?.username,
        name: user?.attributes?.name,
        phone: user?.attributes?.phone_number,
        email: user?.attributes?.email,
        country: "in",
        state: "",
        city: "",
        pinCode: "",
        landmark: "",
        address: "",
        location: "",
        area: "",
      });
    }
  }, [isOpen]);

  useEffect(() => {
    if (onAddressChange) {
      onAddressChange(address);
    }
  }, [address]);

  const addAddress = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        if (user) {
          const key = address.id ? "updateUserAddress" : "createUserAddress";
          const {
            data: { [key]: response },
          } = await API.graphql({
            query: address.id ? updateUserAddress : createUserAddress,
            variables: { input: address },
            authMode: "AMAZON_COGNITO_USER_POOLS",
          });
          onAddress(address.id, response);

          onAddressClick(response);
        } else {
          setAddresses([{ ...address }]);
          onAddressClick({ ...address });
        }
      } catch (error) {
        console.log(error);
      }
      setOpen(false);
      return false;
    },
    [address, user, addresses, onAddressClick]
  );

  return (
    <div>
      <form className="form" onSubmit={addAddress}>
        <div className="row">
          <div className="col-lg-12  mb-6 mb-lg-0 pr-lg-4">
            <div className="row">
              <div className="col-xs-12">
                <label>Name *</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  required
                  value={address.name}
                  onChange={(e) => setAddress({ name: e.target.value })}
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
                />
              </div>
            </div>
          </div>

          {!hideSubmit && (
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

export default AddressForm;
