import { API, graphqlOperation } from "aws-amplify";
import { toast } from "react-toastify";

import AlertPopup from "~/components/features/product/common/alert-popup";
import { emailRegEx, phoneRegEx } from "~/constant";
import { getZipCode } from "~/graphql/api";
import { removePhonePrefix } from "./helper";

const validateZipCode = async (pincode, type) => {
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

export const checkValidation = async (address, type = "ALL") => {
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
    error.phone = "please enter valid phone number";
  }
  if (!isValidPinCode) {
    if (type === "PREPAID" && pinCode) {
      error.pincode = "Online Delivery is not available at this pincocde";
    } else if (type === "COD" && pinCode) {
      error.pincode = "Cash on Delivery is not available at this pincocde";
    } else {
      error.pincode = "please enter valid pincode";
    }
  }
  if (!firstName || !lastName) {
    error.name = "please enter name";
  }
  if (!email && !emailRegEx.test(email)) {
    error.email = "please enter correct email";
  }
  if (!streetAddress) {
    error.address = "please enter addres";
  }
  if (!city) {
    error.city = "please enter city";
  }
  if (Object.keys(error).length > 0) {
    return error;
  } else {
    return null;
  }
};
