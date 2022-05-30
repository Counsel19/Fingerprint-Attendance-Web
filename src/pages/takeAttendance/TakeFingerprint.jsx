import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../context/dataContext";
import { getStudents } from "../../services/getService";
import "./takeAttendanceForm.css";

const TakeFingerprint = ({ setShowView }) => {
  const navigate = useNavigate();
  const {
    attendanceDetails,
    setAttendanceDetails,
    setAllStudents,
    currentUser,
  } = useContext(DataContext);
  const [userId, setUserId] = useState("");
  const [idList, setIdList] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const studentsList = await getStudents(currentUser.id);

      setAllStudents(studentsList);

      setIdList(studentsList.map((item) => item["id"]));
    };

    getData();
  }, [currentUser.id, setAllStudents]);

  const handleTakeFingerprint = async (event) => {
    event.preventDefault();

    console.log("handleTakeFingerprint");

    const { user_docId, course, semester, session, date, students_present } =
      attendanceDetails;

    try {
      const res = await fetch("http://localhost:3001/api/attendance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_docId,
          course,
          semester,
          session,
          date,
          students_present,
        }),
      });
      if (res.status === 400 || !res) {
        window.alert("Request Error!");
      } else {
        window.alert("Attendance Recorded");
        setAttendanceDetails({
          user_docId: "",
          course: "",
          semester: "",
          session: "",
          date: "",
          students_present: [],
        });
        setIdList([]);
        navigate("/dashboard", { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleNext = () => {
    if (
      idList.includes(userId) &&
      !attendanceDetails.students_present.includes(userId)
    ) {
      let current_attendance = attendanceDetails.students_present;
      current_attendance.push(userId);
      setAttendanceDetails({
        ...attendanceDetails,
        students_present: current_attendance,
      });
      setUserId("");
      window.alert("Student Recorded");
    } else {
      window.alert("Wrong student Data");
      setUserId("");
    }
  };

  return (
    <div className="takefingerprint__container">
      <div className="takefingerprint__wrapper">
        <div>
          <h3>Take FingerPrint</h3>
          <p>Place any of your right fingers on the scanner</p>
        </div>
        <div className="takefingerprint__right">
          <div className="view__capture"></div>
          <button>Capture</button>
        </div>
      </div>
    </div>
  );
};

export default TakeFingerprint;
