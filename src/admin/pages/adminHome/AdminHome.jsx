import { useContext } from "react";
import AdminSidebar from "../../components/adminSidebar/AdminSidebar";
import Navbar from "../../components/navbar/Navbar";
import "./adminHome.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import { DataContext } from "../../../context/dataContext";

const AdminHome = () => {
  const { showSidebar } = useContext(DataContext)
  return (
    <div className="home" styles={showSidebar ? {height: "100vh", overflow: "hidden" }: undefined}>
      <AdminSidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="lecturers" />
          <Widget type="students" />
          <Widget type="attendance" />
          <Widget type="courses" />
        </div>
        <div className="charts">
          <Featured />
          <Chart title="Last 6 Months (Attendance)" aspect={2/1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Recent Submitted Attendance</div>
          <Table recentAttendance={true} />
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
