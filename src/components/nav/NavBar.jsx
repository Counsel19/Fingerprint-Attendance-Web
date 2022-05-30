import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdLogin, MdLogout } from "react-icons/md";
import { AiOutlineHome } from "react-icons/ai";
import MenuIcon from "@mui/icons-material/Menu";
import "./navBar.css";
import { DataContext } from "../../context/dataContext";

const NavBar = ({ currentUser }) => {
  const [showMenu, setShowMenu] = useState(false);
  const {showSidebar, setShowSidebar } = useContext(DataContext);
  const navigate = useNavigate();
  const handleToggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleToggleSidebar = () => {
    setShowSidebar(!showSidebar)
  }

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

          <div className="nav__dropdown">
            <MenuIcon onClick={handleToggleMenu} />
            {showMenu && (
              <div className="dropdown__inner">
                <Link to="/signin" className="dropdown__item">
                  Log In
                </Link>
                <hr />
                <Link to="/signin-admin" className="dropdown__item">
                  Log In Admin
                </Link>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="navbar_dashboard">
          <div className="nav__left"onClick={handleToggleSidebar}> <MenuIcon /> Biometric Attendace Management System</div>
          <div className="nav__right">
            <Link to="/dashboard" className="signin__btn">
              <AiOutlineHome className="nav__icon" />
              <span>Dashboard</span>
            </Link>
            <div onClick={handleSignout} className="signin__btn">
              <MdLogout className="nav__icon" />
              <span>Log Out</span>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
