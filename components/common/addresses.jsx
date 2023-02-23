import React, { useCallback, useEffect, useState } from "react";
import { API } from "aws-amplify";
import Modal from "react-modal";
import { connect } from "react-redux";

import ALink from "~/components/features/custom-link";
import { listUserAddresses } from "~/graphql/queries";
import { deleteUserAddress } from "~/graphql/mutations";
import AddressForm from "./addressForm";
import { findUserAddresses } from "~/graphql/api";

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

function Addresses({ user, selected: newSelected, onSelect, autoSelect }) {
  const [selected, setSelected] = useState(newSelected);
  const [addresses, setAddresses] = useState([]);
  const [isOpen, setOpen] = useState(false);
  const [defaultAddress, setDefaultAddress] = useState({
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
  useEffect(() => {
    if (!newSelected && autoSelect && addresses.length) {
      setSelected(addresses[0]?.id);
    }
  }, [addresses]);

  const getUserAddress = useCallback(async () => {
    const {
      data: { searchUserAddresses: userAddresses },
    } = await API.graphql({
      query: findUserAddresses,
      variables: {
        filter: { userID: { eq: user.username } },
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });

    setAddresses(userAddresses.items);
  }, []);

  useEffect(() => {
    if (user) {
      getUserAddress();
    }
  }, [user]);

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
  const onAddress = (id, response) => {
    if (id) {
      setAddresses(addresses.map((a) => (a.id === id ? response : a)));
    } else {
      setAddresses([...addresses, response]);
    }
  };

  const onAddressClick = useCallback(
    (adr) => {
      setSelected(adr.id);
      if (onSelect) {
        onSelect({
          id: adr.id,
          name: adr.name,
          phone: adr.phone,
          email: adr.email,
          country: adr.country,
          state: adr.state,
          city: adr.city,
          pinCode: adr.pinCode,
          landmark: adr.landmark,
          address: adr.address,
          location: adr.location,
          area: adr.area,
        });
      }
    },
    [onSelect]
  );

  return (
    <div>
      <div className="row mt-4">
        {addresses.map((adr) => (
          <div
            className="col-sm-6 mb-4 accordion-border"
            key={adr.id}
            onClick={() => onAddressClick(adr)}
          >
            <div
              className={`card card-address ${
                adr.id === selected ? "selected" : ""
              }`}
            >
              <div className="card-body pr-4 pl-4 pt-3 cursor-pointer">
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
                    setDefaultAddress({ ...adr });
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
      {addresses.length > 0 ? (
        <button onClick={() => setOpen(true)} className="btn btn-primary">
          ADD NEW ADDRESS
        </button>
      ) : (
        <AddressForm
          setAddresses={setAddresses}
          addresses={addresses}
          user={user}
          onAddressClick={onAddressClick}
          onAddress={onAddress}
        />
      )}

      <Modal
        isOpen={isOpen}
        style={modalStyles}
        onRequestClose={() => setOpen(false)}
        shouldReturnFocusAfterClose={false}
        overlayClassName="address-modal-overlay"
        className="address-popup bg-img"
      >
        <AddressForm
          defaultAddress={defaultAddress}
          setOpen={setOpen}
          setAddresses={setAddresses}
          addresses={addresses}
          user={user}
          isOpen={isOpen}
          onAddressClick={onAddressClick}
          onAddress={onAddress}
        />
        <button
          title="Close (Esc)"
          type="button"
          className="mfp-close"
          onClick={() => setOpen(false)}
        >
          <span>×</span>
        </button>
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
