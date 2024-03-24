import React, { Fragment, useCallback, useEffect, useState } from "react";
import { API } from "aws-amplify";
import { connect } from "react-redux";
import { useCartTotal } from "@wow-star/utils";

import ALink from "~/components/features/custom-link";
import AddressForm from "./addressForm";
import { deleteUserAddress } from "~/graphql/api";
import { findUserAddresses } from "~/graphql/api";
import Modal from "~/components/common/modal";
import { Cricle, CricleDot, Plus } from "../icons";
import { errorHandler } from "~/utils/errorHandler";
import { modalActions } from "~/store/modal";
import { useWindowDimensions } from "~/utils/getWindowDimension";
import { eventActions } from "~/store/events";
import { useGuestCheckout } from "~/utils/contexts/navbar";

function Addresses({
  user,
  onAddressChange,
  variant = "CARD",
  isAddressesModal,
  openAllAddressModal,
  closeAllAddressModal,
  addressSelected,
}) {
  const { isSmallSize: isMobile } = useWindowDimensions();
  const [loading, setLoading] = useState(!!user);
  const [selected, setSelected] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [isOpen, setOpen] = useState(false);
  const [defaultAddress, setDefaultAddress] = useState({});
  const [isAddressFormVisible, setIsAddressFormVisible] = useState(false);

  const { totalPrice } = useCartTotal({
    paymentType: "PREPAID",
  });

  const guestCheckout = useGuestCheckout();

  const getUserAddress = useCallback(async () => {
    try {
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
      setSelected(userAddresses.items[0]);
      addressSelected(userAddresses.items[0], totalPrice);
      return userAddresses.items;
    } catch (error) {
      errorHandler(error);
    }
    return [];
  }, [user]);

  useEffect(() => {
    (async function () {
      if (user) {
        // const userAddresses = await getUserAddress();
        // if (!userAddresses.length && isMobile) {
        //   openAllAddressModal();
        // }
      }
    })();
  }, [user]);

  const removeAddress = useCallback(
    async (id, userID) => {
      await API.graphql({
        query: deleteUserAddress,
        variables: { input: { id, userID } },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });
      const remainingAddress = addresses.filter((a) => a.id !== id);
      setAddresses(remainingAddress);
      setSelected(remainingAddress[0]);
      setDefaultAddress(null);
    },
    [addresses]
  );

  const onAddress = (response) => {
    if (defaultAddress?.id) {
      setAddresses(
        addresses.map((a) => (a.id === defaultAddress.id ? response : a))
      );
    } else if (!user && defaultAddress?.name) {
      setAddresses([response]);
    } else {
      setAddresses([...addresses, response]);
    }
    setSelected(response);
    setOpen(false);
    setDefaultAddress(null);
  };

  useEffect(() => {
    if (onAddressChange && selected) {
      const adr = addresses.find((a) => a.id === selected.id);
      if (adr) {
        onAddressChange({
          id: adr.id,
          firstName: adr.name.split(" ")[0] || "",
          lastName: adr.name.split(" ")[1] || "",
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
      } else {
        onAddressChange(null);
      }
    }
  }, [selected, addresses]);

  if (loading) return <></>;

  return (
    <div className="container">
      {addresses.length > 0 && (
        <>
          <div className="row ">
            {variant !== "CHECKOUT" && (
              <p className="mb-2">
                The following addresses can be used on the checkout page.
              </p>
            )}
            {addresses.map((adr) => (
              <Fragment key={adr.id}>
                <div
                  className={`col-sm-6 mb-4 accordion-border ${
                    variant === "CHECKOUT" && "d-sm-none"
                  }`}
                  onClick={() => {
                    setSelected(adr);
                    addressSelected(adr, totalPrice);
                  }}
                >
                  <div className={`card card-address w-100`}>
                    <div className="card-body pr-4 pl-3 pt-2 pb-2 cursor-pointer bg-white">
                      <div className="d-flex">
                        {variant === "CHECKOUT" && (
                          <i className="radio-icon">
                            {adr.id === selected?.id && !!onAddressChange ? (
                              <CricleDot size={18} />
                            ) : (
                              <Cricle size={18} />
                            )}
                          </i>
                        )}
                        <div className="ml-2">
                          <h5
                            className={`card-title text-uppercase mb-1 ${
                              adr.id === selected?.id && !!onAddressChange
                                ? "collapse"
                                : " "
                            }`}
                          >
                            {adr.name}
                          </h5>
                          <div className="add-lables-values">
                            {adr?.email && (
                              <span className="checkout-email-lable">
                                {adr?.email} <br />
                              </span>
                            )}

                            {adr?.phone && (
                              <span>
                                {adr?.phone} <br />
                              </span>
                            )}
                            <div className="add-wrap">
                              <span className="add-address">
                                {adr?.address && (
                                  <span className="">
                                    {adr?.address}, &nbsp;
                                  </span>
                                )}
                                {adr?.area && <span>{adr?.area}, &nbsp;</span>}
                                {adr?.landmark && (
                                  <span>{adr?.landmark}, &nbsp;</span>
                                )}
                              </span>

                              <span>
                                {`${adr?.city}, ${adr?.state}, ${adr?.pinCode}`}
                              </span>
                            </div>
                          </div>
                          <div className="add-bottom-btn mt-2">
                            <ALink
                              href="#"
                              className="btn btn-link btn-secondary btn-underline btn-link-black"
                              onClick={() => {
                                setDefaultAddress({ ...adr });
                                setOpen(true);
                              }}
                            >
                              Edit <i className="far fa-edit"></i>
                            </ALink>
                            {user && (
                              <ALink
                                href="#"
                                className="btn btn-link btn-secondary btn-underline ml-3"
                                onClick={() => removeAddress(adr.id, user?.id)}
                              >
                                Delete <i className="far fa-trash-alt"></i>
                              </ALink>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Fragment>
            ))}
          </div>
          {!user && !!guestCheckout && addresses.length > 0 ? (
            <></>
          ) : (
            <button
              onClick={() => {
                setOpen(true);
                setDefaultAddress(null);
              }}
              className={`btn btn-primary w-50 ${
                variant === "CHECKOUT" && "d-sm-none"
              }`}
            >
              ADD NEW ADDRESS
            </button>
          )}
        </>
      )}

      {!!selected && variant === "CHECKOUT" && (
        <div className="row d-sm-show p-0">
          <div className="bg-white mobile-checkout-address d-flex">
            <div className="mobile-address-heading">
              <p className="m-0 lh-default">
                Deliver to:{" "}
                <span className="address-user-name">
                  {selected.name}, {selected?.pinCode}
                </span>
              </p>
              {selected?.address && (
                <span className="mobile-address-label">
                  {selected?.address} &nbsp;
                </span>
              )}
            </div>
            <button
              onClick={() => {
                openAllAddressModal();
              }}
              className="btn btn-primary btn-change"
            >
              Change
            </button>
          </div>
        </div>
      )}

      {!selected && variant === "CHECKOUT" && (
        <div className="row d-sm-show">
          <div
            className={`bg-white border-regular d-flex checkout-add-address-btn`}
            onClick={() => {
              openAllAddressModal();
            }}
          >
            <Plus size={16} color="currentColor" />
            <p className="m-0 add-address-label">Add new address</p>
          </div>
        </div>
      )}

      {!addresses.length && (
        <div className={`${variant === "CHECKOUT" && "row d-sm-none"}`}>
          <AddressForm onSubmit={onAddress} onAddress={onAddressChange} />
        </div>
      )}

      <Modal
        isOpen={isOpen}
        onRequestClose={() => setOpen(false)}
        shouldReturnFocusAfterClose={false}
        overlayClassName="address-modal-overlay"
        className="address-popup bg-img"
      >
        <AddressForm
          defaultAddress={defaultAddress}
          onSubmit={onAddress}
          onAddress={onAddressChange}
        />
      </Modal>

      <Modal
        isOpen={isAddressesModal}
        onRequestClose={() => {
          closeAllAddressModal();
          setIsAddressFormVisible(false);
        }}
        shouldReturnFocusAfterClose={false}
        overlayClassName="all-address-modal-overlay"
        className="bg-img all-address-popup"
      >
        <div className="checkout">
          {!!addresses?.length && !isAddressFormVisible ? (
            <>
              {addresses.map((adr) => (
                <div className="address-card mb-2" key={adr.id}>
                  <div className="card-header">
                    <ALink
                      href="#"
                      className={`text-body text-normal ls-m ${
                        adr.id === selected?.id ? "collapse" : ""
                      }`}
                      onClick={() => {
                        setSelected(adr);
                        closeAllAddressModal();
                      }}
                    >
                      <h5 className="card-title text-uppercase m-0">
                        {adr.name}
                      </h5>
                    </ALink>
                  </div>
                  <div className="checkout card-body  cursor-pointer bg-white pl-5">
                    <div className="add-lables-values">
                      {adr?.phone && (
                        <span>
                          {adr?.phone} <br />
                        </span>
                      )}
                      {adr?.address && <span>{adr?.address}</span>}
                      {adr?.pincode && <span>{adr?.pinCode}</span>}
                    </div>
                  </div>
                  <div className="add-bottom-btn pl-5 mb-1">
                    <ALink
                      href="#"
                      className="btn btn-link btn-secondary btn-underline btn-link-black"
                      onClick={() => {
                        setDefaultAddress({ ...adr });
                        setIsAddressFormVisible(true);
                      }}
                    >
                      Edit <i className="far fa-edit"></i>
                    </ALink>
                    {user && (
                      <ALink
                        href="#"
                        className="btn btn-link btn-secondary btn-underline ml-3"
                        onClick={() => removeAddress(adr.id, user?.id)}
                      >
                        Delete <i className="far fa-trash-alt"></i>
                      </ALink>
                    )}
                  </div>
                </div>
              ))}
              {!user && !!guestCheckout && addresses.length > 0 ? (
                <></>
              ) : (
                <div className="d-flex justify-content-center">
                  <button
                    onClick={() => {
                      setIsAddressFormVisible(true);
                    }}
                    className={`btn btn-primary `}
                  >
                    ADD NEW ADDRESS
                  </button>
                </div>
              )}
            </>
          ) : (
            <AddressForm
              defaultAddress={defaultAddress}
              onSubmit={(response) => {
                setIsAddressFormVisible(false);
                closeAllAddressModal();
                onAddress(response);
              }}
              onAddress={onAddressChange}
            />
          )}
        </div>
      </Modal>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    user: state.user.data,
    isAddressesModal: state.modal.allAddressModal,
  };
}

export default connect(mapStateToProps, {
  openAllAddressModal: modalActions.openAllAddressModal,
  closeAllAddressModal: modalActions.closeAllAddressModal,
  addressSelected: eventActions.addressSelected,
})(Addresses);
