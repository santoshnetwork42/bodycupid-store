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

const pad = (num) => ("0" + parseInt(num)).substr(-2);

export const diliveryRemainingTime = () => {
  var start = new Date();
  start.setHours(18, 0, 0); // 3pm
  var now = new Date();
  var remain = (start - now) / 1000;
  var hh = parseInt(pad((remain / 60 / 60) % 60));
  var mm = parseInt(pad((remain / 60) % 60));
  if (hh >= 0) {
    return hh > 0 ? `${hh} hrs ${mm} mins` : `${mm} mins`;
  }
};
