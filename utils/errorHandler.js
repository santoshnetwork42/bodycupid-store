import * as Sentry from "@sentry/browser";
import { toast } from "react-toastify";
import AlertPopup from "~/components/features/product/common/alert-popup";

export const errorHandler = (error) => {
  Sentry.captureException(error);
  toast(<AlertPopup message={error?.message || error} status="error" />);
};
