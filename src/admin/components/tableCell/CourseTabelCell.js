import { TableCell } from "@mui/material";
import React from "react";
import "./tableCell.scss"

const CourseTabelCell = ({ row }) => {
  return (
    <>
      <TableCell align="left" padding="none">
        {row.course_title}
      </TableCell>
      <TableCell align="left" padding="none">
        {row.course_code}
      </TableCell>
      <TableCell align="left" padding="none">
        {row.course_lecturers.map((lecturer, index) => (
          <p key={index}>{lecturer}</p>
        ))}
      </TableCell>
      <TableCell align="right">{row.num_students_offering}</TableCell>
    </>
  );
};

export default CourseTabelCell;
