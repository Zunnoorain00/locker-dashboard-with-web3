import React, { useState } from "react";

import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import "../App.css";
const Navbar = () => {
  return (
    <>
      <div className="top-navbar-button">
        <button className="button-shadow shadow p-3 mb-5 rounded" type="button">
          <i className="fa-solid fa-bars fa-lg"></i>Menu
        </button>
      </div>
      <div className="center-navbar-button">
        <Link
          to={"/dashboard"}
          className="button-shadow shadow p-3 mb-5 rounded"
        >
          <i className="fa-solid fa-house fa-lg"></i>Dashboard
        </Link>

        <Dropdown>
          <Dropdown.Toggle
            variant="success"
            id="dropdown-basic"
            className="button-shadow shadow p-3 mb-5 bg-white rounded"
          >
            <i className="fa-solid fa-lock fa-lg"></i>Token Lock
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Link
              to={"/standardtokenlock"}
              className="dropdown-item active-tab"
            >
              Standard Locker{" "}
            </Link>

            <Link to={"/rewardlocker"} className="dropdown-item">
              Reward Locker
            </Link>
          </Dropdown.Menu>
        </Dropdown>
        <Link
          to={"/lptoken"}
          className="button-shadow shadow p-3 mb-5 bg-white rounded"
        >
          <i className="fa-solid fa-lock fa-lg"></i> LP Token
        </Link>
      </div>
    </>
  );
};

export default Navbar;
