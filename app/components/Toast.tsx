"use client";

import { useContext } from "react";
import { LoginContext } from "../providers/LoginProvider";

const Toast = () => {
  const { isActiveToast, toastText } =
    useContext(LoginContext);

  if (!isActiveToast) {
    return
  }

  return (
    <div className="toast toast-top toast-end z-[90] w-20">
      <div className="alert alert-success text-white flex justify-center">
        <span>{toastText}</span>
      </div>
    </div>
  );
};

export default Toast;
