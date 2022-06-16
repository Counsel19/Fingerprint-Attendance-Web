import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavBar, Sidebar } from "../../components";
import { DataContext } from "../../context/dataContext";
import "../../admin/pages/new/new.scss"

const UserChangePassword = ({ inputs }) => {
    const { currentUser} = useContext(DataContext)
  const navigate = useNavigate();
 

  
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

    if (passwords.newPassword === passwords.confirmPassword) {
      const res = await fetch(
        `https://fingerprintattendanceserver.herokuapp.com/api/users/${currentUser.id}/change-password`,
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
        navigate(`/profile/edit`);
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
      <Sidebar />
      <div className="newContainer userEdit">
        <NavBar currentUser={currentUser} />
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

export default UserChangePassword;
