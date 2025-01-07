import { toast } from "react-toastify";
import AlertPopup from "~/components/features/product/common/alert-popup";

export const alertToaster = (
  message,
  type = "info",
  position = "bottom-center",
  autoClose = 3000
) => {
  return toast(<AlertPopup message={message} status={type} />, {
    position: position || "bottom-center",
    autoClose: autoClose || 3000,
  });
};
