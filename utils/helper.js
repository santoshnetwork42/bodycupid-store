export const addPhonePrefix = (number) => {
  if (number && !number.includes("+91")) return "+91" + number;
  return number;
};

export const removePhonePrefix = (number) => {
  if (number && number.includes("+91")) return number.split("+91")[1];
  return number;
};

export const cleanQuery = (data) => {
  return Object.entries(data).reduce((a, [k, v]) => {
    if (v) return { ...a, [k]: v };
    return a;
  }, {});
};
export const getProperAddress = (address) => {
  let tempAddress = {
    ...address,
    name: address.firstName + " " + address.lastName,
    country: "IN",
    phone: addPhonePrefix(address.phone),
  };
  delete tempAddress.firstName;
  delete tempAddress.lastName;
  return tempAddress;
};
