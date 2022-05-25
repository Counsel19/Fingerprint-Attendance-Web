import { createContext, useState } from "react";


const DataContext = createContext();

const DataContextProvider = ({ children }) => {

  const [allUsers, setAllUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const [adminUser, setAdminUser] = useState([]);
  const [singleUser, setSingleUser] = useState(null);
  const [allStudents, setAllStudents] = useState([]);
  const [attendanceDetails, setAttendanceDetails] = useState({
    course: "",
    semester: "",
    session: "",
    date: "",
    students_present: [],
  });
  const [attendance, setAttendance] = useState([]);
  const [attendanceTrack, setAttendanceTrack] = useState({
    currentMonth: 0,
    oneMonth: 0,
    twoMonth: 0,
    threeMonth: 0,
    fourMonth: 0,
    fiveMonth: 0,
  });
  const [q, setQ] = useState("");

  return (
    <DataContext.Provider
      value={{
        allUsers,
        setAllUsers,
        currentUser,
        setCurrentUser,
        singleUser,
        setSingleUser,
        allStudents,
        setAllStudents,
        attendanceDetails,
        setAttendanceDetails,
        attendance,
        setAttendance,
        attendanceTrack,
        setAttendanceTrack,
        adminUser,
        setAdminUser,
        q,
        setQ,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataContextProvider };
