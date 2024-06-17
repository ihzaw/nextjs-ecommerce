"use client";

import { ButtonHTMLAttributes } from "react";
import { Loader } from "react-feather";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  label?: string
}

const Button = (props: ButtonProps) => {
  const { label, isLoading, children } = props
  return (
    <button {...props}>
      {children}
    </button>
  );
};

export default Button;
