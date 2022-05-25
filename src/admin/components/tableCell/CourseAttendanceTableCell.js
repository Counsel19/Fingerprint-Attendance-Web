import { TableCell } from "@mui/material";
import React from "react";

const CourseAttendanceTableCell = ({ row, handleViewAttendance }) => {
  return (
    <>
      <TableCell align="left" padding="none">
        {row.date}
      </TableCell>
      <TableCell align="right">{row.students_present.length}</TableCell>
      <TableCell align="right">{row.percentage}%</TableCell>
      <TableCell align="right">{row.numAbsent}</TableCell>
      {handleViewAttendance && (
        <TableCell align="right">
          {" "}
          <span
            className="tabelAction"
            onClick={() => handleViewAttendance(row.id)}
          >
            Details
          </span>
        </TableCell>
      )}
    </>
  );
};

export default CourseAttendanceTableCell;
