import { useContext, useEffect } from "react";
import "../table/table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { DataContext } from "../../../context/dataContext";
import { useNavigate } from "react-router-dom";
import {
  getCourseAttendancePercentage,
  getUserFistnameLastname,
} from "../../../services/getService";

const SingleTable = ({ attendanceData }) => {
  const { attendance, setAttendance, adminUser } = useContext(DataContext);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      let attendanceDoc = await Promise.all(
        attendanceData.map(async (data) => {

          const percentage = await getCourseAttendancePercentage({
            studentList: data.students_present,
            courseCode: data.course,
          }, adminUser.id);
          const lecturer = await getUserFistnameLastname(data.user_docId, data.user_docId);
          return {
            ...data,
            percentage: Math.floor(percentage),
            ...lecturer,
          };
        })
      );

      attendanceDoc.sort((b, a) => a.date - b.date);
      setAttendance(attendanceDoc);
    };
    getData();
  }, [attendanceData, setAttendance]);

  const handleViewAttendance = async (id) => {
    navigate(`/admin/attendance/${id}`);
  };

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ maxWidth: 1200 }} aria-label="Attendance Table">
        <TableHead>
          <TableRow className="tableRow">
            <TableCell className="tableCell">ID</TableCell>
            <TableCell className="tableCell">Lecturer</TableCell>
            <TableCell className="tableCell">Course Code</TableCell>
            <TableCell className="tableCell">Session/Semester</TableCell>
            <TableCell className="tableCell">Time</TableCell>
            <TableCell className="tableCell">Attendance</TableCell>
            <TableCell className="tableCell">Percentage</TableCell>
            <TableCell className="tableCell">View</TableCell>
          </TableRow>
        </TableHead>

        {attendance.length !== 0 ? (
          <TableBody className="tableBody">
            {attendance.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="tableCell">{row.id}</TableCell>
                <TableCell className="tableCell">{`${row.firstname} ${row.lastname}`}</TableCell>
                <TableCell className="tableCell">{row.course}</TableCell>
                <TableCell className="tableCell">{`${row.session}/${row.semester}`}</TableCell>
                <TableCell className="tableCell">{row.date}</TableCell>
                <TableCell className="tableCell">
                  {row.students_present.length}
                </TableCell>
                <TableCell className="tableCell">
                  <span
                    className={`remark ${row.percentage}`}
                  >{`${row.percentage}%`}</span>
                </TableCell>
                <TableCell className="tableCell">
                  <span
                    className="tabelAction"
                    onClick={() => handleViewAttendance(row.id)}
                  >
                    Details
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        ) : (
          <TableBody className="no__data">
            <TableRow>
              <TableCell align="center">No Data</TableCell>
            </TableRow>
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
};

export default SingleTable;
