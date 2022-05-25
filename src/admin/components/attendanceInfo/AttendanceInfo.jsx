import "./attendanceInfo.scss";

const AttendanceInfo = ({ attendanceRecord }) => {
  const info = attendanceRecord.info;

  return (
    <div>
      {info?.map((data) => (
        <div key={data.id} className="attendanceInfo">
          <div>
            Lecturer: <span>{`${data.firstname} ${data.lastname}`}</span>
          </div>
          <div>
            Course: <span>{data.course}</span>
          </div>
          <div>
            Semester: <span>{data.semester}</span>
          </div>
          <div>
            Session: <span>{data.session}</span>
          </div>
          <div>
            Total Students in Attendance:{" "}
            <span>{data.students_present.length}</span>
          </div>
          <div>
            Percentage Attendance: <span>{data.percentage}%</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AttendanceInfo;
