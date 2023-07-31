import * as Sentry from "@sentry/browser";
import { alertToaster } from "./popupHelper";

export const errorHandler = (error) => {
  if (typeof error === "string" || error?.message) {
    alertToaster(error?.message, "error");
    Sentry.captureException(error?.message || error);
  } else {
    console.error("error :>> ", error);
    alertToaster("Something went wrong!", "error");
    Sentry.captureException(JSON.stringify(error));
  }
};
