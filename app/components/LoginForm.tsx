"use client";

import { useEffect, useState } from "react";
import { Key, Loader, Mail, User } from "react-feather";
import { loginApi, logoutApi, registerApi } from "../api";
import { defaultLoginForm } from "../constants";

const LoginForm = () => {
  const [formMode, setFormMode] = useState<LoginFormMode>("login");
  const [loginForm, setLoginForm] =
    useState<LoginFormInterface>(defaultLoginForm);
  const [isLoadingLogin, setIsLoadingLogin] = useState<boolean>(false);
  const [isErrorLogin, setIsErrorLogin] = useState<boolean>(false);

  const isLoggedIn = localStorage.getItem("access_token");

  const [isLoadingLogout, setIsLoadingLogout] = useState<boolean>(false);
  const [isErrorLogout, setIsErrorLogout] = useState<boolean>(false);

  const [isLoadingRegister, setIsLoadingRegister] = useState<boolean>(false);
  const [isErrorRegister, setIsErrorRegister] = useState<boolean>(false);

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

  const handleLogin = () => {
    setIsLoadingLogin(true);
    fetch(loginApi, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: loginForm.email,
        password: loginForm.password,
      }),
    })
      .then(async (response) => {
        if (!response.ok) {
          setIsErrorLogin(true);
          return;
        }
        const data: LoginResponseInterface = await response.json();
        localStorage.setItem("access_token", data.access);
        localStorage.setItem("refresh_token", data.refresh);
        setLoginForm(defaultLoginForm);
      })
      .catch((e) => {
        setIsErrorLogin(true);
      })
      .finally(() => {
        setIsLoadingLogin(false);
      });
  };

  const handleLogout = () => {
    setIsLoadingLogout(true);
    const refreshToken = localStorage.getItem("refresh_token");
    const accessToken = localStorage.getItem("access_token");
    fetch(logoutApi, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        refresh: refreshToken,
      }),
    })
      .then(async (response) => {
        if (!response.ok) {
          setIsErrorLogin(true);
          return;
        }

        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
      })
      .catch((e) => {
        setIsErrorLogout(true);
      })
      .finally(() => {
        setIsLoadingLogout(false);
      });
  };

  const handleRegister = () => {
    setIsErrorRegister(true);
    const payload = {
      email_address: loginForm.email,
      full_name: loginForm.fullName,
      password: loginForm.password
    }
    fetch(registerApi, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then(async (response) => {
        if (!response.ok) {
          setIsErrorRegister(true);
          return;
        }

        setFormMode('login')
      })
      .catch((e) => {
        setIsErrorRegister(true);
      })
      .finally(() => {
        setIsLoadingRegister(false);
      });
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

        {!isLoggedIn && (
          <>
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
              {isErrorLogin || isErrorRegister || isErrorLogout && (
                <div className="flex justify-end">
                  <p className="text-red-500">Something went wrong</p>
                </div>
              )}
              <button
                disabled={
                  !loginForm.email || !loginForm.password || isLoadingLogin
                }
                className="btn btn-outline"
                onClick={formMode === "login"  ? handleLogin : handleRegister}
                type="submit"
              >
                {isLoadingLogin ? (
                  <Loader className="animate-spin" />
                ) : (
                  <>{formMode === "login" ? "Login" : "Register"}</>
                )}
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
          </>
        )}

        {isLoggedIn && (
          <button
            disabled={isLoadingLogout}
            className="btn btn-outline"
            onClick={handleLogout}
            type="button"
          >
            {isLoadingLogout ? <Loader className="animate-spin" /> : "Logout"}
          </button>
        )}
      </form>
    </ul>
  );
};

export default LoginForm;
