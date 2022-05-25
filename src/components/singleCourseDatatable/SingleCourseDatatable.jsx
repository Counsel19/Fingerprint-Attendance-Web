import { useContext, useEffect, useState } from "react";
import "../../admin/components/datatable/datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { studentColumns } from "../../admin/datatablesource";
import { Link, useLocation, useNavigate } from "react-router-dom";
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

const Datatable = ({ attendanceData }) => {
  const location = useLocation();
  let attendanceDocId = location.pathname.split("/")[3];
  let course = location.pathname.split("/")[2];

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
  const [attendance, setAttendance] = useState([]);

  const { q, currentUser } = useContext(DataContext);

  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      // setAttendance(await getAttendanceDetails(true));
    };

    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      if (attendance) {
        const singleAttendance = await getSingleAttendance(attendanceDocId, currentUser.id );
        console.log("singleAttendance", singleAttendance)

        const studentsRecord = await Promise.all(
          singleAttendance.students_present.map(async (studentId) => {
            return await getSingleStudent(currentUser.id, studentId);
          })
        );

        console.log("studentsRecord", studentsRecord)

        setAttendanceRecord({
          info: attendance.filter((data) => data["id"] === attendanceDocId),
          data: studentsRecord,
        });
      }
    };

    getData();
  }, [attendance, attendanceDocId]);

  const handleView = async (id) => {
    navigate(`/admin/users/${id}`);
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              onClick={() => handleView(params.row.id)}
              className="viewButton"
            >
              View
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <>
      {attendance && attendanceRecord ? (
        <div
          style={{ display: "flex", flexDirection: "column", height: "92%" }}
          className="datatable"
        >
          <div className="datatableTitle">
            {`Attendance Record for ${course}`}
            {/* {deleteMessage && <div className="deleteMessage">{deleteMessage}</div>} */}

            <SearchInput />
            <Link to={"/take-attendance-form"} className="link">
              Take New Attendance
            </Link>
          </div>
          <DataGrid
            className="datagrid"
            rows={search(attendanceRecord?.data, searchParams, q)}
            columns={studentColumns.concat(actionColumn)}
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
