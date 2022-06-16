import { useState } from "react";
import "./new.scss";
import AdminSidebar from "../../components/adminSidebar/AdminSidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { userInputs, studentInputs } from "../../formSource";
import {
  handleCreateStudents,
  handleCreateLecturer,
  handleCreateCourse,
} from "../../../services/createService";
import { validateCourse, validateCourses } from "../../../services/validate";
import "../../../pages/takeAttendance/takeAttendanceForm.css";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { capture } from "../../../services/scannerServices";

const New = ({ inputs, title, newCourse }) => {
  const userInit = {
    firstname: "",
    lastname: "",
    department: "",
    faculty: "",
    rank: "",
    phone: "",
    gender: "",
    courses: [""],
    email: "",
    password: "",
    image: "",
  };

  const studentInit = {
    firstname: "",
    middlename: "",
    lastname: "",
    reg_number: "",
    department: "",
    faculty: "",
    gender: "male",
    level: "",
    image: "",
  };

  const courseInit = {
    course_code: "",
    course_title: "",
    num_students_offering: "",
    course_lecturers: [],
  };
  let hand = ["Right", "Left"];
  let [fingerprintTemp, setFingerprintTemp] = useState([]);
  const [user, setUser] = useState(userInit);
  const [student, setStudent] = useState(studentInit);
  const [course, setCourse] = useState(courseInit);

  const [courseLecturing, setCourseLecturing] = useState(1);
  const [courseLecturers, setCourseLecturers] = useState(1);
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");
  const [file, setFile] = useState(null);
  const [index, setIndex] = useState(0);
  const [pngImage, setPngImage] = useState(null);

  //Including Scanner Script file

  const handleIncrementInput = (e, name) => {
    if (name === "lecturer") {
      setCourseLecturers(parseInt(e.target.value));
    } else {
      setCourseLecturing(parseInt(e.target.value));
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];

    if (file.size > 2 * 1048576) {
      alert("File too large");
      return;
    } else {
      setFile(file);
      setUrl(URL.createObjectURL(file));
      if (!file) return;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (inputs === userInputs) {
          setUser({ ...user, image: reader.result });
        } else {
          setStudent({ ...student, image: reader.result });
        }
      };
    }
  };

  const handleCourseAndLecturerInput = (event, index) => {
    let name = event.target.name;
    let value = event.target.value;

    let courses = user.courses;
    let lecturers = course.course_lecturers;

    if (name === "course_lecturers") {
      lecturers.length = courseLecturers;
      lecturers[index] = value;
      setCourse({
        ...course,
        course_lecturers: lecturers,
      });
    } else {
      courses.length = courseLecturing;
      courses[index] = value;
      setUser({ ...user, [name]: courses });
    }
  };

  const handleInput = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    inputs === userInputs
      ? setUser({ ...user, [name]: value })
      : !newCourse
      ? setStudent({ ...student, [name]: value })
      : setCourse({ ...course, [name]: value });
  };

  const handleCapture = async () => {
    setPngImage(null);
    let tempState = [...fingerprintTemp];
    const returnPNGImage = true;
    const data = await capture(
      process.env.REACT_APP_SCANNER_API_KEY,
      returnPNGImage
    );
    setPngImage(data.pngImage);
    tempState[index] = data.temp;

    setFingerprintTemp(tempState);
  };

  const handleCreate = async (event) => {
    event.preventDefault();

    setLoading(true);

    if (inputs === studentInputs && fingerprintTemp.length !== 2) {
      window.alert("Capture Student Fingerprint Appropriately");
      setStudent(studentInit);
      setLoading(false);
      return;
    }

    if (newCourse) {
      let num = parseInt(course.num_students_offering);
      if (num) {
        setCourse({
          ...course,

          num_students_offering: num,
        });
      } else {
        window.alert("Invalid Number of Students");
        setLoading(false);
        return;
      }
    }

    try {
      if (inputs === userInputs) {
        let courses = user.courses;
        courses.splice(courseLecturing);
        setUser({ ...user, courses: courses });

        const validCourse = await validateCourses(user.courses);
        if (validCourse) {
          await handleCreateLecturer(user);
          setUser(userInit);
          setUrl(
            "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
          );
          setCourseLecturing(1);
        } else {
          window.alert("Invalid Course");
          setLoading(false);
          return;
        }
        URL.revokeObjectURL(url);
      } else if (inputs === studentInputs) {
        await handleCreateStudents(student, fingerprintTemp);
        setStudent(studentInit);
        setUrl(
          "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
        );
        setPngImage(null);
        setIndex(0);
        setLoading(false);
        URL.revokeObjectURL(url);
      } else {
        let lecturers = course.course_lecturers;
        lecturers.splice(courseLecturers);
        setCourse({
          ...course,
          course_lecturers: lecturers,
        });
        const validCourse = await validateCourse(course.course_code);
        if (validCourse) {
          await handleCreateCourse(course);
          setCourse(courseInit);
          setCourseLecturers(1);
          setLoading(false);
        } else {
          window.alert("Course Already Exist");
          setLoading(false);
          return;
        }
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleNext = () => {
    setPngImage(null);
    index === 0 && setIndex(index + 1);
  };
  const handlePrev = () => {
    index === 1 && setIndex(index - 1);
  };

  return (
    <div className="new">
      <AdminSidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className={`bottom ${newCourse && "addCourseStyle"}`}>
          {!newCourse && (
            <div className="left">
              <img
                src={
                  file
                    ? url
                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                }
                alt=""
              />
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
              {inputs === studentInputs && (
                <div className="left__bottom">
                  <p>
                    Place {` `}
                    <span>{hand[index]} Thumb </span>
                    finger on scanner to enroll
                  </p>

                  <div className="capture__inner">
                    <ArrowBackIosNewIcon onClick={handlePrev} />

                    <div
                      className="view__capture enroll"
                      style={
                        pngImage && { backgroundImage: `url(${pngImage})` }
                      }
                    ></div>
                    <ArrowForwardIosIcon onClick={handleNext} />
                  </div>
                  <button
                    disabled={loading}
                    type="submit"
                    onClick={handleCapture}
                  >
                    Capture
                  </button>
                </div>
              )}
            </div>
          )}
          <div className="right">
            <form onSubmit={handleCreate}>
              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    type={input.type}
                    name={input.name}
                    value={
                      inputs === userInputs
                        ? user[`${input.name}`]
                        : !newCourse
                        ? student[`${input.name}`]
                        : course[`${input.name}`]
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
                    defaultValue="male"
                    onChange={handleInput}
                    required
                  >
                    <option>--Select--</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              )}
              {inputs === userInputs && (
                <div className="formInput">
                  <label>
                    Courses{" "}
                    <select
                      value={courseLecturing}
                      onChange={(e) => handleIncrementInput(e, "course")}
                    >
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                      <option value={5}>5</option>
                      <option value={6}>6</option>
                      <option value={7}>7</option>
                      <option value={8}>8</option>
                      <option value={9}>9</option>
                    </select>
                  </label>

                  {new Array(courseLecturing).fill().map((_, index) => (
                    <input
                      key={index}
                      name="courses"
                      onChange={(event) =>
                        handleCourseAndLecturerInput(event, index)
                      }
                      type="text"
                      value={user.courses[index] ? user.courses[index] : ""}
                      required
                    />
                  ))}
                </div>
              )}
              {newCourse && (
                <div className="formInput">
                  <label>
                    Lecturer(s)
                    <select
                      value={courseLecturers}
                      onChange={(e) => handleIncrementInput(e, "lecturer")}
                    >
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                      <option value={5}>5</option>
                      <option value={6}>6</option>
                      <option value={7}>7</option>
                      <option value={8}>8</option>
                      <option value={9}>9</option>
                    </select>
                  </label>

                  {new Array(courseLecturers).fill().map((_, index) => (
                    <input
                      key={index}
                      name="course_lecturers"
                      onChange={(event) =>
                        handleCourseAndLecturerInput(event, index)
                      }
                      type="text"
                      required
                    />
                  ))}
                </div>
              )}
              <button disabled={loading} type="submit">
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
