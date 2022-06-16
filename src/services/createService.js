export const handleCreateLecturer = async (user) => {
  const {
    firstname,
    lastname,
    department,
    faculty,
    rank,
    phone,
    gender,
    courses,
    email,
    password,
    image,
  } = user;

  try {
    const res = await fetch("https://fingerprintattendanceserver.herokuapp.com/api/users", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname,
        lastname,
        department,
        faculty,
        rank,
        gender,
        courses,
        phone,
        email,
        password,
        image
      }),
    });
    if (res.status === 400 || !res) {
      window.alert("Request Error!");
    } else {
      window.alert("Lecturer Created");
    }
  } catch (error) {
    console.log(error);
  }
};

export const handleEditLecturer = async (user) => {
  try {
    const res = await fetch(`https://fingerprintattendanceserver.herokuapp.com/api/users/${user.id}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    let data = await res.json();
    if (res.status === 400) {
      window.alert(data.message);
    } else if (!res) {
      window.alert("Request Error");
    } else {
      window.alert("Lecturer Edited");
      data["id"] = data["_id"];
      delete data["_id"];
      delete data["__v"];
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const handleCreateStudents = async (student, fingerprint) => {
  const {
    firstname,
    middlename,
    lastname,
    reg_number,
    department,
    faculty,
    gender,
    level,
    image,
  } = student;

  try {
    const res = await fetch("https://fingerprintattendanceserver.herokuapp.com/api/students", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname,
        middlename,
        lastname,
        reg_number,
        department,
        faculty,
        gender,
        level,
        image,
        fingerprint
      }),
    });
    const data = await res.json();

    if (res.status === 400 || !res) {
      window.alert("Request Error!");
    } else if (res.status === 401) {
      window.alert(data);
    } else {
      window.alert("Student Created");
    }
  } catch (error) {
    console.log(error);
  }
};

export const handleCreateCourse = async (course) => {
  const { course_code, course_title, num_students_offering, course_lecturers } =
    course;

  try {
    const res = await fetch("https://fingerprintattendanceserver.herokuapp.com/api/courses", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        course_code,
        course_title,
        num_students_offering,
        course_lecturers
      }),
    });

    const data = await res.json();

    if (res.status === 400 || !res) {
      window.alert("Request Error!");
    } else if (res.status === 401) {
      window.alert(data);
    } else {
      window.alert("Course Created ");
    }
  } catch (error) {
    console.log(error);
  }
};

export const submittAttendance = async (attendanceDetails, id) => {
  try {
    const res = await fetch(`https://fingerprintattendanceserver.herokuapp.com/api/attendance/${id}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(attendanceDetails),
    });

    const data = await res.json();
    
    if (res.status === 400 || !res) {
      window.alert("Request Error!");
      return false;
    } else if (res.status === 403) {
      window.alert(data);
    } else {
      window.alert("Attendance Recorded");
      return true;
    }
  } catch (error) {
    console.log(error);
  }
};
