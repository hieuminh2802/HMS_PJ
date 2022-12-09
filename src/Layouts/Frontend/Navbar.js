import React, { useEffect, useRef, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { BiCartAlt, BiCategoryAlt, BiPencil } from "react-icons/bi";
import { IoIosHome } from "react-icons/io";
import { MdLogin, MdLogout } from "react-icons/md";
import Dropdown from "react-bootstrap/Dropdown";
import "../../Assets/frontend/css/nav.css";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";
import logo from "../../Assets/admin/img/logo3.png";
import { useContext } from "react";
import { useAppContext } from "../../Context/AppContext";

function Navbar() {
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };
  const { cartCount, user, isAuthenticated } = useAppContext();

  const history = useHistory();
  const logoutSubmit = (e) => {
    e.preventDefault();

    axios.post(`/api/logout`).then((res) => {
      if (res.data.status === 200) {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_name");
        swal("Success", res.data.message, "success");
        history.push("/");
      }
    });
  };

  return (
    <header>
      <Link className="navbar-brand text-black fw-bold" to="/">
        <img
          src={logo}
          height="70px"
          width="70px"
          className="logo"
          alt="logo"
        />
      </Link>
      <nav ref={navRef}>
        <Link to="/">
          <li>
            <IoIosHome /> Home
          </li>
        </Link>
        <Link to="/Collections">
          <li>
            <BiCategoryAlt /> Category
          </li>
        </Link>
        <Link to="/Cart">
          <li>
            <div className="cartcount">
              <span>
                <BiCartAlt /> Cart
              </span>
              <span className="badge bg-danger rounded-pill">{cartCount}</span>
            </div>
          </li>
        </Link>
        {!isAuthenticated && !user ? (
          <div>
            <Link to="/Login">
              <li>
                <MdLogin /> Login
              </li>
            </Link>
            <Link to="/Register">
              <li>
                <BiPencil /> Register
              </li>
            </Link>
          </div>
        ) : (
          <Dropdown className="btn-group">
            <Dropdown.Toggle
              variant="dark"
              className="drop-css"
              id="dropdown-basic"
            >
              {user.name}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="/view-order">View Order</Dropdown.Item>
              <Dropdown.Item href="/Information">Information</Dropdown.Item>
              <div className="dropdown-divider"></div>
              <Dropdown.Item href="#" onClick={logoutSubmit}>
                <MdLogout /> Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
        <button className="nav-btn nav-close-btn" onClick={showNavbar}>
          <FaTimes />
        </button>
      </nav>
      <button className="nav-btn" onClick={showNavbar}>
        <FaBars />
      </button>
    </header>
  );
}

export default Navbar;
