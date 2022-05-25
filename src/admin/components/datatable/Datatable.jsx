import { useContext, useEffect, useState } from "react";
import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, studentColumns } from "../../datatablesource";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { DataContext } from "../../../context/dataContext";
import { SlidingPebbles } from "react-spinner-animated";
import "react-spinner-animated/dist/index.css";
import {
  getUsers,
  getStudents,
  getSingleAttendance,
  getSingleStudent,
  getAttendanceDetails,
} from "../../../services/getService";
import AttendanceInfo from "../attendanceInfo/AttendanceInfo";
import SearchInput from "../../../components/input-form/SearchInput";
import { search } from "../../../services/search";

const Datatable = ({ student, user, attendanceData }) => {
  const location = useLocation();
  let attendnaceId = location.pathname.split("/")[3];

  const [attendanceRecord, setAttendanceRecord] = useState(null);
  const [attendance, setAttendance] = useState(null);

  const { allUsers, setAllUsers, allStudents, setAllStudents, q, adminUser } =
    useContext(DataContext);

  const [searchParams] = useState(
    user
      ? ["firstname", "lastname", "email", "department", "faculty", "rank"]
      : [
          "firstname",
          "middlename",
          "lastname",
          "reg_number",
          "department",
          "faculty",
          "gender",
          "level",
        ]
  );

  const navigate = useNavigate();
  const [deleteMessage, setDeleteMessage] = useState(null);

  useEffect(() => {
    const getData = async () => {
      if (user) {
        const users = await getUsers();
        setAllUsers(users);
      }
    };

    getData();
  }, [setAllUsers, user]);

  useEffect(() => {
    const getData = async () => {
      if (attendanceData) {
        setAttendance(await getAttendanceDetails(true));
      }
    };

    getData();
  }, [attendanceData]);

  useEffect(() => {
    const getData = async () => {
      if (attendanceData && attendance) {
        const singleAttendance = await getSingleAttendance(attendnaceId, adminUser.id,);

        const studentsRecord = await Promise.all(
          singleAttendance.students_present.map(async (studentId) => {
            return await getSingleStudent(adminUser.id, studentId);
          })
        );

        setAttendanceRecord({
          info: attendance.filter((data) => data["id"] === attendnaceId),
          data: studentsRecord,
        });
      }
    };

    getData();
  }, [adminUser.id, attendance, attendanceData, attendnaceId]);

  useEffect(() => {
    const getData = async () => {
      if (student) {
        const students = await getStudents();
        setAllStudents(students);
      }
    };

    getData();
  }, [adminUser.id, attendnaceId, setAllStudents, student]);

  const handleDelete = (id) => {
    setAllUsers(allUsers.filter((item) => item.id !== id));
    fetch(`http://localhost:3001/api/users/${id}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        res.json();
        setDeleteMessage("Deleted Succusfully");
        setTimeout(() => {
          setDeleteMessage(null);
        }, 3000);
      } else {
        console.log("Request Error");
      }
    });
  };

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

            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <>
      {!attendanceData ? (
        <div
          style={{ display: "flex", flexDirection: "column", height: "92%" }}
          className="datatable"
        >
          <div className="datatableTitle">
            {!student ? "All Lecturers" : "All Students"}
            <SearchInput />
            <Link
              to={!student ? "/admin/users/new" : "/admin/students/new"}
              className="link"
            >
              Add New
            </Link>
          </div>
          <DataGrid
            className="datagrid"
            rows={search(!student ? allUsers : allStudents, searchParams, q)}
            columns={
              !student
                ? userColumns.concat(actionColumn)
                : studentColumns.concat(actionColumn)
            }
            pageSize={9}
            rowsPerPageOptions={[1]}
            checkboxSelection
          />
        </div>
      ) : attendanceData ? (
        <>
          {attendance && attendanceRecord ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "92%",
              }}
              className="datatable"
            >
              <div className="datatableTitle">
                Attendance Record
                <SearchInput />
                <Link to={"/admin/students/new"} className="link">
                  Add New
                </Link>
              </div>

              <AttendanceInfo attendanceRecord={attendanceRecord} />

              <DataGrid
                className="datagrid"
                rows={search(attendanceRecord?.data, searchParams, q)}
                columns={
                  !student
                    ? userColumns.concat(actionColumn)
                    : studentColumns.concat(actionColumn)
                }
                pageSize={7}
                rowsPerPageOptions={[7]}
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
