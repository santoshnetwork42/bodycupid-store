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

export const deliveryRemainingTime = () => {
  var start = new Date();
  start.setHours(15, 0, 0); // 3pm
  var now = new Date();
  var remain = (start - now) / 1000;
  var hh = parseInt(pad((remain / 60 / 60) % 60));
  var mm = parseInt(pad((remain / 60) % 60));
  if (hh >= 0) {
    return hh > 0 ? `${hh} hrs ${mm} mins` : `${mm} mins`;
  }
};

export const getProductMeta = (product) => {
  if (!product) return {};
  const { variants = {} } = product;
  const { items = [] } = variants;

  const images = product?.images.items.sort((a, b) => a.position - b.position);
  const thumbImage = images?.find((i) => i.isThumb) ||
    images[0] || { imageKey: product.imageUrl };

  const discount = !!(product.listingPrice && product.price)
    ? parseInt(
        ((product.listingPrice - product.price) * 100) / product.listingPrice,
        10
      )
    : 0;

  const firstVariantId = items.sort((a, b) => a.position - b.position)[0]?.id;

  return {
    thumbImage,
    discount,
    firstVariantId,
  };
};

export const getTotalPriceByField = (arr, field) => {
  const x = arr.reduce((accumulator, object) => {
    return accumulator + object[field];
  }, 0);

  return x;
};
