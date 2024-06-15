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

  const isLoggedIn = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") ?? "")
    : null;

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
    setIsErrorLogin(false)
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
        localStorage.setItem("user", JSON.stringify(data));
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
    setIsErrorLogout(false)
    const user: UserInterface | null = JSON.parse(
      localStorage.getItem("user") ?? ""
    );

    if (user) {
      fetch(logoutApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.access}`,
        },
        body: JSON.stringify({
          refresh: user.refresh,
        }),
      })
        .then(async (response) => {
          if (!response.ok) {
            setIsErrorLogout(true);
            return;
          }

          localStorage.removeItem("user");
        })
        .catch((e) => {
          setIsErrorLogout(true);
        })
        .finally(() => {
          setIsLoadingLogout(false);
        });
    }
  };

  const handleRegister = () => {
    setIsLoadingRegister(true);
    setIsErrorRegister(false)
    const payload = {
      email_address: loginForm.email,
      full_name: loginForm.fullName,
      password: loginForm.password,
    };
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

        setFormMode("login");
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
            {(isErrorLogin || isErrorRegister || isErrorLogout) && (
              <div className="flex justify-end mb-5 w-full">
                <p className="text-red-500 text-right text-wrap">
                  Something went wrong, <br /> Please try again
                </p>
              </div>
            )}
            <li className="mb-5">
              <button
                disabled={
                  !loginForm.email || !loginForm.password || isLoadingLogin
                }
                className="btn btn-outline"
                onClick={formMode === "login" ? handleLogin : handleRegister}
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
          <>
            <div className="text-right mb-5">
              <p>
                You're logged in,{" "}
                {JSON.parse(localStorage.getItem("user") ?? "").full_name}
              </p>
            </div>
            <button
              disabled={isLoadingLogout}
              className="btn btn-outline w-full"
              onClick={handleLogout}
              type="button"
            >
              {isLoadingLogout ? <Loader className="animate-spin" /> : "Logout"}
            </button>
          </>
        )}
      </form>
    </ul>
  );
};

export default LoginForm;
