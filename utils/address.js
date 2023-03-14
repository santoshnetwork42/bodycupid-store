import { API, graphqlOperation } from "aws-amplify";
import { toast } from "react-toastify";

import AlertPopup from "~/components/features/product/common/alert-popup";
import { emailRegEx, phoneRegEx } from "~/constant";
import { getZipCode } from "~/graphql/api";
import { removePhonePrefix } from "./helper";

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

export const validateZipCode = async (pincode, type) => {
  try {
    if (pincode) {
      const {
        data: { getZipCode: response },
      } = await API.graphql(graphqlOperation(getZipCode, { id: pincode }));
      if (response) {
        if (type === "ALL") return true;
        if (type == "PREPAID") return response.prepaid;
        return response.cod;
      }
    }
  } catch (error) {
    toast(<AlertPopup message={"Something went wrong"} status="error" />);
  }
  return null;
};

export const validateAddress = async (address, type = "ALL") => {
  const {
    firstName,
    lastName,
    email,
    city,
    phone,
    pinCode,
    address: streetAddress,
  } = address;
  const error = {};

  const isValidPinCode = await validateZipCode(pinCode, type);

  if (!phone || !phoneRegEx.test(removePhonePrefix(phone))) {
    error.phone = "Please enter valid phone number";
  }

  if (!isValidPinCode) {
    if (!pinCode) {
      error.pincode = "Please enter valid pincode";
    } else if (type === "PREPAID") {
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
  if (!email || !emailRegEx.test(email)) {
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
