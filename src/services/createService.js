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
    const res = await fetch("http://localhost:3001/api/users", {
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
        image,
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
    currentPassword,
    newPassword,
    confirmPassword,
    image,
  } = user;


  console.log("user", user)

  try {
    let res = await fetch(`http://localhost:3001/api/users/${user.id}`, {
      method: "PUT",
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
        currentPassword,
        newPassword,
        confirmPassword,
        image,
      }),
    });
    if (res.status === 400) {
      res = await res.json();
      console.log("handleEditLecturer", res)
      window.alert(res);
    } else if (!res) {
      window.alert("Request Error");
    } else {
      window.alert("Lecturer Edited");
    }
  } catch (error) {
    console.log(error);
  }
};

export const handleCreateStudents = async (student) => {
  const {
    firstname,
    middlename,
    lastname,
    reg_number,
    department,
    faculty,
    gender,
    level,
  } = student;

  try {
    const res = await fetch("http://localhost:3001/api/students", {
      method: "POST",
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
      }),
    });
    if (res.status === 400 || !res) {
      window.alert("Request Error!");
    } else {
      window.alert("Student Created Created");
    }
  } catch (error) {
    console.log(error);
  }
};

export const handleCreateCourse = async (course) => {
  const { course_code, course_title, num_students_offering, course_lecturers } =
    course;

  console.log("num_students_offering", num_students_offering);

  try {
    const res = await fetch("http://localhost:3001/api/courses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        course_code,
        course_title,
        num_students_offering,
        course_lecturers,
      }),
    });
    if (res.status === 400 || !res) {
      window.alert("Request Error!");
    } else {
      window.alert("Course Created ");
    }
  } catch (error) {
    console.log(error);
  }
};
