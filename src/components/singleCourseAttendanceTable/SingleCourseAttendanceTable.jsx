import { useEffect, useContext, useState } from "react";
import EnhancedTable from "../courseAttendanceTable/EnhancedTable";
import {
  getLectureAttendanceSummary,
  getLecturerAttendanceForCourse,
} from "../../services/getService";
import { useLocation } from "react-router-dom";
import { DataContext } from "../../context/dataContext";
import { useNavigate } from "react-router-dom";
import { SlidingPebbles } from "react-spinner-animated";
import "react-spinner-animated/dist/index.css";
import "./singleCourseAttendanceTable.scss";

const headCells = [
  {
    id: "date/time",
    numeric: false,
    disablePadding: true,
    label: "Date/Time",
  },
  {
    id: "noOfStudentPresent",
    numeric: true,
    disablePadding: false,
    label: "No. Student Present",
  },
  {
    id: "%present",
    numeric: true,
    disablePadding: false,
    label: "Percentage Present",
  },
  {
    id: "noOfStudentAbsent",
    numeric: true,
    disablePadding: false,
    label: "No. Student Absent",
  },
  {
    id: "view",
    numeric: true,
    disablePadding: false,
    label: "View",
  },
];

const SingleCourseAttendanceTable = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useContext(DataContext);
  const [attendance, setAttendance] = useState(null);

  let course = location.pathname.split("/")[2];

  useEffect(() => {
    const getData = async () => {
      const attendanceData = await getLecturerAttendanceForCourse(
        currentUser.id,
        course
      );

      const attendanceDoc = await getLectureAttendanceSummary(
        attendanceData,
        currentUser.id
      );

      attendanceDoc.sort((b, a) => a.date - b.date);
      setAttendance(attendanceDoc);
    };
    getData();
  }, [course, currentUser.id]);

  const handleViewAttendance = (id) => {
    navigate(`/report/${course}/${id}`);
  };

  const [searchParams] = useState([
    "course",
    "date",
    "numAbsent",
    "percentage",
    "semester",
    "session",
    "students_present",
  ]);

  return (
    <div className="singleCourseAttendance">
      <h1 className="tableTitle">{`Attendance for ${course}`}</h1>
      {attendance ? (
        <>
          <EnhancedTable
            courseCode={course}
            singleCourse={true}
            data={attendance}
            headCells={headCells}
            handleViewAttendance={handleViewAttendance}
            searchParams={searchParams}
          />
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
  );
};

export default SingleCourseAttendanceTable;
