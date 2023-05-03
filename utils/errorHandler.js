import * as Sentry from "@sentry/browser";
import { toast } from "react-toastify";
import AlertPopup from "~/components/features/product/common/alert-popup";

export const errorHandler = (error) => {
  if (typeof error === "string" || error?.message) {
    toast(<AlertPopup message={error?.message || error} status="error" />);
    Sentry.captureException(error?.message || error);
  } else {
    toast(<AlertPopup message="Something went wrong!" status="error" />);
    Sentry.captureException(JSON.stringify(error));
  }
};
