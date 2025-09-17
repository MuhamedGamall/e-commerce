import { JSX, useCallback } from "react";
import { toast } from "react-toastify";

interface INotify {
  type: "success" | "error" | "info" | "warning";
  message: string | JSX.Element;
  id?: string;
  autoClose?: number;
}

const useNotify = () => {
  const notify = useCallback(
    ({ type, message, id, autoClose = 2000 }: INotify) => {
      toast[type](message, { toastId: id, autoClose });
    },
    []
  );

  return { notify };
};

export default useNotify;
