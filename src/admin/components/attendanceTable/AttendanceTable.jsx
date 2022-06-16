import React, { useState } from "react";
import EnhancedTable from "../../../components/courseAttendanceTable/EnhancedTable";

const AttendanceTable = ({ attendance, handleViewAttendance }) => {
  const headCells = [
    {
      id: "lecturer",
      numeric: false,
      disablePadding: true,
      label: "Lecturer",
    },
    {
      id: "courseCode",
      numeric: false,
      disablePadding: true,
      label: "Course Code",
    },
    {
      id: "sessionSemester",
      numeric: false,
      disablePadding: true,
      label: "Session/Semester",
    },
    {
      id: "time",
      numeric: false,
      disablePadding: true,
      label: "Time",
    },
    {
      id: "attendance",
      numeric: true,
      disablePadding: false,
      label: "Attendance",
    },
    {
      id: "percentage",
      numeric: true,
      disablePadding: false,
      label: "Percentage",
    },
    {
      id: "view",
      numeric: false,
      disablePadding: true,
      label: "View",
    },
  ];

  const [searchParams] = useState([
    "course",
    "firstname",
    "lastname",
    "percentage",
    "semester",
    "session",
    "students_present"
  ])

  return (
    <>
      <EnhancedTable
        attendance={true}
        headCells={headCells}
        handleViewAttendance={handleViewAttendance}
        data={attendance}
        searchParams={searchParams}
      />
    </>
  );
};

export default AttendanceTable;
