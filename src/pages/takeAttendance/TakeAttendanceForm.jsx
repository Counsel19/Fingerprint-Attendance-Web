import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { NavBar, Sidebar } from "../../components";
import "./takeAttendanceForm.css";
import { DataContext } from "../../context/dataContext";
import { getStudentFromRegNumber } from "../../services/getService";
import TakeFingerprint from "./TakeFingerprint";
import ViewStudent from "./ViewStudent";
import { submittAttendance } from "../../services/createService";
import { validateStudent } from "../../services/validate";

const TakeAttendanceForm = () => {
  const { currentUser, attendanceDetails } = useContext(DataContext);

  const [course, setCourse] = useState(currentUser?.courses[0]);
  const [session, setSession] = useState("");
  const [semester, setSemester] = useState("");
  const [regNum, setRegNum] = useState("");
  const [fingerprintTemp, setFingerprintTemp] = useState("");
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [showView, setShowView] = useState(false);
  const navigate = useNavigate();
  const [studentDetails, setStudentDetails] = useState({});

  const notSubmittedAttendance = !attendanceDetails ? true : false;
  const noInput = session === "" || semester === "" || regNum === "";

  const handleTakeFingerprint = async (e) => {
    e.preventDefault();
    setLoading1(true);

    try {
      const currentStudent = await getStudentFromRegNumber(
        currentUser.id,
        regNum
      );

      setStudentDetails(currentStudent);

      if (!currentStudent || fingerprintTemp === "") {
        if (fingerprintTemp === "") {
          alert("Input Fingerprint");
        }
        setLoading1(false);
        return;
      }

      const score = await validateStudent(
        currentStudent.fingerprint,
        fingerprintTemp
      );

      if (score > 50) {
        setShowView(true);
        setLoading1(false);
        return;
      } else {
        setLoading1(false);
        alert(`Score is ${score}. Approved Score is 50`);
        return;
      }
    } catch (e) {
      console.log(e);
      setLoading1(false);
    }
  };

  const handleSubmitAtttendance = async () => {
    const res = await submittAttendance(attendanceDetails, currentUser.id);
    setLoading2(true);

    if (res) {
      localStorage.removeItem("attendanceDetails");
      setLoading2(false);
      navigate("/dashboard");
    } else {
      setLoading2(false);
      return;
    }
  };

  return (
    <div className="take__attendance">
      <Sidebar />
      <div className="take__attendanceDetails">
        <NavBar currentUser={currentUser} />
        <form
          onSubmit={handleTakeFingerprint}
          className="take__attendanceWrapper"
        >
          <div className="attendance__heading">
            <h1>Take Attendance</h1>
            <button
              onClick={handleSubmitAtttendance}
              disabled={loading2 || notSubmittedAttendance}
              type="button"
            >
              Submit Attendance: {attendanceDetails ? attendanceDetails.students_present.length: 0}
            </button>
          </div>
          <div className="form__top">
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
          </div>

          <div className="take__fingerPrint">
            <div className="regNo_input">
              <label>Enter Student Registration Number</label>
              <input
                value={regNum}
                onChange={(e) => setRegNum(e.target.value)}
                type="text"
              />
            </div>
            <TakeFingerprint
              fingerprintTemp={fingerprintTemp}
              setFingerprintTemp={setFingerprintTemp}
            />
          </div>

          <button disabled={loading1 || noInput} type="submit">
            Verify
          </button>
        </form>
      </div>
      {showView && (
        <div className="viewStudent__background">
          <ViewStudent
            setShowView={setShowView}
            studentDetails={studentDetails}
            course={course}
            semester={semester}
            session={session}
          />
        </div>
      )}
    </div>
  );
};

export default TakeAttendanceForm;
