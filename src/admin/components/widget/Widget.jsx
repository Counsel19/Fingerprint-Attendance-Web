import { useEffect, useState } from "react";
import "./widget.scss";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import CheckIcon from "@mui/icons-material/Check";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { Link } from "react-router-dom";
import {
  getUsers,
  getStudents,
  getAttendance,
  getAllCourses,
} from "../../../services/getService";

const Widget = ({ type }) => {
  let data;

  const [totalUsers, setTotalUsers] = useState(0);
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalAttendance, setTotalAttendance] = useState(0);
  const [totalCourse, setTotalCourse] = useState(0);

  useEffect(() => {
    const getData = async () => {
      const userData = await getUsers();
      setTotalUsers(userData.length);
      const studentData = await getStudents();
      setTotalStudents(studentData.length);
      const attendanceData = await getAttendance();
      setTotalAttendance(attendanceData.length);
      const courseData = await getAllCourses();
      setTotalCourse(courseData.length);
    };

    getData();
  }, []);

  switch (type) {
    case "lecturers":
      data = {
        title: "LECTURERS",

        link: "See all lecturers",
        to: "users",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
        amount: totalUsers,
      };
      break;
    case "students":
      data = {
        title: "STUDENTS",

        link: "View all students",
        to: "students",
        icon: (
          <PeopleAltIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
        amount: totalStudents,
      };
      break;
    case "attendance":
      data = {
        title: "ATTEDANCE",

        link: "View all attendance",
        to: "attendance",
        icon: (
          <CheckIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
        amount: totalAttendance,
      };
      break;
    case "courses":
      data = {
        title: "COURSES",

        link: "View all courses",
        to: "courses",
        icon: (
          <LibraryBooksIcon
            className="icon"
            style={{
              backgroundColor: "rgba(11, 48, 149, 0.2)",
              color: "green",
            }}
          />
        ),
        amount: totalCourse,
      };
      break;
    default:
      break;
  }

  return (
    <>
      <div className="widget">
        <div className="left">
          <span className="title">{data.title}</span>
          <span className="counter">{data.amount}</span>
          <Link to={data.to} className="link">
            {data.link}
          </Link>
        </div>
        <div className="right">{data.icon}</div>
      </div>
    </>
  );
};

export default Widget;
