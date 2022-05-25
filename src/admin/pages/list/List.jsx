import "./list.scss";
import AdminSidebar from "../../components/adminSidebar/AdminSidebar";
import Navbar from "../../components/navbar/Navbar";
import Datatable from "../../components/datatable/Datatable";
import Table from "../../components/table/Table";

const List = ({ student, user, attendance, attendanceData, newCourse }) => {
  return (
    <div className="list">
      <AdminSidebar />
      <div className="listContainer">
        <Navbar />
        {!attendance && !newCourse ? (
          <Datatable
            user={user}
            attendanceData={attendanceData}
            student={student}
          />
        ) : (
          <div className="tableContainer">
            <h1 className="tableTitle">
              {!newCourse ? "All Attendance" : "All Courses"}
            </h1>
            <Table allAttendance={attendance} newCourse={newCourse} />
          </div>
        )}
      </div>
    </div>
  );
};

export default List;
