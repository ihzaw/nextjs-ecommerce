"use client";

import { createContext, useState } from "react";

const initialValue = {
  isLoggedIn: false,
  setIsLoggedIn: (value: boolean) => {},
};

export const LoginContext = createContext(initialValue);

export default function LoginProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  return (
    <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </LoginContext.Provider>
  );
}
