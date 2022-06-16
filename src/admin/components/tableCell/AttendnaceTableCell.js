import { TableCell } from "@mui/material";
import React from "react";
import "./tableCell.scss";

const AttendanceTableCell = ({ row, handleViewAttendance }) => {
  return (
    <>
      <TableCell
        align="left"
        padding="none"
      >{`${row.firstname} ${row.lastname}`}</TableCell>
      <TableCell align="left" padding="none">
        {row.course}
      </TableCell>
      <TableCell
        align="left"
        padding="none"
        
      >{`${row.session}/${row.semester}`}</TableCell>
      <TableCell align="left" padding="none">
        {row.date}
      </TableCell>
      <TableCell align="right">{row.students_present.length}</TableCell>
      <TableCell align="right">
        <span>{`${row.percentage}%`}</span>
      </TableCell>
      <TableCell align="left" padding="none">
        <span
          className="tabelAction"
          onClick={() => handleViewAttendance(row.id)}
        >
          Details
        </span>
      </TableCell>
    </>
  );
};

export default AttendanceTableCell;
