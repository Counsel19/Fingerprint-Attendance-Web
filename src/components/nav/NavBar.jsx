import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdLogin, MdLogout } from "react-icons/md";
import { AiOutlineHome } from "react-icons/ai";
import "./navBar.css";

const NavBar = ({ currentUser }) => {
  const navigate = useNavigate();

  const handleSignout = async () => {
    try {
      const res = await fetch("http://localhost:3001/auth/logout", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (res.status === 401 || !res) {
        window.alert("Problem Logging Out");
      } else {
        navigate("/");
        window.location.reload();
        localStorage.removeItem("currentUser");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav>
      {!currentUser ? (
        <div className="navbar__home">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <a href="#about__app">About App</a>
            </li>
            <li>
              <a href="#solutions_offered">Solutions offered</a>
            </li>
          </ul>

          <div className="nav__brand">
            <img
              className="futo_logo"
              src="/images/FUTO_logo_main.png"
              alt="FUTO logo"
            />
            <h3>Federal Uninversity of Technology, Owerri</h3>
          </div>
          <div className="nav__links">
            <Link to="/signin" className="signin__btn">
              <MdLogin className="nav__icon" />
              <span>Log In</span>
            </Link>
            <Link to="/signin-admin" className="signin__btn">
              <MdLogin className="nav__icon" />
              <span>Log In Admin</span>
            </Link>
          </div>

      
        </div>
      ) : (
        <div className="navbar_dashboard">
          <Link to="/dashboard" className="signin__btn">
            <AiOutlineHome className="nav__icon" />
            <span>Dashboard</span>
          </Link>
          <div onClick={handleSignout} className="signin__btn">
            <MdLogout className="nav__icon" />
            <span>Log Out</span>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
