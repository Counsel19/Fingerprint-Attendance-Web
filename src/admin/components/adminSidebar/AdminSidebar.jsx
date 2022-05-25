import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import AddIcon from '@mui/icons-material/Add';
import { Link, useNavigate } from "react-router-dom";
// import { DarkModeContext } from "../../context/darkModeContext";
// import { useContext } from "react";

const AdminSidebar = () => {
  // const { dispatch } = useContext(DarkModeContext);
  const navigate = useNavigate()

  const handleSignout = async () => {
    try {
      const res = await fetch("http://localhost:3001/auth/logout", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type" : "application/json",
        },
        credentials: "include"
      });

      if(res.status === 401 || !res){
        window.alert("Problem Logging Out")
      }else{
        navigate("/")
        window.location.reload()
        localStorage.removeItem("adminUser");
      }

    } catch (error) {
        console.log(error);
    }
  }

  return (
    <div className="adminSidebar">
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
          <Link to="/admin/students/new" style={{ textDecoration: "none" }}>
            <li>
              <PersonAddAltIcon className="icon" />
              <span>Add Student</span>
            </li>
          </Link>
          <Link to="/admin/courses/new" style={{ textDecoration: "none" }}>
            <li>
              <AddIcon className="icon" />
              <span>Add Course</span>
            </li>
          </Link>

          <p className="title">STATS</p>
          <Link to ="/admin/attendance">
            <li>
              <InsertChartIcon className="icon" />
              <span>All Attendance</span>
            </li>
          </Link>
          <li>
            <InsertChartIcon className="icon" />
            <span>Stats</span>
          </li>

          <p className="title">USER</p>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profile</span>
          </li>
          <li onClick={handleSignout}>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
      {/* <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div> */}
    </div>
  );
};

export default AdminSidebar;
