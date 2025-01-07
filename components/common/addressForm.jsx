import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSetState } from "react-use";
import { API } from "aws-amplify";
import { connect } from "react-redux";
import { useCartTotal } from "@wow-star/utils";

import { createUserAddress, updateUserAddress } from "~/graphql/api";
import { removePhonePrefix } from "~/utils/helper";
import States from "~/lib/states.json";
import { validateAddress, getProperAddress } from "~/utils/address";
import { errorHandler } from "~/utils/errorHandler";
import { fetchCityAndState } from "~/utils/addAddress";
import { eventActions } from "~/store/events";
import BottomDrawer from "~/components/common/bottomDrawer";
import useWindowDimensions from "~/utils/getWindowDimension";
import { userActions } from "~/store/user";

const AddressForm = (props) => {
  const {
    defaultAddress,
    customUser,
    user,
    onAddress,
    onSubmit,
    addressAdded,
    onClose,
    setIsValidAddress,
    noAddress,
    variant,
    setUserLocalAddress,
    userAddress,
  } = props;
  const { firstName, lastName, email, phone } = user || customUser || {};
  const { isSmallSize: isMobile } = useWindowDimensions();
  const errorRef = useRef(null);

  const [address, setAddress] = useSetState({
    firstName: userAddress?.firstName || firstName || "",
    lastName: userAddress?.lastName || lastName || "",
    email: userAddress?.email || email || null,
    phone: userAddress?.phone || phone || "",
    address: userAddress?.address || "",
    state: userAddress?.state || "AN",
    city: userAddress?.city || "",
    pinCode: userAddress?.pinCode || "",
    landmark: userAddress?.landmark || "",
    area: userAddress?.area || "",
  });

  const { totalPrice } = useCartTotal({
    paymentType: "PREPAID",
  });

  useEffect(() => {
    if (user || customUser) {
      setAddress((prevState) => ({
        ...prevState,
        phone: user?.phone || customUser?.phone || "",
      }));
    }
  }, [user || customUser]);

  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCityAndStateData = useCallback(async (pinCode) => {
    const result = await fetchCityAndState(pinCode);
    if (result) {
      setAddress({ city: result.city, state: result.state });
    }
  }, []);

  const isEditMode = !!defaultAddress?.name;

  useEffect(() => {
    if (
      address.pinCode.length === 6 &&
      (!isEditMode ||
        defaultAddress?.pinCode !== address.pinCode ||
        defaultAddress?.city !== address.city)
    ) {
      fetchCityAndStateData(address.pinCode);
    }
  }, [address.pinCode]);

  useEffect(() => {
    if (!!errors) {
      errorRef?.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [errors]);

  useEffect(() => {
    if (defaultAddress?.name) {
      setAddress({
        ...defaultAddress,
        firstName: defaultAddress?.name?.split(" ")[0] || "",
        lastName: defaultAddress?.name?.split(" ")[1] || "",
      });
    }
  }, [defaultAddress]);

  const addAddress = useCallback(
    async (e) => {
      e?.preventDefault();
      setLoading(true);
      const err = await validateAddress(address, "ALL", noAddress);
      if (variant === "CHECKOUT") setIsValidAddress(!err);

      if (!err) {
        try {
          const tempAddress = getProperAddress(address);
          if (variant === "CARD") {
            //for logged and from address tab in account
            const key = address.id ? "updateUserAddress" : "createUserAddress";
            const {
              data: { [key]: response },
            } = await API.graphql({
              query: address.id ? updateUserAddress : createUserAddress,
              variables: { input: { ...tempAddress, userID: user.id } },
              authMode: "AMAZON_COGNITO_USER_POOLS",
            });
            if (!address.id) {
              addressAdded(tempAddress, totalPrice);
            }
            onSubmit(response);
          } else if (noAddress) {
            onAddress({
              ...address,
              name: address?.firstName + " " + address.lastName,
            });
          } else if (user) {
            if (onAddress) {
              onAddress(tempAddress);
            }
            const key = address.id ? "updateUserAddress" : "createUserAddress";
            const {
              data: { [key]: response },
            } = await API.graphql({
              query: address.id ? updateUserAddress : createUserAddress,
              variables: { input: { ...tempAddress, userID: user.id } },
              authMode: "AMAZON_COGNITO_USER_POOLS",
            });
            if (!address.id) {
              addressAdded(tempAddress, totalPrice);
            }
            onSubmit(response);
          } else {
            onAddress({
              ...address,
              name: address?.firstName + " " + address.lastName,
            });
          }

          setLoading(false);
        } catch (errors) {
          errorHandler(errors);
          setLoading(false);
        }
      } else {
        if (variant === "CARD" || !noAddress) setErrors(err);
        setLoading(false);
      }
      return false;
    },
    [address, user, onSubmit]
  );

  useEffect(async () => {
    if (variant === "CHECKOUT" && noAddress) addAddress();
    setUserLocalAddress(address);
  }, [address]);

  useEffect(() => {
    return () => {
      setUserLocalAddress(null);
    };
  }, []);
  return isMobile && !noAddress ? (
    <BottomDrawer
      title="Address"
      isOpen={true}
      onClose={onClose}
      maxHeight={50}
      description="Hey! Tell us where to deliver."
      showOverlay
    >
      <div className="bg-white mb-6">
        <form className="form" onSubmit={addAddress}>
          <div className="row">
            <div className="col-lg-12  mb-lg-0 pr-lg-4">
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
                      disabled={!!user}
                      onChange={(e) =>
                        setAddress({
                          phone: (e.target.value || "")
                            .replaceAll(/[^0-9]+/g, "")
                            .trim(),
                        })
                      }
                    />
                  </div>
                </div>
                <div className="col-xs-6">
                  <label>Email Address (Optional)</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email-address"
                    value={address?.email}
                    onChange={(e) =>
                      setAddress({ email: e.target.value.trim() })
                    }
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
              <label>Pincode *</label>
              <input
                type="text"
                className="form-control"
                name="pincode"
                placeholder="Your pincode"
                required
                maxLength={6}
                minLength={6}
                value={address.pinCode}
                onChange={(e) => setAddress({ pinCode: e.target.value })}
                onBlur={(e) => {
                  setAddress({ pinCode: e.target.value.trim() });
                }}
              />
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
                    className="select-dropdown"
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
            </div>
          </div>

          {!!errors && (
            <div className="overflow-hidden mb-4" ref={errorRef}>
              <div className="alert alert-danger alert-summary alert-light alert-message alert-inline">
                <ul className="m-0">
                  {Object.values(errors).map((val) => (
                    <li key={val}>{val}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {(variant === "CARD" || !noAddress) && (
            <button
              className="mobile-drawer-address-btn btn btn-primary btn-block btn-rounded d-flex justify-content-center align-items-center"
              type="submit"
              disabled={loading}
            >
              {address.id || isEditMode ? "Save Address" : "Add Address"}
              {loading && <div className="spin-loader ml-2" />}
            </button>
          )}
        </form>
      </div>
    </BottomDrawer>
  ) : (
    <div className="bg-white pl-3 pt-3 pr-3">
      <form className="form" onSubmit={addAddress}>
        <div className="">
          <div className="col-lg-12  mb-lg-0 pr-lg-4">
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
                    disabled={!!user}
                    onChange={(e) =>
                      setAddress({
                        phone: (e.target.value || "")
                          .replaceAll(/[^0-9]+/g, "")
                          .trim(),
                      })
                    }
                  />
                </div>
              </div>
              <div className="col-xs-6">
                <label>Email Address (Optional)</label>
                <input
                  type="email"
                  className="form-control"
                  name="email-address"
                  value={address?.email}
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
            <label>Pincode *</label>
            <input
              type="text"
              className="form-control"
              name="pincode"
              placeholder="Your pincode"
              required
              maxLength={6}
              minLength={6}
              value={address.pinCode}
              onChange={(e) => setAddress({ pinCode: e.target.value })}
              onBlur={(e) => {
                setAddress({ pinCode: e.target.value.trim() });
              }}
            />
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
                  className="select-dropdown"
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
          </div>
        </div>

        {!!errors && (
          <div className="overflow-hidden mb-4">
            <div className="alert alert-danger alert-summary alert-light alert-message alert-inline">
              <ul className="m-0">
                {Object.values(errors).map((val) => (
                  <li key={val}>{val}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {(variant === "CARD" || !noAddress) && (
          <button
            className="btn btn-primary btn-block btn-rounded d-flex justify-content-center align-items-center mb-2"
            type="submit"
            disabled={loading}
          >
            {address.id || isEditMode ? "Save Address" : "Add Address"}
            {loading && <div className="spin-loader ml-2" />}
          </button>
        )}
      </form>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    user: state.user.data,
    customUser: state.user.custom,
    userAddress: state.user.userAddress,
  };
}

export default connect(mapStateToProps, {
  addressAdded: eventActions.addressAdded,
  setUserLocalAddress: userActions.setUserLocalAddress,
})(AddressForm);
