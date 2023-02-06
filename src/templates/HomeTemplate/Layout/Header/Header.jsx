import { Button } from "antd";
import React, { Fragment } from "react";
import { Navigate, NavLink } from "react-router-dom";

import { useSelector } from "react-redux";
import _ from "lodash";

const Header = (props) => {
  const { userLogin } = useSelector((state) => state.reducer);

  const renderLogin = () => {
    if (_.isEmpty(userLogin)) {
      return (
        <Fragment>
          <NavLink to="/login">
            <button className="cursor-pointer self-center px-8 py-3 rounded">
              Đăng ký
            </button>
          </NavLink>
          <NavLink to="/register">
            <button className="cursor-pointer self-center ml-2 px-8 py-3 font-semibold rounded bg-yellow-500 text-gray-900">
              Đăng nhập
            </button>
          </NavLink>
        </Fragment>
      );
    }

    return (
      <div className="mr-2">
        <span className="mr-1">Xin chào, {userLogin.hoTen}</span>
        <Button
          type="primary"
          onClick={() => {
            localStorage.removeItem("USER_LOGIN");
            localStorage.removeItem("TOKEN");
            <Navigate to="/home" replace />;
            window.location.reload();
          }}
        >
          Đăng xuất
        </Button>
      </div>
    );
  };

  return (
    <header className="px-4 py-1 bg-gray-800 text-gray-100 sticky top-0 z-50">
      <div className="container flex justify-between h-16 mx-auto">
        <NavLink
          rel="noopener noreferrer"
          to="/"
          aria-label="Back to homepage"
          className="flex items-center p-2"
        >
          <img src="/img/cyberlogo-white.png" className="w-40" alt="" />
        </NavLink>
        <ul className="items-stretch hidden space-x-3 lg:flex">
          <li className="flex">
            <NavLink
              rel="noopener noreferrer"
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center px-4 -mb-1 border-b-2 border-transparent text-yellow-400 no-underline"
                  : "flex items-center px-4 -mb-1 border-b-2 border-transparent text-white no-underline"
              }
            >
              Home
            </NavLink>
          </li>
          <li className="flex">
            <NavLink
              rel="noopener noreferrer"
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center px-4 -mb-1 border-b-2 border-transparent text-yellow-400"
                  : "flex items-center px-4 -mb-1 border-b-2 border-transparent text-white no-underline"
              }
            >
              Contact
            </NavLink>
          </li>
          <li className="flex">
            <NavLink
              rel="noopener noreferrer"
              to="/news"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center px-4 -mb-1 border-b-2 border-transparent text-yellow-400"
                  : "flex items-center px-4 -mb-1 border-b-2 border-transparent text-white no-underline"
              }
            >
              News
            </NavLink>
          </li>
        </ul>
        <div className="items-center flex-shrink-0 hidden lg:flex">
          {renderLogin()}
        </div>
        <button className="p-4 lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 text-gray-100"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
