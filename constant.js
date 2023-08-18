export const PHONE_REGEX = /^\d{10}$/;
export const EMAIl_REGEX =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

export const PRODUCT_TAG_LIST = [
  "best-seller",
  "featured",
  "trending",
  "top-product",
];

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

export const SEMANTIC_SEARCH_API_URL =
  "https://d1pnavmgsqoqas.cloudfront.net/search";
export const SEMANTIC_SEARCH_THRESHOLD = 0.7;
