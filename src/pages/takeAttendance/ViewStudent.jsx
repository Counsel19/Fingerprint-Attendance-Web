import React from "react";
import AddIcon from '@mui/icons-material/Add';

const ViewStudent = ({setShowView}) => {
  return (
    <div className="viewStudent__container">
      <div className="viewStudent__top">
        <h3>View Student</h3>
        <button onClick={() =>setShowView(false)}> <AddIcon /> Add Student</button>
      </div>

      <div className="viewStudent__inside">
        <div className="viewStudent__wrapper">
          <p>
            Name: <span>Okpabi Counsel</span>
          </p>
          <p>
            Reg. Number: <span>20171035175</span>
          </p>
          <p>
            Department: <span>CSC</span>
          </p>
          <p>
            Faculty: <span>SCIT</span>
          </p>
        </div>
        <img src="/images/default.png" alt="" />
      </div>
    </div>
  );
};

export default ViewStudent;
