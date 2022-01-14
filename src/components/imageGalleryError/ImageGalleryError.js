import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GalleryErrorView = () => {
  toast.error("No results found.Please, try again!");
};
export default GalleryErrorView;
