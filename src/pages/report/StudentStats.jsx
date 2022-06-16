import React, { useContext, useState } from "react";
import { NavBar, Sidebar } from "../../components";
import { DataContext } from "../../context/dataContext";
import "./reportForm.css";
import "./studentStats.scss";
import {
  getStudentFromRegNumber,
  getStudentCourseAttendance,
  getLecturerAttendanceForCourse,
} from "../../services/getService";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import StudentStatsTableCell from "../../components/tableCell/StudentStatsTableCell";

const AnalyseForm = () => {
  const { currentUser } = useContext(DataContext);
  const [result, setResult] = useState(null);
  const [course, setCourse] = useState(currentUser.courses[0]);
  const [regNumber, setRegNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const noInput = regNumber === "";

  const handleAnalyse = (e) => {
    e.preventDefault();
    setLoading(true);

    const getData = async () => {
      const studentData = await getStudentFromRegNumber(
        currentUser.id,
        regNumber
      );
      
      const studentAttendance = await getStudentCourseAttendance(
        currentUser.id,
        course,
        studentData.id
      );

      const courseLectures = await getLecturerAttendanceForCourse(
        currentUser.id,
        course
      );
      if (courseLectures.length === 0) {
        alert("No attendance Submitted by Lecturer");
        return;
      }

      const absent = courseLectures.length - studentAttendance.length;
      const present = studentAttendance.length;
      const percentage =
        (studentAttendance.length / courseLectures.length) * 100;

      setResult([
        {
          ...studentData,
          absent,
          present,
          percentage,
        },
      ]);
    };

    getData();
    setLoading(false);
  };

  return (
    <div className="report__form">
      <Sidebar />
      <div className="report__formDetails">
        <NavBar currentUser={currentUser} />
        <div className="student__stats">
          <h1>Analyse Student's Attendance</h1>
          <form onSubmit={handleAnalyse} action="POST">
            <div className="student__statsformGroup">
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
            <div className="student__statsformGroup">
              <label htmlFor="session">Reg. Number: </label>
              <input
                type="text"
                name="regNumber"
                placeholder="Eg. 20171087655"
                value={regNumber}
                onChange={(e) => setRegNumber(e.target.value)}
              />
            </div>
            <div className="student__statsformGroup">
              <input
                disabled={loading || noInput}
                type="submit"
                value="Analyse"
              />
            </div>
          </form>

          {result && (
            <div className="student__statstable">
              <TableContainer
                component={Paper}
                sx={{ width: "100%" }}
                className="table"
              >
                <Table
                  overflow="scroll"
                  sx={{ minWidth: "md" }}
                  aria-label="simple table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell className="tableCell">Reg Number</TableCell>
                      <TableCell className="tableCell">Full Name</TableCell>
                      <TableCell className="tableCell">
                        No. of Present
                      </TableCell>
                      <TableCell className="tableCell">No. of Absent</TableCell>
                      <TableCell className="tableCell">
                        Attendance Percentage
                      </TableCell>
                      <TableCell className="tableCell">Remark</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {result.map((row) => (
                      <TableRow key={row.id}>
                        <StudentStatsTableCell row={row} />
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalyseForm;
