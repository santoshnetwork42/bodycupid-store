import React, { useCallback, useEffect, useState } from "react";
import { API } from "aws-amplify";
import { connect } from "react-redux";

import ALink from "~/components/features/custom-link";
import AddressForm from "./addressForm";
import { deleteUserAddress } from "~/graphql/mutations";
import { findUserAddresses } from "~/graphql/api";
import Modal from "~/components/common/modal";

function Addresses({ user, onAddressChange }) {
  const [loading, setLoading] = useState(!!user);
  const [selected, setSelected] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [isOpen, setOpen] = useState(false);
  const [defaultAddress, setDefaultAddress] = useState({});

  const getUserAddress = useCallback(async () => {
    const {
      data: { searchUserAddresses: userAddresses },
    } = await API.graphql({
      query: findUserAddresses,
      variables: {
        filter: { userID: { eq: user.id } },
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });

    setAddresses(userAddresses.items);
    setLoading(false);
    setSelected(userAddresses.items[0]?.id);
  }, [user]);

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

  const onAddress = (response) => {
    if (defaultAddress?.id) {
      setAddresses(
        addresses.map((a) => (a.id === defaultAddress.id ? response : a))
      );
    } else {
      setAddresses([...addresses, response]);
      setSelected(response.id);
    }
    setOpen(false);
    setDefaultAddress(null);
  };

  useEffect(() => {
    if (onAddressChange && selected) {
      const adr = addresses.find((a) => a.id === selected);
      onAddressChange({
        id: adr.id,
        firstName: adr.name.split(" ")[0],
        lastName: adr.name.split(" ")[1],
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
  }, [selected, addresses]);

  if (loading) return <></>;

  return (
    <div>
      {addresses.length > 0 ? (
        <>
          <div className="row mt-4">
            {addresses.map((adr) => (
              <div
                className="col-sm-6 mb-4 accordion-border"
                key={adr.id}
                onClick={() => setSelected(adr.id)}
              >
                <div
                  className={`card card-address ${
                    adr.id === selected && !!onAddressChange ? "selected" : ""
                  }`}
                >
                  <div className="card-body pr-4 pl-4 pt-3 cursor-pointer">
                    <h5 className="card-title text-uppercase">{adr.name}</h5>
                    <p className="add-lables-values">
                      {adr?.email && (
                        <span>
                          {adr?.email} <br />
                        </span>
                      )}
                      {adr?.phone && (
                        <span>
                          {adr?.phone} <br />
                        </span>
                      )}
                      {adr?.address && (
                        <span className="add-address">
                          {adr?.address}
                          <br />
                        </span>
                      )}
                      {adr?.area && (
                        <span>
                          {adr?.area} <br />
                        </span>
                      )}
                      {adr?.landmark && (
                        <span>
                          {adr?.landmark} <br />
                        </span>
                      )}
                      <span>
                        {`${adr?.city}, ${adr?.state}, ${adr?.pinCode}`}
                      </span>
                    </p>
                    <div className="add-bottom-btn">
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
              </div>
            ))}
          </div>
          <button
            onClick={() => {
              setOpen(true);
              setDefaultAddress(null);
            }}
            className="btn btn-primary"
          >
            ADD NEW ADDRESS
          </button>
        </>
      ) : (
        <AddressForm onSubmit={onAddress} onAddress={onAddressChange} />
      )}

      <Modal
        isOpen={isOpen}
        onRequestClose={() => setOpen(false)}
        shouldReturnFocusAfterClose={false}
        overlayClassName="address-modal-overlay"
        className="address-popup bg-img"
      >
        <AddressForm defaultAddress={defaultAddress} onSubmit={onAddress} />
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
