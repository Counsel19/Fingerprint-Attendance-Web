import {useEffect, useState } from "react";
import "./single.scss";
import AdminSidebar from "../../components/adminSidebar/AdminSidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import SingleTable from "../../components/singleTable/SingleTable";
import {
  getLecturerSubmittedAttendance,
  getSingleUser,
} from "../../../services/getService";
import { useLocation, useNavigate } from "react-router-dom";
import { SlidingPebbles } from "react-spinner-animated";
import "react-spinner-animated/dist/index.css";

const Single = () => {
 
  const [singleUser, setSingleUser] = useState(null)

  const location = useLocation();
  let id = location.pathname.split("/")[3];
  const navigate = useNavigate()

  useEffect(() => {
    const getData = async () => {
      const {
        lastname,
        firstname,
        email,
        phone,
        gender,
        rank,
        department,
        faculty,
        courses,
        avatar
      } = await getSingleUser(id);
      const singleUserAttendance = await getLecturerSubmittedAttendance(id);
      setSingleUser({
        id,
        lastname,
        firstname,
        email,
        phone,
        gender,
        rank,
        department,
        faculty,
        courses,
        avatar,
        singleUserAttendance,
      });
    };

    getData();
  }, [id, setSingleUser]);

  const handleEditUser =async () => {
    navigate(`/admin/users/edit/${singleUser.id}`)
  }

  return (
    <div className="single">

      <AdminSidebar />
      <div className="singleContainer">
        <Navbar />
        {!singleUser ? (
          <div >
            <SlidingPebbles
                text={"Loading..."}
                bgColor={"#fff"}
                center={true}
                width={"150px"}
                height={"150px"}
              />
          </div>
        ) : (
          <>
            <div className="top">
              <div className="left">
                <div className="editButton" onClick={handleEditUser}>Edit</div>
                <h1 className="title">Information</h1>
                <div className="item">
                  <img
                    src={singleUser.avatar}
                    alt=""
                    className="itemImg"
                  />
                  <div className="details">
                    <h1 className="itemTitle">{`${singleUser.lastname} ${singleUser.firstname}`}</h1>
                    <div className="detailItem">
                      <span className="itemKey">Email:</span>
                      <span className="itemValue">{singleUser.email}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Phone:</span>
                      <span className="itemValue">{singleUser.phone}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Gender:</span>
                      <span className="itemValue">{singleUser.gender}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Rank:</span>
                      <span className="itemValue">{singleUser.rank}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Department:</span>
                      <span className="itemValue">
                        {singleUser?.department}
                      </span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Faculty:</span>
                      <span className="itemValue">{singleUser.faculty}</span>
                    </div>
                    <div className="detailItem courses">
                      <span className="itemKey">Courses:</span>
                   
                      {singleUser?.courses.map((data, index) => (
                        <span className="itemValue" key={index}>
                          {data}
                        </span>
                      ))}
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">
                        Total Attendnace Submitted:
                      </span>
                      <span className="itemValue">
                        {singleUser.singleUserAttendance.length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="right">
                <Chart
                  aspect={2 / 1}
                  title="Attendance Chart ( Last 6 Months)"
                  singleUserId={singleUser.id}
                />
              </div>
            </div>
            <div className="bottom">
              <h1 className="title">Attendance Submitted by Lecturer</h1>
              <SingleTable
                attendanceData={
                  singleUser ? singleUser.singleUserAttendance : []
                }
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Single;
