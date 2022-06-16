import React, { useContext } from "react";
import AddIcon from "@mui/icons-material/Add";
import { DataContext } from "../../context/dataContext";
import "./takeAttendanceForm.css";

const ViewStudent = ({
  setShowView,
  studentDetails,
  course,
  session,
  semester,
}) => {
  const { currentUser, attendanceDetails, setAttendanceDetails } =
    useContext(DataContext);
  const studentId = studentDetails.id;

  const handleAddStudent = () => {
    try {
      let current_attendance = [];
      if (attendanceDetails) {

        current_attendance = attendanceDetails.students_present;
      }
      if (current_attendance.includes(studentId)) {
        alert("Student Already Recorded");
        setShowView(false);
        return;
      } else {
        current_attendance.push(studentId);
        setAttendanceDetails({
          ...attendanceDetails,
          user_docId: currentUser.id,
          course: course,
          session: session,
          semester: semester,
          date: Date.now(),
          students_present: current_attendance,
        });
        localStorage.setItem(
          "attendanceDetails",
          JSON.stringify({
            user_docId: currentUser.id,
            course: course,
            session: session,
            semester: semester,
            date: Date.now(),
            students_present: current_attendance,
          })
        );

        window.alert("Student Recorded");

        setShowView(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {studentDetails && (
        <div className="viewStudent__container">
        <div className="viewStudent__top">
          <h3>View Student</h3>
          <button onClick={handleAddStudent}>
            {" "}
            <AddIcon /> Add Student
          </button>
        </div>
  
        <div className="viewStudent__inside">
          <div className="viewStudent__wrapper">
            <p>
              Name:{" "}
              <span>
                {studentDetails.lastname} {studentDetails.firstname}
              </span>
            </p>
            <p>
              Reg. Number: <span>{studentDetails.reg_number}</span>
            </p>
            <p>
              Level: <span>{studentDetails.level}</span>
            </p>
            <p>
              Department: <span>{studentDetails.department}</span>
            </p>
            <p>
              Faculty: <span>{studentDetails.faculty}</span>
            </p>
          </div>
          <img src={studentDetails.avatar} alt="" />
        </div>
      </div>
      )}
    </>
  );
};

export default ViewStudent;
