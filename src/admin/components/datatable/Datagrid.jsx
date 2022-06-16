import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { Link } from "react-router-dom";
import SearchInput from "../../../components/input-form/SearchInput";
import { search } from "../../../services/search";
import AttendanceInfo from "../attendanceInfo/AttendanceInfo";
import "./datatable.scss";

const Datagrid = ({
  addLink,
  data,
  searchParams,
  q,
  columns,
  actionColumn,
  attendanceRecord,
}) => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column" }}
      className="datatable"
    >
      <div className="datatableTitle">
        <SearchInput />
        <Link to={addLink} className="link">
          Add New
        </Link>
      </div>
      {attendanceRecord && (
        <AttendanceInfo attendanceRecord={attendanceRecord} />
      )}
      <DataGrid
        className="datagrid"
        rows={search(data, searchParams, q)}
        columns={actionColumn ? columns.concat(actionColumn) : columns}
        pageSize={9}
        rowsPerPageOptions={[1]}
        checkboxSelection
      />
    </div>
  );
};

export default Datagrid;
