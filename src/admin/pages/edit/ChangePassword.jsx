import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AdminSidebar from "../../components/adminSidebar/AdminSidebar";
import Navbar from "../../components/navbar/Navbar";
import "../new/new.scss";

const ChangePassword = ({ inputs }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentLocation = location.pathname;
  let userId = currentLocation.split("/")[4];
  const passwordInit = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const [passwords, setPasswords] = useState(passwordInit);
  const [loading, setLoading] = useState(false);
  const emptyField =
    passwords.confirmPassword === "" &&
    passwords.newPassword === "" &&
    passwords.currentPassword === "";

  const handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    setPasswords({ ...passwords, [name]: value });
  };

  const handleChangePassword = async (event) => {
    event.preventDefault();
    setLoading(true);

    console.log("passwords", passwords)

    if (passwords.newPassword === passwords.confirmPassword) {
      const res = await fetch(
        `http://localhost:3001/api/users/${userId}/change-password`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(passwords),
        }
      );

      const data = await res.json();

      if (res.ok) {
        window.alert("Password Change Successfull");
        navigate(`/admin/users/edit/${userId}`);
      } else {
        window.alert(data);
        setLoading(false);
      }
    } else {
      window.alert("Passwords do not match");
      setLoading(false);
    }
  };

  return (
    <div className="new">
      <AdminSidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Change Password</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form onSubmit={handleChangePassword}>
              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    type={input.type}
                    name={input.name}
                    value={passwords[`${input.name}`]}
                    placeholder={input.placeholder}
                    onChange={handleChange}
                    required
                  />
                </div>
              ))}

              <button disabled={loading || emptyField} type="submit">
                Change
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
