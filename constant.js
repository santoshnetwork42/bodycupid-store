export const PHONE_REGEX = /^\d{10}$/;
export const EMAIl_REGEX =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

export const PRODUCT_TAG_LIST = ["best-seller", "featured", "trending"];

export const DEFAULT_SORTING = {
  RECOMMENDED: "default",
  LATEST: "latest",
  BEST_SELLERS: "best-seller",
  HIGHEST_RATED: "popularity",
  PRICE_HIGH_TO_LOW: "price-high",
  PRICE_LOW_TO_HIGH: "price-low",
};

export const COD_CHARGES = "COD";
export const MAX_PREPAID_DISCOUNT = "MAX_PREPAID_DISCOUNT";
export const PREPAID_DISCOUNT = "PREPAID_DISCOUNT";
export const GUEST_CHECKOUT = "GUEST_CHECKOUT";
export const GUEST_CHECKOUT_COOKIE_EXPIRY = 48;
export const GEOCODING_API_URL =
  "https://maps.googleapis.com/maps/api/geocode/json";
export const MAX_COD_AMOUNT = "MAX_COD_AMOUNT";
export const COD_ENABLED = "COD_ENABLED";
export const PREPAID_ENABLED = "PREPAID_ENABLED";
export const TIMER_TTILE = "TIMER_TTILE";
export const TIMER_DESCRIPTION = "TIMER_DESCRIPTION";
export const TIMER_COLOR = "TIMER_COLOR";
export const TIMER_BG_COLOR = "TIMER_BG_COLOR";
export const TIMER_END_TIME = "TIMER_END_TIME";
export const TIMER_START_TIME = "TIMER_START_TIME";
export const IS_DAILY_TIMER = "IS_DAILY_TIMER";
export const TIMER_ENABLED = "TIMER_ENABLED";
export const LIMITED_TIME_DEAL_DURATION = 2;
