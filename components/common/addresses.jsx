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
  setIsValidAddress,
}) {
  const { isSmallSize: isMobile } = useWindowDimensions();
  const [loading, setLoading] = useState(!!user);
  const [selected, setSelected] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [isOpen, setOpen] = useState(false);
  const [defaultAddress, setDefaultAddress] = useState({});
  const [noAddress, setNoAddress] = useState(false);

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

      if (variant === "CHECKOUT" && !!userAddresses?.total) {
        setIsValidAddress(true);
      }
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
        const userAddresses = await getUserAddress();
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

  const combineLandmarkAndArea = (landmark = "", area = "") => {
    let combinedString = "";

    if (landmark) {
      combinedString += landmark;
    }
    if (landmark && area) {
      combinedString += ", ";
    }
    if (area) {
      combinedString += area;
    }

    return combinedString;
  };

  useEffect(() => {
    if (onAddressChange && selected) {
      const adr = addresses?.find((a) => a.id === selected.id);
      if (adr) {
        onAddressChange({
          id: adr.id,
          firstName: adr?.firstName || adr?.name?.split(" ")[0] || "",
          lastName: adr?.lastName || adr?.name?.split(" ")[1] || "",
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
          name: adr?.firstName + " " + adr?.lastName,
        });
      } else {
        onAddressChange(null);
      }
    }

    setNoAddress(!addresses?.length);
  }, [selected, addresses]);

  if (loading) return <></>;

  return (
    <div className="container">
      {!noAddress && (
        <>
          <div
            className={`row ${
              isMobile
                ? "d-flex mobile-address-wrapper address-cards-wrapper"
                : ""
            }`}
          >
            {variant !== "CHECKOUT" && (
              <p className="mb-2">
                The following addresses can be used on the checkout page.
              </p>
            )}
            {addresses.map((adr) => (
              <Fragment key={adr.id}>
                <div
                  className={`col-sm-6 mb-4 accordion-border`}
                  onClick={() => {
                    setSelected(adr);
                    addressSelected(adr, totalPrice);
                  }}
                >
                  <div className={`card card-border-radius card-address w-100`}>
                    <div className="card-border-radius card-body pr-4 pl-3 pt-2 pb-2 cursor-pointer bg-white">
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
                            className={`card-title mb-1 ${
                              adr.id === selected?.id && !!onAddressChange
                                ? "collapse"
                                : " "
                            }`}
                          >
                            {adr.name}
                          </h5>
                          <div className="add-lables-values d-flex-col gap-2">
                            {adr?.email && (
                              <span className="checkout-email-lable">
                                {adr?.email} <br />
                              </span>
                            )}
                            <span className="address-card-limit">
                              {combineLandmarkAndArea(adr?.landmark, adr?.area)}
                            </span>

                            <div className="add-wrap">
                              <div className="d-flex">
                                {adr?.city && <span>{adr?.city}</span>}{" "}
                                {adr?.city && adr?.pinCode && (
                                  <span>&nbsp;-&nbsp;</span>
                                )}
                                {adr?.pinCode && <span>{adr?.pinCode}</span>}
                              </div>
                              {adr?.state && <span>{adr?.state} &nbsp;</span>}

                              {adr?.phone && (
                                <div className="d-flex gap-2">
                                  <span>Mobile:</span>
                                  <span>
                                    {adr?.phone} <br />
                                  </span>
                                </div>
                              )}
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
                              Edit
                            </ALink>
                            {!!adr?.id && (
                              <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
                            )}
                            {user && (
                              <ALink
                                href="#"
                                className="btn btn-link btn-secondary btn-underline"
                                onClick={() => removeAddress(adr.id, user?.id)}
                              >
                                Remove
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
          {user && (
            <button
              onClick={() => {
                setOpen(true);
                setDefaultAddress(null);
              }}
              className={`btn btn-primary w-50 ${isMobile ? "ml-2" : ""}`}
            >
              ADD NEW ADDRESS
            </button>
          )}
        </>
      )}

      {/* {!selected && variant === "CHECKOUT" && !!addresses.length && (
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
      )} */}

      {noAddress && (
        <div className={``}>
          <AddressForm
            onSubmit={onAddress}
            onAddress={onAddressChange}
            setIsValidAddress={setIsValidAddress}
            noAddress={noAddress}
            variant={variant}
          />
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
          setIsValidAddress={setIsValidAddress}
          noAddress={noAddress}
          variant={variant}
          onClose={() => {
            setOpen(false);
          }}
        />
      </Modal>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    user: state.user.data,
    userAddress: state.user.userAddress,
    isAddressesModal: state.modal.allAddressModal,
  };
}

export default connect(mapStateToProps, {
  openAllAddressModal: modalActions.openAllAddressModal,
  closeAllAddressModal: modalActions.closeAllAddressModal,
  addressSelected: eventActions.addressSelected,
})(Addresses);
