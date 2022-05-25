import { useEffect, useState } from "react";
import "../new/new.scss";
import AdminSidebar from "../../components/adminSidebar/AdminSidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import { editUserInputs } from "../../formSource";
import {
  handleCreateStudents,
  handleEditLecturer,
} from "../../../services/createService";
import { getSingleUser } from "../../../services/getService";
import { useNavigate, useLocation } from "react-router-dom";

const Edit = ({ inputs, title, newCourse }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentLocation = location.pathname;
  let userId = currentLocation.split("/")[4];
  const [userInit, setUserInit] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const userData = await getSingleUser(userId);
      setUserInit(userData);
      setUser(userData);
      setCourseLecturing(userData.courses.length);
    };

    getData();
  }, []);

  const studentInit = {
    firstname: "",
    middlename: "",
    lastname: "",
    reg_number: "",
    department: "",
    faculty: "",
    gender: "male",
    level: "",
  };

  const [user, setUser] = useState(userInit);
  const [student, setStudent] = useState(studentInit);

  const [courseLecturing, setCourseLecturing] = useState(1);
  const [courseLecturers, setCourseLecturers] = useState(1);
  const [loading, setLoading] = useState(false);

  const [url, setUrl] = useState("");
  const [file, setFile] = useState(null);

  const handleIncrementInput = () => {
    setCourseLecturing(courseLecturing + 1);
    setCourseLecturers(courseLecturers + 1);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    setUrl(URL.createObjectURL(file));
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setUser({ ...user, image: reader.result });
    };
  };

  const handleCourseInput = (event, index) => {
    let name = event.target.name;
    let value = event.target.value;

    let courses = user.courses;

    courses[index] = value;

    setUser({ ...user, [name]: courses });
  };

  const handleInput = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    inputs === editUserInputs
      ? setUser({ ...user, [name]: value })
      : setStudent({ ...student, [name]: value });
  };

  const handleEdit = async (event) => {
    event.preventDefault();

    setLoading(true);

    try {
      if (inputs === editUserInputs) {
        await handleEditLecturer(user);

        setLoading(false);
        URL.revokeObjectURL(url);
        navigate(`/admin/users/${user.id}`);
      } else if (!newCourse) {
        await handleCreateStudents(student);
        setStudent(studentInit);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleChangePassword = () => {
    navigate(`${currentLocation}/change-password`);
  };

  return (
    <div className="new">
      <AdminSidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        {userInit && user && (
          <div className={`bottom ${newCourse && "addCourseStyle"}`}>
            {!newCourse && (
              <div className="left">
                <img src={file ? url : user.avatar} alt="" />
                <div className="formInput">
                  <label htmlFor="file">
                    Image: <DriveFolderUploadOutlinedIcon className="icon" />
                  </label>
                  <input
                    type="file"
                    id="file"
                    name="image"
                    onChange={handleFileInputChange}
                    style={{ display: "none" }}
                  />
                </div>
              </div>
            )}
            <div className="right">
              <form onSubmit={handleEdit}>
                {inputs.map((input) => (
                  <div className="formInput" key={input.id}>
                    <label>{input.label}</label>
                    <input
                      type={input.type}
                      name={input.name}
                      value={
                        inputs === editUserInputs
                          ? user[`${input.name}`]
                          : student[`${input.name}`]
                      }
                      placeholder={input.placeholder}
                      onChange={handleInput}
                      required
                    />
                  </div>
                ))}
                {!newCourse && (
                  <div className="formInput">
                    <label>Gender: </label>
                    <select
                      name="gender"
                      value={user.gender}
                      onChange={handleInput}
                      required
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                )}
                {inputs === editUserInputs && (
                  <div className="formInput">
                    <label>
                      Courses{" "}
                      <span onClick={() => handleIncrementInput("course")}>
                        <AddCircleOutlineIcon />
                      </span>
                    </label>
                    {new Array(courseLecturing).fill().map((_, index) => (
                      <input
                        key={index}
                        name="courses"
                        onChange={(event) => handleCourseInput(event, index)}
                        type="text"
                        value={user.courses[index]}
                        required
                      />
                    ))}
                  </div>
                )}

                {inputs === editUserInputs && (
                  <div className="edit__password">
                    <p onClick={handleChangePassword}>
                      <EditIcon /> Change Password
                    </p>
                  </div>
                )}

                <button disabled={loading} type="submit">
                  Send
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Edit;
