import * as Sentry from "@sentry/browser";
import { alertToaster } from "./popupHelper";

export const errorHandler = (error) => {
  if (typeof error === "string" || error?.message) {
    console.log(error?.message || error);
    // alertToaster(error?.message || error, "error");
    // Sentry.captureException(error?.message || error);
  } else {
    console.log(JSON.stringify(error));
    // alertToaster("Something went wrong!", "error");
    // Sentry.captureException(JSON.stringify(error));
  }
};
