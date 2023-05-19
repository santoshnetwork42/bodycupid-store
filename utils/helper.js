import { getCartTotals } from "utils";
import { alertToaster } from "./popupHelper";
import { getFirstVariant } from "./products";

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

const pad = (num) => ("0" + parseInt(num)).substr(-2);

export const deliveryRemainingTime = () => {
  var start = new Date();
  start.setHours(15, 0, 0); // 3pm
  var now = new Date();
  var remain = (start - now) / 1000;
  var hh = parseInt(pad((remain / 60 / 60) % 60));
  var mm = parseInt(pad((remain / 60) % 60));
  if (hh >= 0) {
    return hh > 0
      ? `${hh} ${hh > 1 ? "hours" : "hour"} ${mm} minutes`
      : `${mm} minutes`;
  }
};

export const getTotalPriceByField = (arr, field) => {
  const x = arr.reduce((accumulator, object) => {
    return accumulator + object[field];
  }, 0);

  return x;
};

export const scrollWithOffset = (id, offset, callback) => {
  const ele = document.getElementById(id);
  if (ele) {
    const elementPosition = ele.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
    if (callback) callback(ele);
  }
};

export const removeHoverEffect = () => {
  function hasTouch() {
    return (
      "ontouchstart" in document.documentElement ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0
    );
  }

  if (hasTouch()) {
    try {
      for (var si in document.styleSheets) {
        var styleSheet = document.styleSheets[si];
        if (!styleSheet.rules) continue;

        for (var ri = styleSheet.rules.length - 1; ri >= 0; ri--) {
          if (!styleSheet.rules[ri].selectorText) continue;

          if (styleSheet.rules[ri].selectorText.match(":hover")) {
            styleSheet.deleteRule(ri);
          }
        }
      }
    } catch (ex) {}
  }
};

export const getSplitedArray = (array, size) => {
  let result = [];
  if (!array.length) return [];

  for (let i = 0; i < array.length; i += size) {
    result.push([...array].splice(i, size));
  }
  return result;
};

export const getSortedCategory = (items) => {
  if (Array.isArray(items))
    return items.sort((a, b) => a.priority - b.priority);
  return [];
};

export const getSortedCategoryAndSubCategory = (items) => {
  const result = items.map((i) => {
    if (i.subCategory) {
      return {
        ...i,
        subCategory: {
          ...i.subCategory,
          items: getSortedCategory(i.subCategory.items),
        },
      };
    }
    return i;
  });
  return result;
};

export const copyText = (copyText, message) => {
  if (copyText && navigator?.clipboard) {
    navigator.clipboard.writeText(copyText);
    alertToaster(message, "info");
  }
};

export const getUpdatedCart = (cartList, recordKey, payload) => {
  return [...cartList].map((c) => {
    if (recordKey === c.recordKey) {
      return { ...c, ...payload };
    }
    return c;
  });
};

export const getRecordKey = (product, variantId) => {
  const { id } = product;
  if (variantId) return `${id}-${variantId}`;

  const firstVariant = getFirstVariant(product);
  if (firstVariant) return `${id}-${firstVariant.id}`;

  return id;
};

export const getBxGyFreeQuantity = (getYQuantity, buyXQuantity, cartList) => {
  const { totalItems } = getCartTotals(cartList);
  return (
    Math.floor(
      (totalItems -
        (totalItems * buyXQuantity) / (buyXQuantity + getYQuantity)) /
        getYQuantity
    ) * getYQuantity
  );
};
