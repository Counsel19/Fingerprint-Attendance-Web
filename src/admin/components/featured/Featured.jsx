import { useEffect, useState, useContext } from "react";
import "./featured.scss";
import InfoIcon from '@mui/icons-material/Info';
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  getAttendanceSummary,
  getTodayAttendancePercentage,
} from "../../../services/getService";
import { DataContext } from "../../../context/dataContext";

const Featured = () => {
  const { setAttendanceTrack, adminUser } = useContext(DataContext);
  const [todayAttendanceTotal, setTodayAttendanceTotal] = useState(0);
  const [lastWeekAttendance, setLastWeekAttendance] = useState(0);
  const [currentWeekAttendance, setCurrentWeekAttendance] = useState(0);
  const [lastMonthAttendance, setLastMonthAttendance] = useState(0);
  const [todayAttendancePercentage, setTodayAttendancePercentage] = useState(0);

  useEffect(() => {
    const getData = async () => {
      const { recentRes, oneMonthRes, lastWeekRes, currentWeekRes } =
        await getAttendanceSummary();

      setTodayAttendancePercentage(await getTodayAttendancePercentage(adminUser.id));

      setTodayAttendanceTotal(recentRes.length);
      setLastWeekAttendance(lastWeekRes.length);
      setCurrentWeekAttendance(currentWeekRes.length);
      setLastMonthAttendance(oneMonthRes.data.length);

      return () => {};
    };

    getData();
  }, [adminUser.id, setAttendanceTrack]);

  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Today Attendance Percentage</h1>
        
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar
            value={todayAttendancePercentage}
            text={`${todayAttendancePercentage}%`}
            strokeWidth={5}
          />
        </div>
        <p className="title">Total No. of Attendance Submitted Today</p>
        <p className="amount">{todayAttendanceTotal}</p>
        <p className="desc">
          Previous attendance processing. Last attendance submitted may not be
          included.
        </p>

        <div className="summary">
          <div className="feature__item">
            <div className="itemTitle">Curent Week</div>
            <div className={`itemResult ${currentWeekAttendance > 1 ? "positive": "negative" } `}>
              <InfoIcon className="info__icon" />
              <div className="resultAmount">{currentWeekAttendance}</div>
            </div>
          </div>
          <div className="feature__item">
            <div className="itemTitle">Last Week</div>
            <div className={`itemResult ${lastWeekAttendance > 1 ? "positive": "negative" } `}>
              <InfoIcon className="info__icon"/>
              <div className="resultAmount">{lastWeekAttendance}</div>
            </div>
          </div>
          <div className="feature__item">
            <div className="itemTitle">Last Month</div>
            <div className={`itemResult ${lastMonthAttendance > 1 ? "positive": "negative" } `}>
              <InfoIcon className="info__icon"/>
              <div className="resultAmount">{lastMonthAttendance}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
