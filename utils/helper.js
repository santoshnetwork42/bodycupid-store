import { getCartTotals } from "utils";
import { alertToaster } from "./popupHelper";
import { getFirstVariant } from "./products";
import { moeEvent } from "./events";

export const addPhonePrefix = (number) => {
  if (number && !number.includes("+91")) return "+91" + number;
  return number;
};
export const removeHtmlTags = (input) => {
  return input.replace(/<\/?[^>]+(>|$)/g, "");
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

  function isMobile() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    return /android|iphone|ipod|blackberry|iemobile|opera mini/i.test(
      userAgent
    );
  }

  if (hasTouch() && isMobile()) {
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

    if (
      c.cartItemSource === "LIMITED_TIME_DEAL" &&
      c.parentRecordKey === recordKey &&
      payload.recordKey
    ) {
      c.parentRecordKey = payload.recordKey;
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

export const getBxAyOnQuantity = (buyXQuantity, cartList) => {
  const { totalItems } = getCartTotals(cartList);
  return Math.floor(totalItems / buyXQuantity) * buyXQuantity;
};

export const getSource = () => {
  return typeof window !== "undefined" && window?.innerWidth > 575
    ? "Web"
    : "Mobile";
};

export function initializeMoengageAndAddInfo({
  firstName,
  lastName,
  email,
  phone,
}) {
  const Moengage = window?.Moengage;
  if (Moengage) {
    const mobile = phone?.split("+91")[1];
    if (firstName) Moengage.add_first_name(firstName);
    if (lastName) Moengage.add_last_name(lastName);
    if (email) Moengage.add_email(email);
    if (mobile) Moengage.add_mobile(mobile);
    if (mobile) Moengage.add_unique_user_id(mobile);
  }
}

export async function fetchSearchItems(search, limit = 20) {
  const NEXT_PUBLIC_TTM_CLIENT_URL = process.env.NEXT_PUBLIC_TTM_CLIENT_URL;
  const NEXT_PUBLIC_TTM_CLIENT_API_KEY =
    process.env.NEXT_PUBLIC_TTM_CLIENT_API_KEY;
  const NEXT_PUBLIC_TTM_CLIENT_THRESHOLD =
    process.env.NEXT_PUBLIC_TTM_CLIENT_THRESHOLD;
  try {
    const response = await fetch(
      `${NEXT_PUBLIC_TTM_CLIENT_URL}/search?query=${encodeURIComponent(
        search
      )}&threshold=${NEXT_PUBLIC_TTM_CLIENT_THRESHOLD}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${NEXT_PUBLIC_TTM_CLIENT_API_KEY}`,
        },
      }
    );
    const data = await response.json();
    return data?.results || [];
  } catch (error) {
    console.error("Error fetching items:", error);
    return [];
  }
}

export function trackEvent(title, payload) {
  if (window?.Moengage) {
    moeEvent(title, payload);
  } else {
    window?.addEventListener("MOE_LIFECYCLE", function (e) {
      if (e.detail.name === "SDK_INITIALIZED") {
        moeEvent(title, payload);
      }
    });
  }
}

export const orderStatusBadge = {
  CONFIRMED: {
    color: "#008000",
  },
  CANCELLED: {
    color: "#ff0000",
  },
  DISPATCHED: {
    color: "#0EA5E9",
  },
  DELIVERED: {
    color: "#0000ff",
  },
};

export const getCKLocalData = (prefix) => {
  const keysAndValues = {};
  for (const i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith(prefix)) {
      const value = localStorage.getItem(key);
      keysAndValues[key] = value;
    }
  }
  return keysAndValues;
};

export const deleteCKLocalData = () => {
  Object.keys(localStorage).forEach(function (key) {
    if (/^bw_/.test(key)) {
      localStorage.removeItem(key);
    }
  });
};
export const checkAffiseValidity = () => {
  const ckSurvivalMinutes = 30 * 24 * 60;
  // Retrieve local storage data with a specific prefix
  const ckLocalData = getCKLocalData("bw_");
  console.log("ckLocalData :", ckLocalData);
  if (
    ckLocalData.bw_timestamp &&
    ckLocalData.bw_clickid &&
    (ckLocalData.bw_utm_medium === "affise_affiliate" ||
      ckLocalData.bw_utm_medium.toLowerCase().includes("affise_affiliate"))
  ) {
    const epochTimestamp = ckLocalData.bw_timestamp;
    const date = new Date(epochTimestamp * 1000);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    const formattedDateTime =
      year +
      "-" +
      month +
      "-" +
      day +
      " " +
      hours +
      ":" +
      minutes +
      ":" +
      seconds;
    const providedDate = new Date(formattedDateTime);
    const currentDate = new Date();
    const timeDifference = currentDate - providedDate;
    const minutesDifference = timeDifference / (1000 * 60);

    // Check if the difference is within the survival days
    if (minutesDifference <= ckSurvivalMinutes) {
      // Check if tracking parameters are present
      if (
        !("bw_gclid" in ckLocalData) &&
        !("bw_fbclid" in ckLocalData) &&
        !("bw_igshid" in ckLocalData) &&
        !("bw_gad_source" in ckLocalData) &&
        !("bw_msclkid" in ckLocalData)
      ) {
        // Send postback data
        return true;
      }
    } else {
      // Delete local storage data if it's older than the survival days
      deleteCKLocalData();
      return false;
    }
  } else {
    console.log("Clickid or utm_source or timestamp not found");
    return false;
  }
};

export const sortingOptionsForCollection = Object.freeze({
  RECOMMENDED: "default",
  LATEST: "latest",
  BEST_SELLERS: "best-seller",
  HIGHEST_RATED: "popularity",
  PRICE_HIGH_TO_LOW: "price-high",
  PRICE_LOW_TO_HIGH: "price-low",
  AVAILABILITY: "availability",
});
