import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import MenuIcon from "@mui/icons-material/Menu";
import "./navbar.scss";
import { DataContext } from "../../../context/dataContext";

const Navbar = () => {
  const { adminUser, showSidebar, setShowSidebar } = useContext(DataContext);
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
 

  const handleShowMenu = () => {
    setShowMenu((showMenu) => !showMenu);
  };

  const handleToggleSidebar = () => {
    setShowSidebar(!showSidebar)
  }

  const handleSignout = async () => {
    try {
      const res = await fetch("https://fingerprintattendanceserver.herokuapp.com/auth/logout", {
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
    <div className="navbar">
      <div className="wrapper">
        <div className="navbar__left">
          <MenuIcon onClick={handleToggleSidebar}/>
          <span>Biometric Attendace Management System</span> 
        </div>
        <div className="items">
          <div className="item">
            <img
              src={adminUser.avatar}
              alt=""
              className="avatar"
              onClick={handleShowMenu}
            />
            <div className={`dropMenu ${showMenu && "show"}`}>
              <p className="menuLogout" onClick={handleSignout}>
                {" "}
                Log Out
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
