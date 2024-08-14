import { toast } from "material-react-toastify";

class ToastAlert {
  static error(msg) {
    toast.error(`Error: ${msg}`);
  }
  static success(msg) {
    toast.success(`Success: ${msg}`);
  }
  static warn(msg) {
    toast.warn(`Warning: ${msg}`);
  }
  static info(msg) {
    toast.info(`Info: ${msg}`);
  }
}

export default ToastAlert;
