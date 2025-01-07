import { API, graphqlOperation } from "aws-amplify";

import { PHONE_REGEX, EMAIl_REGEX } from "~/constant";
import { getZipCode } from "~/graphql/api";
import States from "~/lib/states.json";
import { addPhonePrefix, removePhonePrefix } from "./helper";
import { alertToaster } from "./popupHelper";

export const getProperAddress = (address) => {
  let tempAddress = {
    ...address,
    country: "IN",
    phone: addPhonePrefix(address?.phone),
  };
  if (address.firstName || address.lastName) {
    tempAddress = {
      ...tempAddress,
      name: address.firstName + " " + address.lastName,
    };
    delete tempAddress.firstName;
    delete tempAddress.lastName;
  }
  if (!address.email) {
    delete tempAddress.email;
  }

  return tempAddress;
};

export const validateZipCode = async (
  pincode,
  paymentType,
  showToastOnError = false
) => {
  try {
    if (pincode) {
      const {
        data: { getZipCode: response },
      } = await API.graphql(graphqlOperation(getZipCode, { id: pincode }));
      if (response) {
        if (paymentType === "ALL") return true;
        if (paymentType == "PREPAID") return response.prepaid;
        return response.cod;
      }
      if (pincode?.length >= 6 && showToastOnError)
        alertToaster(
          `  We're sorry! We currently don't deliver to this pincode. However,
              we're working hard to expand our service areas and hope to reach
              your location soon. Please try a different delivery address to
              proceed.`,
          "info",
          "top-center",
          1000
        );
    }
  } catch (error) {
    alertToaster("Something went wrong", "error");
  }
  return null;
};

export const isValidAddress = (address) => {
  const {
    firstName,
    lastName,
    city,
    pinCode,
    address: streetAddress,
  } = address || {};

  if (!firstName || !streetAddress || !city || !pinCode) {
    return false;
  }
  return true;
};

export const validateAddress = async (
  address,
  paymentType = "ALL",
  showToastOnError
) => {
  const {
    firstName,
    lastName,
    email,
    city,
    phone,
    pinCode,
    address: streetAddress,
  } = address || {};
  const error = {};

  const isValidPinCode = await validateZipCode(
    pinCode,
    paymentType,
    showToastOnError
  );

  if (!phone || !PHONE_REGEX.test(removePhonePrefix(phone))) {
    error.phone = "Please enter valid phone number";
  }
  if (email?.trim() && !EMAIl_REGEX.test(email?.trim())) {
    error.email = "Please enter valid email";
  }

  if (!isValidPinCode) {
    if (!pinCode) {
      error.pincode = "Please enter valid pincode";
    } else if (!!pinCode) {
      error.pincode = `We're sorry! We currently don't deliver to this pincode.
      However, we're working hard to expand our service areas and
      hope to reach your location soon. Please try a different delivery
      address to proceed.`;
    }
  }

  if (!firstName) {
    error.firstname = "Please enter firstname";
  }
  if (!lastName) {
    error.lastname = "Please enter lastname";
  }
  if (!streetAddress) {
    error.address = "Please enter address";
  }
  if (!city) {
    error.city = "Please enter city";
  }
  if (Object.keys(error).length > 0) {
    return error;
  } else {
    return null;
  }
};

export const formatUserAddress = (address) => {
  const state = States.find(
    (s) => s.name.toLocaleLowerCase() === address?.state.toLocaleLowerCase()
  )?.value;

  return {
    ...address,
    name: address.first_name + " " + address.last_name,
    pinCode: address.pincode,
    country: "IN",
    state,
    phone: address.recipient_phone || address.phone,
  };
};
