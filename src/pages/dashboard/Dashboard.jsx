import React, { useState, useContext, useEffect } from "react";
import { NavBar, Sidebar } from "../../components";
import { BsFillCalendar2EventFill } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import "./dashboard.css";
// import PieChart from "../../components/PieChart";
import { Link } from "react-router-dom";
import { DataContext } from "../../context/dataContext";
import { getLectureDetails } from "../../services/getService";
import SingleCourseChart from "../../components/singleCourseChart/SingleCourseChart";
import { SlidingPebbles } from "react-spinner-animated";
import "react-spinner-animated/dist/index.css";

const Dashboard = () => {
  const { currentUser } = useContext(DataContext);
  const [attendanceSummary, setAttendanceSummary] = useState([]);
  const semester = "Rain";
  const session = "2021/2022";

  useEffect(() => {
    const getData = async () => {
      console.log("currentUser", currentUser)
      const data = await getLectureDetails(currentUser, semester, session);
      setAttendanceSummary(data);
    };

    getData();
  }, [currentUser]);

  return (
    <div className="dashboard__container">
      <div className="dashboard__wrapper">
        <div className="dashboard__sidebar">
          <Sidebar />
          {console.log("attendanceSummary", attendanceSummary)}
        </div>
        <div className="dashboard">
          {attendanceSummary.length > 0 ? (
            <>
              <NavBar currentUser={currentUser} />
              <div className="header">
                <div>
                  <FaUserAlt className="header__icon" />
                  <p>{`Hello, ${currentUser?.firstname}`}</p>
                </div>
                <div>
                  <BsFillCalendar2EventFill className="header__icon" />
                  <p>
                    Current Session: <span> {session}</span>
                  </p>
                </div>
                <div>
                  <BsFillCalendar2EventFill className="header__icon" />
                  <p>
                    Current Semester: <span>{semester}</span>
                  </p>
                </div>
              </div>

              <div className="dashboard__content">
                <div className="num__lectures">
                  <h3>Number of Lectures</h3>

                  <div className="num__lectureDetails">
                    {attendanceSummary.map((data) => (
                      <div key={data.course} className="course__data">
                        <p>{data.course}</p>
                        <h1>{data.num_of_lectures}</h1>
                        <Link
                          to={`/report/${data.course}`}
                          className="view__last"
                        >
                          View Attendance
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="charts">
                {console.log("attendanceSummary", attendanceSummary)}
                {attendanceSummary.map((data) => (
                  <div key={data.course} className="chart__1">
                    
                    <SingleCourseChart
                      title={`Attendance Chart for ${data.course}`}
                      aspect={2 / 1}
                      chartData={data.chartData}
                    />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div>
              <SlidingPebbles
                text={"Loading..."}
                bgColor={"#fff"}
                center={true}
                width={"150px"}
                height={"150px"}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
