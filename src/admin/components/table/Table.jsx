import { useEffect, useState } from "react";
import "./table.scss";
import CourseTable from "../courseTable/CourseTable";
import AttendanceTable from "../attendanceTable/AttendanceTable";
import {
  getAllCourses,
  getAttendanceDetails,
} from "../../../services/getService";
import { formatDistance } from "date-fns";
import { useNavigate } from "react-router-dom";
import { SlidingPebbles } from "react-spinner-animated";
import "react-spinner-animated/dist/index.css";

const List = ({ allAttendance, recentAttendance }) => {
  const [attendance, setAttendance] = useState(null);
  const [courseList, setCourseList] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const d = Date.now();
    const yesterday = d - 48 * 60 * 60 * 1000;
    const getData = async () => {
      if (!recentAttendance) {
        const res = await getAttendanceDetails(allAttendance);
       
        setAttendance(res);
      } else {
        const res = await getAttendanceDetails(allAttendance);
        const attendanceEditted = res
          .filter((data) => data.date > yesterday)
          .map((data) => ({
            ...data,
            date: formatDistance(Number(data.date), Date.now(), {
              addSuffix: true,
            }),
          }));

        setAttendance(attendanceEditted);
      }
    };

    getData();
  }, [allAttendance, recentAttendance, setAttendance]);

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
      {(!attendance)? (
        <div >
          <SlidingPebbles
            text={"Loading..."}
            bgColor={"#fff"}
            center={true}
            width={"150px"}
            height={"150px"}
          />
        </div>
      ) : (
        <>
          {(allAttendance || recentAttendance) ? (
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
