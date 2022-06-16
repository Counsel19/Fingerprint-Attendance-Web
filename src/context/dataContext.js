import { createContext, useState } from "react";

const DataContext = createContext();

const DataContextProvider = ({ children }) => {
  const [allUsers, setAllUsers] = useState(null);
  const [allStudents, setAllStudents] = useState(null);
  const [currentUser, setCurrentUser] = useState([]);
  const [adminUser, setAdminUser] = useState([]);
  const [singleUser, setSingleUser] = useState(null);
  const [attendanceDetails, setAttendanceDetails] = useState(JSON.parse(localStorage.getItem("attendanceDetails")));
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
  const [showSidebar, setShowSidebar] = useState(false);

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
        showSidebar,
        setShowSidebar,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataContextProvider };
