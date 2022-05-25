import { useEffect, useState, useContext } from "react";
import "./featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import { getAttendanceSummary, getTodayAttendancePercentage } from "../../../services/getService";
import { DataContext } from "../../../context/dataContext";

const Featured = () => {
  const { setAttendanceTrack } = useContext(DataContext);
  const [todayAttendanceTotal, setTodayAttendanceTotal] = useState(0);
  const [lastWeekAttendance, setLastWeekAttendance] = useState(0);
  const [currentWeekAttendance, setCurrentWeekAttendance] = useState(0);
  const [lastMonthAttendance, setLastMonthAttendance] = useState(0);
  const [todayAttendancePercentage, setTodayAttendancePercentage] = useState(0);

  useEffect(() => {
    const getData = async () => {
      const {
        recentRes,
        oneMonthRes,
        lastWeekRes,
        currentWeekRes,
      } = await getAttendanceSummary();

      
      setTodayAttendancePercentage(await getTodayAttendancePercentage())
      

      setTodayAttendanceTotal(recentRes.length)
      setLastWeekAttendance(lastWeekRes.length)
      setCurrentWeekAttendance(currentWeekRes.length)
      setLastMonthAttendance(oneMonthRes.data.length)

      return(() => {})
    };

    getData();
  }, [setAttendanceTrack]);

  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Total Attendance</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar value={todayAttendancePercentage} text={`${todayAttendancePercentage}%`} strokeWidth={5} />
        </div>
        <p className="title">Total No. of Attendance Submitted Today</p>
        <p className="amount">{todayAttendanceTotal}</p>
        <p className="desc">
          Previous attendance processing. Last attendance submitted may not be
          included.
        </p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">Curent Week</div>
            <div className="itemResult negative">
              <KeyboardArrowDownIcon fontSize="small" />
              <div className="resultAmount">{currentWeekAttendance}</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Week</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
              <div className="resultAmount">{lastWeekAttendance}</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Month</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
              <div className="resultAmount">{lastMonthAttendance}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
