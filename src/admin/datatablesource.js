export const userColumns = [
  { field: "id", headerName: "ID", width: 100 },

  {
    field: "firstname",
    headerName: "Firstname",
    width: 120,
  },
  {
    field: "lastname",
    headerName: "Lastname",
    width: 120,
  },
  {
    field: "email",
    headerName: "Email",
    width: 200,
  },
  {
    field: "department",
    headerName: "Department",
    width: 100,
  },
  {
    field: "faculty",
    headerName: "Faculty",
    width: 70,
  },
  {
    field: "rank",
    headerName: "Rank",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.rank}`}>
          {params.row.rank}
        </div>
      );
    },
  },
];

export const studentColumns = [
  { field: "id", headerName: "ID", width: 100 },

  {
    field: "firstname",
    headerName: "Firstname",
    width: 120,
  },
  {
    field: "middlename",
    headerName: "Middlename",
    width: 120,
  },
  {
    field: "lastname",
    headerName: "Lastname",
    width: 120,
  },
  {
    field: "reg_number",
    headerName: "Reg Number",
    width: 120,
  },
  {
    field: "department",
    headerName: "Department",
    width: 100,
  },
  {
    field: "faculty",
    headerName: "Faculty",
    width: 70,
  },
  {
    field: "gender",
    headerName: "Gender",
    width: 100,
  },
  {
    field: "level",
    headerName: "Level",
    width: 50,
  },
];

export const courseColumns = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "course_title", headerName: "Course Title", width: 200 },
  { field: "course_code", headerName: "Course Code", width: 50 },
  { field: "course_lecturers", headerName: "Lecturers", width: 200 },
];
