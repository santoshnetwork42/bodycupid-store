import { toast } from "react-toastify";
import AlertPopup from "~/components/features/product/common/alert-popup";

export const alertToaster = (message, type = "info") => {
  return toast(<AlertPopup message={message} status={type} />, {
    position: "bottom-center",
    autoClose: 3000,
  });
};
