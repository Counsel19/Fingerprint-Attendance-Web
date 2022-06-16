import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useNavigate } from "react-router-dom";
import { DataContext } from "../../../context/dataContext";
import { useContext } from "react";

const MobileAdminNav = () => {
  const { showSidebar, setShowSidebar } = useContext(DataContext);
  const navigate = useNavigate();

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
    <>
      {showSidebar ? (
        <div className="mobile__AdminNav">
          <div className="mobile__AdminNavInner">
            <div className="top">
              <Link to="/admin" style={{ textDecoration: "none" }}>
                <span className="logo">Administrator</span>
              </Link>
            </div>
            <hr />
            <div className="center">
              <ul>
                <p className="title">MAIN</p>
                <Link to="/admin">
                  <li>
                    <DashboardIcon className="icon" />
                    <span>Dashboard</span>
                  </li>
                </Link>
                <p className="title">LISTS</p>
                <Link to="/admin/users" style={{ textDecoration: "none" }}>
                  <li>
                    <PersonOutlineIcon className="icon" />
                    <span>Lecturers</span>
                  </li>
                </Link>
                <Link to="/admin/students" style={{ textDecoration: "none" }}>
                  <li>
                    <PeopleAltIcon className="icon" />
                    <span>Students</span>
                  </li>
                </Link>
                <Link to="/admin/courses" style={{ textDecoration: "none" }}>
                  <li>
                    <LibraryBooksIcon className="icon" />
                    <span>Courses</span>
                  </li>
                </Link>
                <p className="title">ADD</p>
                <Link to="/admin/users/new" style={{ textDecoration: "none" }}>
                  <li>
                    <PersonAddAltIcon className="icon" />
                    <span>Add Lecturer</span>
                  </li>
                </Link>
                <Link
                  to="/admin/students/new"
                  style={{ textDecoration: "none" }}
                >
                  <li>
                    <PersonAddAltIcon className="icon" />
                    <span>Add Student</span>
                  </li>
                </Link>
                <Link
                  to="/admin/courses/new"
                  style={{ textDecoration: "none" }}
                >
                  <li>
                    <AddIcon className="icon" />
                    <span>Add Course</span>
                  </li>
                </Link>

                <p className="title">STATS</p>
                <Link to="/admin/attendance">
                  <li>
                    <InsertChartIcon className="icon" />
                    <span>All Attendance</span>
                  </li>
                </Link>
               

                <p className="title">USER</p>
                
                <li onClick={handleSignout}>
                  <ExitToAppIcon className="icon" />
                  <span>Logout</span>
                </li>
              </ul>
            </div>
          </div>

          <span
            className="close__icon"
            onClick={(showSidebar) => setShowSidebar(!showSidebar)}
          >
            <CloseIcon />
          </span>
        </div>
      ) : (
        null
      )}
    </>
  );
};

export default MobileAdminNav;
