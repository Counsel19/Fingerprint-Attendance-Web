import React, { useContext} from "react";
import { NavBar, Sidebar } from "../../components";
import { IoSettingsOutline } from "react-icons/io5";
import { FaGraduationCap } from "react-icons/fa";
import { FaUserAlt, FaBook } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./profile.css";
import { DataContext } from "../../context/dataContext";


const Profile = () => {
  const { currentUser } = useContext(DataContext);
  const navigate = useNavigate();

  const handleGotoEdit = () => {
    navigate("/profile/edit")
  }

  return (
    <div className="profile__container">
      <div className="profile__wrapper">
        <Sidebar />
        <div className="profile__content">
          <NavBar currentUser={currentUser} />
          <h1>{`${currentUser.lastname} ${currentUser.firstname}: Profile`}</h1>
          <p>{currentUser.rank}</p>
          <div className="profile__details">
            <div className="profile__detailsCol1">
              <img src={currentUser.avatar} alt="user profile" />
              <p onClick={handleGotoEdit}>
                <IoSettingsOutline /> Edit Profile
              </p>
            </div>
            <div className="profile__detailsCol2">
              <div className="contact">
                <h2>
                  {" "}
                  <FaUserAlt className="contact__icon" /> User Information
                </h2>
                <p>
                  First Name: <span>{currentUser.firstname}</span>
                </p>
                <p>
                  Last Name: <span>{currentUser.lastname}</span>
                </p>
                <p>
                  Email: <span>{currentUser.email}</span>
                </p>
                <p>
                  Phone: <span>{currentUser.phone}</span>
                </p>
                <p>
                  Gender: <span>{currentUser.gender}</span>
                </p>
              </div>
              <div className="general">
                <h2>
                  {" "}
                  <FaGraduationCap /> Professional Information
                </h2>
                <p>
                  Rank: <span>{currentUser.rank}</span>
                </p>
                <p>
                  Department: <span>{currentUser.department}</span>
                </p>
                <p>
                  Faculty:{" "}
                  <span>{currentUser.faculty}</span>
                </p>
              </div>

              <div className="courses">
                <h2>
                  {" "}
                  <FaBook /> Courses Lecturing
                </h2>
                {currentUser.courses.map((data, index) => (
                  <p key={index}>{data}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
