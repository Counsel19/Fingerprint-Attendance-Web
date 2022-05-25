import { useContext } from "react";
import {
  NavBar,
  Sidebar,
  SingleCourseAttendanceTable,
  SingleCourseDatatable,
} from "../../components";
import "./singleCourseList.css";
import { DataContext } from "../../context/dataContext";

const SingleCourseList = ({ attendanceData }) => {
  const { currentUser } = useContext(DataContext);
  return (
    <div className="single_courseList">
      <Sidebar />
      <div className="single_courseListWrapper">
        <NavBar currentUser={currentUser} />

        {attendanceData ? (
          <SingleCourseDatatable />
        ) : (
          <SingleCourseAttendanceTable />
        )}
      </div>
    </div>
  );
};

export default SingleCourseList;
