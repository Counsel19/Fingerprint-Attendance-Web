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
import Datagrid from "./Datagrid";

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
        setAttendance(await getAttendanceDetails(adminUser.id, true));
      }
    };

    getData();
  }, [adminUser.id, attendanceData]);

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

  const handleDelete = async (id) => {
    // eslint-disable-next-line no-restricted-globals
    let proceed = confirm("Are you sure You want to delete?");

    if (id !== adminUser.id) {
      if (proceed) {
        let res1, res2;
        if (user) {
          setAllUsers(allUsers?.filter((item) => item.id !== id));
          try {
            try {
              res1 = await fetch(
                `https://fingerprintattendanceserver.herokuapp.com/api/users/${adminUser.id}/deletedId/${id}`,
                {
                  method: "DELETE",
                  credentials: "include",
                }
              );
            } catch (error) {
              console.log(error);
            }

            try {
              res2 = await fetch(
                `https://fingerprintattendanceserver.herokuapp.com/api/attendance/${adminUser.id}/deletedId/${id}`,
                {
                  method: "DELETE",
                  credentials: "include",
                }
              );
            } catch (error) {
              console.log(error);
            }
          
            if (res1.ok && res2.ok) {
              alert("User Deleted Successfully!");
            } else {
              alert("Request Error");
            }
          } catch (error) {
            console.log(error);
          }
        } else {
          setAllStudents(allStudents?.filter((item) => item.id !== id));
          try {
            try {
              res1 = await fetch(
                `https://fingerprintattendanceserver.herokuapp.com/api/students/${adminUser.id}/deletedId/${id}`,
                {
                  method: "DELETE",
                  credentials: "include",
                }
              );
            } catch (error) {
              console.log(error);
            }

            try {
              res2 = await fetch(
                `https://fingerprintattendanceserver.herokuapp.com/api/attendance/${adminUser.id}/studentId/${id}`,
                {
                  method: "DELETE",
                  credentials: "include",
                }
              );
            } catch (error) {
              console.log(error);
            }

            if (res1.ok && res2.ok) {
              alert("Student Deleted Successfully!");
            } else {
              alert("Request Error");
            }
          } catch (error) {
            console.log(error);
          }
        }
      }
    } else {
      alert("You are not Permitted to delete the admin");
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
            {user && (
              <div
                onClick={() => handleView(params.row.id)}
                className="viewButton"
              >
                View
              </div>
            )}

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
        <>
          <h1 className="tableTitle">All Lecturers</h1>
          <Datagrid
            title="All Lecturers"
            addLink="/admin/users/new"
            data={allUsers}
            searchParams={searchParamsUser}
            q={q}
            columns={userColumns}
            actionColumn={actionColumn}
          />
        </>
      ) : student && allStudents ? (
        <>
          <h1 className="tableTitle ">All Students</h1>
          <Datagrid
            addLink="/admin/students/new"
            data={allStudents}
            searchParams={searchParamsStudent}
            q={q}
            columns={studentColumns}
            actionColumn={actionColumn}
          />
        </>
      ) : attendanceData && attendanceRecord ? (
        <>
          <h1 className="tableTitle">Attendance Record</h1>
          <Datagrid
            addLink="/admin/students/new"
            data={attendanceRecord?.data}
            searchParams={searchParamsStudent}
            q={q}
            columns={studentColumns}
            attendanceRecord={attendanceRecord}
          />
        </>
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
