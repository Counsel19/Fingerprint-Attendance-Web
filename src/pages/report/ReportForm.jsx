import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { NavBar, Sidebar } from "../../components";
import InputForm from "../../components/input-form/InputForm";
import "./reportForm.css";
import { DataContext } from "../../context/dataContext";

const ReportForm = () => {
  const [course, setCourse] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useContext(DataContext);

  const handleViewReport = (e) => {
    e.preventDefault();
    setLoading(true);

    navigate(`/report/${course}`);
  };

  return (
    <div className="report__form">
      <Sidebar />
      <div className="report__formDetails">
        <NavBar currentUser={currentUser} />
        <div className="report__formWrapper">
          <h1>View Report</h1>
          <InputForm
            reportForm={true}
            handleSubmit={handleViewReport}
            setCourse={setCourse}
            course={course}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default ReportForm;
