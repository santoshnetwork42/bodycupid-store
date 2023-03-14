export const checkValidation = async (address, isValidPinCode) => {
  const { firstName, lastName, email, city, phone } = address;
  const phoneregEx = /^\d{10}$/;
  const emailregEx =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  const error = {};
  if (!phoneregEx.test(removePhonePrefix(phone)) || !phone) {
    error.phone = "Enter valid phone number";
  }
  if (!isValidPinCode) {
    error.zipcode = "Enter valid pincode";
  }
  if (!firstName || !lastName) {
    error.name = "please enter name";
  }
  if (!email && !emailregEx.test(email)) {
    error.email = "please enter correct email";
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
