import { useContext, useEffect, useState } from "react";
import "../../admin/components/datatable/datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { studentColumns } from "../../admin/datatablesource";
import { Link, useLocation } from "react-router-dom";
import { DataContext } from "../../context/dataContext";
import {
  getSingleAttendance,
  getSingleStudent,
  getAttendanceDetails,
} from "../../services/getService";
import SearchInput from "../input-form/SearchInput";
import { search } from "../../services/search";
import { SlidingPebbles } from "react-spinner-animated";
import "react-spinner-animated/dist/index.css";
import AttendanceInfo from "../../admin/components/attendanceInfo/AttendanceInfo";

const Datatable = () => {
  const location = useLocation();
  let attendanceDocId = location.pathname.split("/")[3];

  const [searchParams] = useState([
    "firstname",
    "middlename",
    "lastname",
    "reg_number",
    "faculty",
    "department",
    "gender",
  ]);

  const [attendanceRecord, setAttendanceRecord] = useState(null);
  const [attendance, setAttendance] = useState(null);

  const { q, currentUser, setViewStudent } = useContext(DataContext);

  useEffect(() => {
    const getData = async () => {
      setAttendance(await getAttendanceDetails(currentUser.id, true));
    };

    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      if (attendance) {
        const singleAttendance = await getSingleAttendance(
          attendanceDocId,
          currentUser.id
        );

        const studentsRecord = await Promise.all(
          singleAttendance.students_present.map(async (studentId) => {
            return await getSingleStudent(currentUser.id, studentId);
          })
        );

        setAttendanceRecord({
          info: attendance.filter((data) => data["id"] === attendanceDocId),
          data: studentsRecord,
        });
      }
    };

    getData();
  }, [attendance, attendanceDocId, currentUser.id]);

 

  return (
    <>
      <h1 className="tableTitle">Attendance Record</h1>
      {attendance && attendanceRecord ? (
        <div
          style={{ display: "flex", flexDirection: "column" }}
          className="datatable"
        >
          <div className="datatableTitle">
            <SearchInput />
            <Link to={"/take-attendance"} className="link">
              Take New Attendance
            </Link>
          </div>

          <AttendanceInfo attendanceRecord={attendanceRecord} />

          <DataGrid
            className="datagrid"
            rows={search(attendanceRecord?.data, searchParams, q)}
            columns={studentColumns}
            pageSize={9}
            rowsPerPageOptions={[1]}
            checkboxSelection
          />
        </div>
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
    </>
  );
};

export default Datatable;
