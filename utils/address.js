import { API, graphqlOperation } from "aws-amplify";

import { PHONE_REGEX, EMAIl_REGEX } from "~/constant";
import { getZipCode } from "~/graphql/api";
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

export const validateZipCode = async (pincode, paymentType) => {
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

export const validateAddress = async (address, paymentType = "ALL") => {
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

  const isValidPinCode = await validateZipCode(pinCode, paymentType);

  if (!phone || !PHONE_REGEX.test(removePhonePrefix(phone))) {
    error.phone = "Please enter valid phone number";
  }
  if (!email?.trim() || !EMAIl_REGEX.test(email?.trim())) {
    error.email = "Please enter valid email";
  }

  if (!isValidPinCode) {
    if (!pinCode || paymentType === "ALL") {
      error.pincode = "Please enter valid pincode";
    } else if (paymentType === "PREPAID") {
      error.pincode = "Online Delivery is not available at this pincocde";
    } else {
      error.pincode = "Cash on Delivery is not available at this pincocde";
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
