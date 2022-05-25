import React, { useState } from "react";
import { TableCell } from "@mui/material";

const StudentStatsTableCell = ({ row }) => {
    const [remark] = useState(row.percentage >= 70 ? "Pass" : "Failed")
  return (
    <>
      <TableCell align="left">
        {row.reg_number}
      </TableCell>
      <TableCell align="center" padding="none">
        {`${row.lastname} ${row.firstname} ${row.middlename}`}
      </TableCell>
      <TableCell align="center" >
        {row.present}
      </TableCell>
      <TableCell align="center" >
        {row.absent}
      </TableCell>
      <TableCell align="center">
        {row.percentage}%
      </TableCell>
      <TableCell align="left" style={ remark==="Pass" ? {color: "green", fontWeight: 500} : {color: "red", fontWeight: 500}}>{remark}</TableCell>
    </>
  );
};

export default StudentStatsTableCell;
