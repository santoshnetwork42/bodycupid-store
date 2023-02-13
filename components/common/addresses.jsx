import React, { useCallback, useEffect, useState } from "react";
import { API } from "aws-amplify";
import Modal from "react-modal";
import { connect } from "react-redux";
import { useSetState } from "react-use";

import ALink from "~/components/features/custom-link";
import { listUserAddresses } from "~/graphql/queries";
import {
  createUserAddress,
  updateUserAddress,
  deleteUserAddress,
} from "~/graphql/mutations";

const modalStyles = {
  content: {
    position: "relative",
  },
  overlay: {
    background: "rgba(0,0,0,.4)",
    overflowX: "hidden",
    overflowY: "auto",
    display: "flex",
  },
};

function Addresses({ user, selected, onSelect }) {
  const [addresses, setAddresses] = useState([]);
  const [isOpen, setOpen] = useState(false);
  const [address, setAddress] = useSetState({
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

  const getUserAddress = useCallback(async () => {
    const {
      data: { listUserAddresses: userAddresses },
    } = await API.graphql({
      query: listUserAddresses,
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });

    setAddresses(userAddresses.items);
  }, []);

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
    if (user) {
      getUserAddress();
    }
  }, [user]);

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
          if (address.id) {
            setAddresses(
              addresses.map((a) => (a.id === address.id ? response : a))
            );
          } else {
            setAddresses([...addAddress, response]);
          }
        } else {
          setAddresses([{ ...address }]);
        }
      } catch (error) {
        console.log(error);
      }
      setOpen(false);
      return false;
    },
    [address, user, addresses]
  );

  const removeAddress = useCallback(
    async (id) => {
      await API.graphql({
        query: deleteUserAddress,
        variables: { input: { id } },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });
      setAddresses(addresses.filter((a) => a.id !== id));
    },
    [addresses]
  );

  return (
    <div>
      <div className="row mt-4">
        {addresses.map((adr) => (
          <div className="col-sm-6 mb-4 accordion-border" key={adr.id}>
            <div
              className={`card card-address ${
                adr.id === selected ? "selected" : ""
              }`}
            >
              <div className="card-body pr-4 pl-4 pt-3">
                <h5 className="card-title text-uppercase">{adr.name}</h5>
                <p>
                  {adr.email}
                  <br />
                  {adr.phone}
                  <br />
                  {adr.address}
                  <br />
                  {adr.area}
                  <br />
                  {adr.landmark}
                  <br />
                  {adr.city + ", " + adr.state + ", " + adr.pinCode}
                </p>
                <ALink
                  href="#"
                  className="btn btn-link btn-secondary btn-underline"
                  onClick={() => {
                    setAddress({ ...adr });
                    setOpen(true);
                  }}
                >
                  Edit <i className="far fa-edit"></i>
                </ALink>
                <ALink
                  href="#"
                  className="btn btn-link btn-secondary btn-underline ml-3"
                  onClick={() => removeAddress(adr.id)}
                >
                  Delete <i className="far fa-trash-alt"></i>
                </ALink>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button onClick={() => setOpen(true)} className="btn btn-primary">
        ADD NEW ADDRESS
      </button>

      <Modal
        isOpen={isOpen}
        style={modalStyles}
        onRequestClose={() => setOpen(false)}
        shouldReturnFocusAfterClose={false}
        overlayClassName="address-modal-overlay"
        className="address-popup bg-img"
      >
        <form className="form" onSubmit={addAddress}>
          <div className="row">
            <div className="col-lg-12  mb-6 mb-lg-0 pr-lg-4">
              <h3 className="title title-simple text-left text-uppercase">
                Shipping Address
              </h3>
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
                  <input
                    type="tel"
                    className="form-control"
                    name="phone"
                    required
                    value={address.phone}
                    onChange={(e) => setAddress({ phone: e.target.value })}
                  />
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

            <button
              type="submit"
              className="btn btn-dark btn-rounded btn-order"
            >
              Add Address
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    user: state.user.data,
  };
}

export default connect(mapStateToProps)(Addresses);
