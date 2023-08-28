import { toast } from "react-toastify";

export function userNotification(status, message) {
  toast[status](message, {
    position: "top-center",
    autoClose: 3000,
    theme: "colored",
  });
}
