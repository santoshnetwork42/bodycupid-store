import * as Sentry from "@sentry/browser";
import { alertToaster } from "./popupHelper";

export const errorHandler = (error) => {
  console.error("error :>> ", error);
  if (typeof error === "string" || error?.message) {
    alertToaster(error?.message || error, "error");
    Sentry.captureException(error?.message || error);
  } else {
    alertToaster("Something went wrong!", "error");
    Sentry.captureException(JSON.stringify(error));
  }
};
