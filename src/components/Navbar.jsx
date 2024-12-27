import React, { useState } from "react";
import "../index.css";
import { NavLink, useLocation } from "react-router-dom";
import { IoMenu } from "react-icons/io5";

const Navbar = () => {
  const location = useLocation();
  const [show, setShow] = useState(false);

  const toggleSidebar = () => {
    setShow(!show);
  };

  return (
    <>
      <div className="flex w-full h-auto text-white bg-[#0A2647] justify-between shadow-md relative z-10">
        <div className="flex items-center">
          <h1 className="text-3xl p-3 ml-10">My Website</h1>
        </div>
        <nav className="flex flex-row p-3 mr-10 gap-4 items-center">
          {/* Desktop Navigation Links */}
          <button className="text-xl hidden lg:flex">
            <NavLink
              to="/"
              className={`${
                location.pathname === "/dashboard"
                  ? "text-white underline"
                  : "no-underline text-white"
              }`}
            >
              Dashboard
            </NavLink>
          </button>
          <button className="text-xl hidden lg:flex">
            <NavLink
              to="/form"
              className={`${
                location.pathname === "/form"
                  ? "text-white underline"
                  : "no-underline text-white"
              }`}
            >
              Form
            </NavLink>
          </button>
          
          {/* Mobile Menu Icon */}
          <IoMenu
            className="flex justify-center text-4xl cursor-pointer relative lg:hidden"
            onClick={toggleSidebar}
          />
        </nav>
      </div>

      {/* Sidebar for Mobile */}
      {show && (
        <div className="flex flex-col justify-center bg-[#2C74B3] w-[200px] h-auto top-[75px] absolute right-0 shadow-md lg:hidden">
          <div className="flex flex-col gap-1">
            <div className="bg-[#205295] shadow-md cursor-pointer">
              <NavLink
                to="/"
                className={`${
                  location.pathname === "/dashboard"
                    ? "text-white"
                    : "text-white no-underline"
                }`}
              >
                <h3 className="text-white flex justify-center p-2 text-xl">Dashboard</h3>
              </NavLink>
            </div>
            <div className="bg-[#205295] shadow-md cursor-pointer">
              <NavLink
                to="/form"
                className={`${
                  location.pathname === "/form"
                    ? "text-white"
                    : "text-white no-underline"
                }`}
              >
                <h3 className="text-white flex justify-center p-2 text-xl">Form</h3>
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
