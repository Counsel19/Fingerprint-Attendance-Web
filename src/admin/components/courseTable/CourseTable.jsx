import React, { useState } from "react";
import EnhancedTable from "../../../components/courseAttendanceTable/EnhancedTable";

const CourseTable = ({ courses }) => {
  const headCells = [
    {
      id: "courseTitle",
      numeric: false,
      disablePadding: true,
      label: "Course Title",
    },
    {
      id: "courseCode",
      numeric: false,
      disablePadding: true,
      label: "Course Code",
    },
    {
      id: "lecturer",
      numeric: false,
      disablePadding: true,
      label: "Lecturer(s)",
    },
    {
      id: "numOfStudentsOffering",
      numeric: true,
      disablePadding: false,
      label: "Students Offering",
    },
  ];

  const [searchParams] = useState([
    "course_code",
    "course_title",
    "num_students_offering",
    "course_lecturers",
  ]);

  return (
    <div>
      <EnhancedTable
        headCells={headCells}
        data={courses}
        course={true}
        allcourse={true}
        searchParams={searchParams}
      />
    </div>
  );
};

export default CourseTable;
