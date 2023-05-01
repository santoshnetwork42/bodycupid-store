import { API, graphqlOperation } from "aws-amplify";
import { toast } from "react-toastify";

import AlertPopup from "~/components/features/product/common/alert-popup";
import { EMAIl_REGEX, PHONE_REGEX } from "~/constant";
import { getZipCode } from "~/graphql/api";
import { addPhonePrefix, removePhonePrefix } from "./helper";

export const getProperAddress = (address) => {
  if (address.firstName || address.lastName) {
    let tempAddress = {
      ...address,
      name: address.firstName + " " + address.lastName,
      country: "IN",
      phone: addPhonePrefix(address.phone),
    };
    delete tempAddress.firstName;
    delete tempAddress.lastName;
    return tempAddress;
  }
  return address;
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
    toast(<AlertPopup message={"Something went wrong"} status="error" />);
  }
  return null;
};

export const isValidAddress = (address) => {
  const {
    firstName,
    lastName,
    email,
    city,
    pinCode,
    address: streetAddress,
  } = address || {};

  if (
    !firstName ||
    !lastName ||
    !email ||
    !streetAddress ||
    !city ||
    !pinCode
  ) {
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
  if (!email || !EMAIl_REGEX.test(email)) {
    error.email = "Please enter correct email";
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
