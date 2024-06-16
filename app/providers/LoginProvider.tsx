"use client";

import { createContext, useEffect, useState } from "react";

const initialValue = {
  isLoggedIn: false,
  setIsLoggedIn: (value: boolean) => {},
  isActiveToast: false,
  setIsActiveToast: (value: boolean) => {},
  notify: (value: string) => {},
  toastText: ''
};

export const LoginContext = createContext(initialValue);

export default function LoginProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isActiveToast, setIsActiveToast] = useState(false);
  const [toastText, setToastText] = useState("");

  const notify = (newToastText: string) => {
    setIsActiveToast(true);
    setToastText(newToastText);
  };

  const resetToast = () => {
    setToastText('')
    setIsActiveToast(false)
  }

  useEffect(() => {
    const userLoggedIn = !!localStorage.getItem("user");
    setIsLoggedIn(userLoggedIn);
  }, []);

  useEffect(() => {
    if (isActiveToast) {
      setTimeout(() => {
        resetToast()
      }, 3500)
    }
  }, [isActiveToast]);

  return (
    <LoginContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        isActiveToast,
        setIsActiveToast,
        notify,
        toastText,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
}
