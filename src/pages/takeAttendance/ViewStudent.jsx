import React from "react";

const ViewStudent = () => {
  return (
    <div className="viewStudent__container">
        <h3>View Student</h3>
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
