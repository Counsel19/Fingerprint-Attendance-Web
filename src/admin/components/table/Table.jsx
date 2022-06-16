import { useContext, useEffect, useState } from "react";
import "./table.scss";
import CourseTable from "../courseTable/CourseTable";
import AttendanceTable from "../attendanceTable/AttendanceTable";
import {
  getAllCourses,
  getAttendanceDetails,
} from "../../../services/getService";

import { useNavigate } from "react-router-dom";
import { SlidingPebbles } from "react-spinner-animated";
import "react-spinner-animated/dist/index.css";
import { DataContext } from "../../../context/dataContext";

const List = ({ allAttendance, recentAttendance }) => {
  const { adminUser } = useContext(DataContext)
  const [attendance, setAttendance] = useState(null);
  const [courseList, setCourseList] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      if (!recentAttendance) {
        const res = await getAttendanceDetails(adminUser.id, allAttendance);

        setAttendance(res);
      } else {
        const res = await getAttendanceDetails(adminUser.id, allAttendance);
      

        setAttendance(res);
      }
    };

    getData();
  }, [adminUser.id, allAttendance, recentAttendance, setAttendance]);

  useEffect(() => {
    const getCourses = async () => {
      const courseDoc = await getAllCourses();

      setCourseList(courseDoc);
    };

    getCourses();
  }, []);

  const handleViewAttendance = (id) => {
    navigate(`/admin/attendance/${id}`);
  };

  return (
    <>
      {!attendance ? (
        <div>
          <SlidingPebbles
            text={"Loading..."}
            bgColor={"#fff"}
            center={true}
            width={"100px"}
            height={"100px"}
          />
        </div>
      ) : (
        <>
          {allAttendance || recentAttendance ? (
            <AttendanceTable
              handleViewAttendance={handleViewAttendance}
              attendance={attendance}
            />
          ) : (
            <CourseTable courses={courseList} />
          )}
        </>
      )}
    </>
  );
};

export default List;
