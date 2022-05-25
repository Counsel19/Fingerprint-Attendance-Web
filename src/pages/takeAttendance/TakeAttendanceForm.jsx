import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { NavBar, Sidebar } from "../../components";
import "./takeAttendanceForm.css";
import { DataContext } from "../../context/dataContext";
import TakeFingerprint from "./TakeFingerprint";
import ViewStudent from "./ViewStudent";

const TakeAttendanceForm = () => {
  const { currentUser, attendanceDetails, setAttendanceDetails } =
    useContext(DataContext);

  const [course, setCourse] = useState("");
  const [session, setSession] = useState("");
  const [semester, setSemester] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const noInput = session === "" && semester === "";

  const handleTakeFingerprint = (e) => {
    e.preventDefault();
    setLoading(true);

    setAttendanceDetails({
      ...attendanceDetails,
      user_docId: currentUser.id,
      course: course,
      session: session,
      semester: semester,
      date: Date.now(),
    });

    console.log("attendanceDetails", attendanceDetails);
  };

  return (
    <div className="take__attendance">
      <Sidebar />
      <div className="take__attendanceDetails">
        <NavBar currentUser={currentUser} />
        <div className="take__attendanceWrapper">
          <h1>Take Attendance</h1>

          <form onSubmit={handleTakeFingerprint}>
            <div className="attendance__formGroup">
              <label htmlFor="course">Course: </label>
              <select
                name="course"
                required
                defaultValue={currentUser.courses[0]}
                onChange={(e) => setCourse(e.target.value)}
              >
                {currentUser.courses.map((courseItem, index) => (
                  <option key={index} value={courseItem}>
                    {courseItem}
                  </option>
                ))}
              </select>
            </div>

            <div className="attendance__formGroup">
              <label htmlFor="session">Session: </label>
              <input
                type="text"
                name="session"
                placeholder="Eg. 2021/2022"
                value={session}
                onChange={(e) => setSession(e.target.value)}
              />
            </div>

            <div className="attendance__formGroup">
              <label htmlFor="semester">Semester: </label>
              <input
                type="text"
                name="semester"
                placeholder="Eg. Rain"
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
              />
            </div>

            <div className="attendance__formGroup">
              <input
                disabled={loading || noInput}
                type="submit"
                value="Continue..."
              />
            </div>
          </form>
          <hr />
          <div className="take__fingerPrint">
            <TakeFingerprint />
            <ViewStudent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TakeAttendanceForm;
