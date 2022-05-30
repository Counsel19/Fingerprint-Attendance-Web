import { useContext, useEffect, useState } from "react";
import "./datatable.scss";
import { userColumns, studentColumns } from "../../datatablesource";
import { useLocation, useNavigate } from "react-router-dom";
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
import  Datagrid  from "./Datagrid";

const Datatable = ({ student, user, attendanceData }) => {
  const location = useLocation();
  let attendnaceId = location.pathname.split("/")[3];

  const [attendanceRecord, setAttendanceRecord] = useState(null);
  const [attendance, setAttendance] = useState(null);

  const { allUsers, setAllUsers, allStudents, setAllStudents, q, adminUser } =
    useContext(DataContext);

  const [searchParamsUser] = useState([
    "firstname",
    "lastname",
    "email",
    "department",
    "faculty",
    "rank",
  ]);
  const [searchParamsStudent] = useState([
    "firstname",
    "middlename",
    "lastname",
    "reg_number",
    "department",
    "faculty",
    "gender",
    "level",
  ]);

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
        const singleAttendance = await getSingleAttendance(
          attendnaceId,
          adminUser.id
        );

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
    // eslint-disable-next-line no-restricted-globals
    let proceed = confirm("Are you sure You want to delete?");
    if (proceed) {
      setAllUsers(allUsers?.filter((item) => item.id !== id));
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
    }
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
      {user && allUsers ? (
        <Datagrid
          title="All Lecturers"
          addLink="/admin/users/new"
          data={allUsers}
          searchParams={searchParamsUser}
          q={q}
          columns={userColumns}
          actionColumn={actionColumn}
        />
      ) : student && allStudents ? (
        <Datagrid
          title="All Students"
          addLink="/admin/students/new"
          data={allStudents}
          searchParams={searchParamsStudent}
          q={q}
          columns={studentColumns}
          actionColumn={actionColumn}
        />
      ) : attendanceData && attendanceRecord ? (
        <Datagrid
          title="Attendance Record"
          addLink="/admin/students/new"
          data={attendanceRecord?.data}
          searchParams={searchParamsStudent}
          q={q}
          columns={studentColumns}
          actionColumn={actionColumn}
          attendanceRecord={attendanceRecord}
        />
      ) : (
        <SlidingPebbles
          text={"Loading..."}
          bgColor={"#fff"}
          center={true}
          width={"150px"}
          height={"150px"}
        />
      )}
    </>
  );
};

export default Datatable;
