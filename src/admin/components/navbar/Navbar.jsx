import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
// import { DarkModeContext } from "../../context/darkModeContext";
import "./navbar.scss";

const Navbar = () => {
  // const { dispatch } = useContext(DarkModeContext);
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const handleShowMenu = () => {
    setShowMenu((showMenu) => !showMenu);
  };

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
        localStorage.removeItem("adminUser");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon />
        </div>
        <div className="items">
          <div className="item">
            <DarkModeOutlinedIcon
              className="icon"
              // onClick={() => dispatch({ type: "TOGGLE" })}
            />
          </div>

          <div className="item">
            <img
              src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="avatar"
              onClick={handleShowMenu}
            />
            <div className={`dropMenu ${showMenu && "show"}`}>
              <Link className="menuProfile" to="/admin/profile">Profile</Link>
              <p className="menuLogout"onClick={handleSignout}> Log Out</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
