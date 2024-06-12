"use client";

import { useState } from "react";
import { Key, Mail, User } from "react-feather";

const LoginForm = () => {
  const [formMode, setFormMode] = useState<LoginFormMode>("login");
  const [loginForm, setLoginForm] = useState<LoginFormInterface>({
    email: "",
    password: "",
    fullName: ''
  });

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setLoginForm({
      ...loginForm,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const changeFormMode = (newMode: LoginFormMode) => {
    setFormMode(newMode);
  };

  return (
    <ul className="p-2 bg-base-100 rounded-t-none dropdown-content z-[1]">
      <form onSubmit={(e) => handleSubmit(e)}>
        {formMode === "register" && (
          <li className="mb-5">
            <label className="input input-bordered flex items-center gap-2 h-12">
              <User width={14} height={14} className="mr-3" />
              <input
                type="text"
                className="grow"
                placeholder="Full Name"
                name="fullName"
                value={loginForm.fullName}
                onChange={handleChange}
              />
            </label>
          </li>
        )}
        <li className="mb-5">
          <label className="input input-bordered flex items-center gap-2 h-12">
            <Mail width={14} height={14} className="mr-3" />
            <input
              type="text"
              className="grow"
              placeholder="Email"
              name="email"
              value={loginForm.email}
              onChange={handleChange}
            />
          </label>
        </li>
        <li className="mb-10">
          <label className="input input-bordered flex items-center gap-2 h-12">
            <Key width={14} height={14} className="mr-3" />
            <input
              type="password"
              className="grow"
              placeholder="Password"
              name="password"
              value={loginForm.password}
              onChange={handleChange}
            />
          </label>
        </li>
        <li className="mb-5">
          <button
            disabled={!loginForm.email || !loginForm.password}
            className="btn btn-outline"
            type="submit"
          >
            {formMode === "login" ? "Login" : "Register"}
          </button>
        </li>
        {formMode === "login" ? (
          <div
            className="text-end cursor-pointer hover:underline transition ease-in-out"
            onClick={() => changeFormMode("register")}
          >
            or register a new account
          </div>
        ) : (
          <div
            className="text-end cursor-pointer hover:underline transition ease-in-out"
            onClick={() => changeFormMode("login")}
          >
            back to login
          </div>
        )}
      </form>
    </ul>
  );
};

export default LoginForm;
