import { useState } from "react";
import "./new.scss";
import AdminSidebar from "../../components/adminSidebar/AdminSidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { userInputs, studentInputs } from "../../formSource";
import {
  handleCreateStudents,
  handleCreateLecturer,
  handleCreateCourse,
} from "../../../services/createService";
import { validateCourse } from "../../../services/validate";
import "../../../pages/takeAttendance/takeAttendanceForm.css";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import useScript from "../../../hooks/useScript";

const New = ({ inputs, title, newCourse }) => {
  const userInit = {
    firstname: "",
    lastname: "",
    department: "",
    faculty: "",
    rank: "",
    phone: "",
    gender: "male",
    courses: [""],
    email: "",
    password: "",
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
  };

  const courseInit = {
    course_code: "",
    course_title: "",
    num_students_offering: 0,
    course_lecturers: [],
  };
  let fingerprint = ["Thumb", "Index", "Middle", "Ring", "Little"];

  const [user, setUser] = useState(userInit);
  const [student, setStudent] = useState(studentInit);
  const [course, setCourse] = useState(courseInit);

  const [courseLecturing, setCourseLecturing] = useState(1);
  const [courseLecturers, setCourseLecturers] = useState(1);
  const [loading, setLoading] = useState(false);
  const [currentCourseLecturer, setCurrentCourseLecturer] = useState("");
  const [url, setUrl] = useState("");
  const [file, setFile] = useState(null);
  const [index, setIndex] = useState(0);
  const [pngImage, setPngImage] = useState(null)
  const handleIncrementInput = (name) => {
    setCourseLecturing(courseLecturing + 1);
    setCourseLecturers(courseLecturers + 1);

    if (name === "lecturer") {
      let lecturers = course.course_lecturers;
      lecturers.push(currentCourseLecturer);
      setCourse({ ...course, course_lecturers: lecturers });
    }
  };

  //Including Scanner Script file
  useScript("https://js.camsunit.com/jquery-1.11.3.min.js")
  useScript("https://js.camsunit.com/camsScanner.js")

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
    console.log("use course for index", user.courses[index]);

    courses[index] = value;

    setUser({ ...user, [name]: courses });

    console.log("use course ", user.courses);
  };

  const handleInput = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    if (name === "num_students_offering") {
      value = Number(value);
      setCourse({ ...course, [name]: value });
    } else {
      inputs === userInputs
        ? setUser({ ...user, [name]: value })
        : !newCourse
        ? setStudent({ ...student, [name]: value })
        : setCourse({ ...course, [name]: value });
    }
  };

  const handleCapture = async () => {
    const returnPNGImage = true; 
    
    // eslint-disable-next-line no-undef
     const data = capture(process.env.REACT_APP_SCANNER_API_KEY, returnPNGImage)
    
     function onSuccess(data) {
      console.log(data);
      var plainData = data;
      //write the program to decrypt if security key is set in API monitor for the scanner
    
      // eslint-disable-next-line no-undef
      const successData = getScannerSuccessData(plainData);
    
      if (successData.operation === "Capture") {
        setPngImage("data:image/png;base64," + successData.image) ;
    
        
        const temp =  successData.template;
        
      }
    }

    onSuccess(data)

  }

  const handleCreate = async (event) => {
    event.preventDefault();

    setLoading(true);

    let lecturers = course.course_lecturers;
    lecturers.push(currentCourseLecturer);
    setCourse({ ...course, course_lecturers: lecturers });

    console.log("user", user);

    if (await validateCourse(course.course_code)) {
      try {
        if (inputs === userInputs) {
          await handleCreateLecturer(user);
          setUser(userInit);
          setCourseLecturing(1);
          setLoading(false);
          URL.revokeObjectURL(url);
        } else if (!newCourse) {
          await handleCreateStudents(student);
          setStudent(studentInit);
          setLoading(false);
        } else {
          await handleCreateCourse(course);
          setCourse(courseInit);
          setCourseLecturers(1);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    } else {
      window.alert("Course Already Exist");
      setLoading(false);
      return;
    }
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
              {studentInputs && (
                <>
                  <p>{`Place right ${fingerprint[index]} finger on scanner to enroll`}</p>

                  <div className="capture__inner">
                    <ArrowBackIosNewIcon onClick={() => index >= 1 && setIndex(index - 1)} />
                    <div className="view__capture enroll" style={pngImage && {backgroundImage: url(pngImage)}}></div>
                    <ArrowForwardIosIcon onClick={() => index <= 3 && setIndex(index + 1)} />
                  </div>
                  <button disabled={loading} type="submit" onClick={handleCapture}>
                    Capture
                  </button>
                </>
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
                    value={user.gender}
                    onChange={handleInput}
                    required
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              )}
              {inputs === userInputs && (
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
              {newCourse && (
                <div className="formInput">
                  <label>
                    Course Lecturer(s){" "}
                    <span onClick={() => handleIncrementInput("lecturer")}>
                      <AddCircleOutlineIcon />
                    </span>
                  </label>
                  {new Array(courseLecturers).fill().map((_, index) => (
                    <input
                      key={index}
                      name="course_lecturers"
                      onChange={(e) => setCurrentCourseLecturer(e.target.value)}
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
