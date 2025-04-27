import toast from "react-hot-toast";
import { FC, useEffect } from "react";

const ErrorMessage: FC = () => {
  useEffect(() => {
    toast.error("Something went wrong, try it again...", { duration: 3000 });
  }, []);

  return null;
};

export default ErrorMessage;
