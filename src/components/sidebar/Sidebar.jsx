import React, {useContext}from "react";
import { Link, useNavigate } from "react-router-dom";
import {  GoReport } from "react-icons/go";
import { AiOutlineHome } from "react-icons/ai";
import { FiUser } from "react-icons/fi";
import { BiUserCheck } from "react-icons/bi";
import { MdPowerSettingsNew } from "react-icons/md";
import  "./sidebar.css"
import { DataContext } from "../../context/dataContext";

const Sidebar = () => {
  const { currentUser } = useContext(DataContext)
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
        localStorage.removeItem("currentUser");
      }

    } catch (error) {
        console.log(error);
    }
  }

  return (
    <div className="sidebar">
      <div className="profile">
        <img src={currentUser.avatar} alt="user profile" />
        <h3>{`${currentUser.firstname} ${currentUser.lastname}`}</h3>
      </div>
      <div className="side__nav">
        <p>MAIN</p>
        <Link className="links" to="/dashboard">
          {" "}
          <AiOutlineHome className="sidebar__icon"/> Dashboard
        </Link>
        <p>REPORT</p>
        <Link className="links" to="/report-form">
          {" "}
          <GoReport className="sidebar__icon"/>
           General Report
        </Link>

        <p>STATS</p>
        <Link className="links" to="/student-stats">
          {" "}
          <GoReport className="sidebar__icon"/>
          Student Statistics
        </Link>
        <p>TAKE ATTENDANCE</p>
        <Link className="links" to="/take-attendance-form">
          {" "}
          <BiUserCheck className="sidebar__icon"/>
          Take Attendance
        </Link>
        <p>PROFILE</p>
        <Link className="links" to="/profile">
          {" "}
          <FiUser className="sidebar__icon"/>
          Profile
        </Link>
      </div>
      <div className="logout__btn" onClick={handleSignout}>
        <p> <MdPowerSettingsNew className="logout__btnIcon" /> Log Out</p>
      </div>
    </div>
  );
};

export default Sidebar;
