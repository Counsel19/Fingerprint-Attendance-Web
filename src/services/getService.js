import {
  getPreviousMonth,
  getPreviousWeek,
  getCurrentWeek,
} from "./computeDate";
import { formatDistance } from "date-fns";

export const getStudents = async (id) => {
  try {
    const data = await fetch(`https://fingerprintattendanceserver.herokuapp.com/api/students/${id}`, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (data.ok) {
      const res = await data.json();

      const studentList = res.map((item) => {
        item["id"] = item["_id"];
        delete item["_id"];
        delete item["__v"];
        return item;
      });

      return studentList;
    } else {
      console.log("Request Error");
    }
  } catch (error) {
    console.log(error);
  }
};

export const getUsers = async () => {
  try {
    const data = await fetch("https://fingerprintattendanceserver.herokuapp.com/api/users", {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (data.ok) {
      const res = await data.json();

      const userList = res?.map((item) => {
        item["id"] = item["_id"];
        delete item["_id"];
        delete item["__v"];
        return item;
      });

      return userList;
    } else {
      console.log("Request Error");
    }
  } catch (error) {
    console.log(error);
  }
};

export const getSingleUser = async (id) => {
  try {
    const data = await fetch(`https://fingerprintattendanceserver.herokuapp.com/api/users/${id}`, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (data.ok) {
      const res = await data.json();

      res["id"] = res["_id"];
      delete res["_id"];
      delete res["__v"];
      return res;
    } else {
      console.log("Request Error");
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAttendance = async () => {
  try {
    const data = await fetch(`https://fingerprintattendanceserver.herokuapp.com/api/attendance`, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (data.ok) {
      const res = await data.json();

      const attendanceList = res?.map((item) => {
        item["id"] = item["_id"];
        delete item["_id"];
        return item;
      });

      return attendanceList;
    } else {
      console.log("Request Error");
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAttendanceDetails = async (id, allAttendance) => {
  const attendanceData = await getAttendance();

  const yesterday = new Date(new Date().getTime() - 12 * 60 * 60 * 1000);

  if (!allAttendance) {
    const attendanceDoc = await Promise.all(
      attendanceData
        .filter((data) => data.date > Date.parse(yesterday))
        .map(async (data) => {
          const percentage = await getCourseAttendancePercentage(
            {
              studentList: data.students_present,
              courseCode: data.course,
            },
            id
          );

          const lecturer = await getUserFistnameLastname(id, data.user_docId);

          return {
            ...data,
            date: formatDistance(Number(data.date), Date.now(), {
              addSuffix: true,
            }),
            percentage: Math.floor(percentage),
            ...lecturer,
          };
        })
    );
    attendanceDoc.sort((b, a) => a.date - b.date);
    return attendanceDoc;
  } else {
    let attendanceDoc = await Promise.all(
      attendanceData.map(async (data) => {
        const percentage = await getCourseAttendancePercentage(
          {
            studentList: data.students_present,
            courseCode: data.course,
          },
          id
        );

        const lecturer = await getUserFistnameLastname(id, data.user_docId);
        let dateTime = new Date(data.date);
        return {
          ...data,
          date: dateTime.toLocaleString(),
          percentage: Math.floor(percentage),
          ...lecturer,
        };
      })
    );

    attendanceDoc.sort((b, a) => a.date - b.date);
    return attendanceDoc;
  }
};

export const getUserFistnameLastname = async (id, docId) => {
  try {
    const data = await fetch(
      `https://fingerprintattendanceserver.herokuapp.com/api/users/user/${id}/${docId}`,
      {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (data.ok) {
      const res = await data.json();

      res["id"] = res["_id"];
      delete res["_id"];
      delete res["__v"];

      return {
        firstname: res.firstname,
        lastname: res.lastname,
      };
    } else {
      console.log("Request Error");
    }
  } catch (error) {
    console.log(error);
  }
};

export const getSingleAttendance = async (attendanceDocId, userId) => {
  try {
    const data = await fetch(
      `https://fingerprintattendanceserver.herokuapp.com/api/attendance/${userId}?attendanceId=${attendanceDocId}`,
      {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (data.ok) {
      const res = await data.json();

      res["id"] = res["_id"];
      delete res["_id"];
      delete res["__v"];
      return res;
    } else {
      console.log("Request Error");
    }
  } catch (error) {
    console.log(error);
  }
};

export const getSingleStudent = async (userId, studentId) => {
  try {
    const data = await fetch(
      `https://fingerprintattendanceserver.herokuapp.com/api/students/${userId}?studentId=${studentId}`,
      {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (data.ok) {
      const res = await data.json();

      res["id"] = res["_id"];
      delete res["_id"];
      delete res["__v"];

      return res;
    } else {
      console.log("Request Error");
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAttendanceAfter = async (date) => {
  try {
    const data = await fetch(
      `https://fingerprintattendanceserver.herokuapp.com/api/attendance/after/${Date.parse(date)}`,
      {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (data.ok) {
      let res = await data.json();

      res = res?.map((item) => {
        item["id"] = item["_id"];
        delete item["_id"];
        delete item["__v"];
        return item;
      });
      return res;
    } else {
      console.log("Request Error");
    }
  } catch (error) {}
};

export const getAttendanceForDuration = async (date_after, date_before) => {
  try {
    const data = await fetch(
      `https://fingerprintattendanceserver.herokuapp.com/api/attendance/after/${Date.parse(
        date_after
      )}/before/${Date.parse(date_before)}`,
      {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    let res = await data.json();

    if (data.ok) {
      res = res?.map((item) => {
        item["id"] = item["_id"];
        delete item["_id"];
        delete item["__v"];
        return item;
      });
      return !res ? [] : res;
    } else {
      console.log("Request Error");
    }
  } catch (error) {}
};

export const getSingleAttendanceForDuration = async (
  user_docId,
  date_after,
  date_before
) => {
  try {
    const data = await fetch(
      `https://fingerprintattendanceserver.herokuapp.com/api/attendance/user/${user_docId}/after/${Date.parse(
        date_after
      )}/before/${Date.parse(date_before)}`,
      {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (data.ok) {
      let res = await data.json();

      res = res?.map((item) => {
        item["id"] = item["_id"];
        delete item["_id"];
        delete item["__v"];
        return item;
      });
      return !res ? [] : res;
    } else {
      console.log("Request Error");
    }
  } catch (error) {}
};

export const getAttendanceSummary = async () => {
  const now = new Date();
  const yesterday = new Date(now.getTime() - 12 * 60 * 60 * 1000);
  const recentRes = await getAttendanceAfter(yesterday);

  const currentMonthRes = await getAttendanceForDuration(
    new Date(now.getFullYear(), now.getMonth(), 1),
    now
  );

  const lastMonth = getPreviousMonth(1);
  const oneMonthRes = await getAttendanceForDuration(
    lastMonth.firstDayMonth,
    lastMonth.lastDayMonth
  );

  const lastTwoMonth = getPreviousMonth(2);
  const twoMonthRes = await getAttendanceForDuration(
    lastTwoMonth.firstDayMonth,
    lastTwoMonth.lastDayMonth
  );

  const lastThreeMonth = getPreviousMonth(3);
  const threeMonthRes = await getAttendanceForDuration(
    lastThreeMonth.firstDayMonth,
    lastThreeMonth.lastDayMonth
  );
  const lastFourMonth = getPreviousMonth(4);
  const fourMonthRes = await getAttendanceForDuration(
    lastFourMonth.firstDayMonth,
    lastFourMonth.lastDayMonth
  );
  const lastFiveMonth = getPreviousMonth(5);
  const fiveMonthRes = await getAttendanceForDuration(
    lastFiveMonth.firstDayMonth,
    lastFiveMonth.lastDayMonth
  );

  const lastWeek = getPreviousWeek();
  const lastWeekRes = await getAttendanceForDuration(
    lastWeek.firstDayLastWeek,
    lastWeek.lastDayLastWeek
  );

  const currentWeek = getCurrentWeek();
  const currentWeekRes = await getAttendanceForDuration(
    currentWeek.firstDayCurentWeek,
    currentWeek.currentDay
  );

  return {
    recentRes,
    currentMonthRes,
    oneMonthRes: {
      data: oneMonthRes,
      number: lastMonth.monthNum,
    },
    twoMonthRes: {
      data: twoMonthRes,
      number: lastTwoMonth.monthNum,
    },
    threeMonthRes: {
      data: threeMonthRes,
      number: lastThreeMonth.monthNum,
    },
    fourMonthRes: {
      data: fourMonthRes,
      number: lastFourMonth.monthNum,
    },
    fiveMonthRes: {
      data: fiveMonthRes,
      number: lastFiveMonth.monthNum,
    },
    lastWeekRes,
    currentWeekRes,
  };
};

export const getSingleAttendanceSummary = async (singleUserId) => {
  const now = new Date();

  const currentMonthRes = await getSingleAttendanceForDuration(
    singleUserId,
    new Date(now.getFullYear(), now.getMonth(), 1),
    now
  );

  const lastMonth = getPreviousMonth(1);
  const oneMonthRes = await getSingleAttendanceForDuration(
    singleUserId,
    lastMonth.firstDayMonth,
    lastMonth.lastDayMonth
  );

  const lastTwoMonth = getPreviousMonth(2);
  const twoMonthRes = await getSingleAttendanceForDuration(
    singleUserId,
    lastTwoMonth.firstDayMonth,
    lastTwoMonth.lastDayMonth
  );

  const lastThreeMonth = getPreviousMonth(3);
  const threeMonthRes = await getSingleAttendanceForDuration(
    singleUserId,
    lastThreeMonth.firstDayMonth,
    lastThreeMonth.lastDayMonth
  );
  const lastFourMonth = getPreviousMonth(4);
  const fourMonthRes = await getSingleAttendanceForDuration(
    singleUserId,
    lastFourMonth.firstDayMonth,
    lastFourMonth.lastDayMonth
  );
  const lastFiveMonth = getPreviousMonth(5);
  const fiveMonthRes = await getSingleAttendanceForDuration(
    singleUserId,
    lastFiveMonth.firstDayMonth,
    lastFiveMonth.lastDayMonth
  );

  return {
    currentMonthRes,
    oneMonthRes: {
      data: oneMonthRes,
      number: lastMonth.monthNum,
    },
    twoMonthRes: {
      data: twoMonthRes,
      number: lastTwoMonth.monthNum,
    },
    threeMonthRes: {
      data: threeMonthRes,
      number: lastThreeMonth.monthNum,
    },
    fourMonthRes: {
      data: fourMonthRes,
      number: lastFourMonth.monthNum,
    },
    fiveMonthRes: {
      data: fiveMonthRes,
      number: lastFiveMonth.monthNum,
    },
  };
};

export const getAllCourses = async (id) => {
  try {
    const data = await fetch(`https://fingerprintattendanceserver.herokuapp.com/api/courses/user/${id}`, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await data.json();

    if (data.ok) {

      const courseList = res?.map((item) => {
        item["id"] = item["_id"];
        delete item["_id"];
        delete item["__v"];
        return item;
      });
      
      return courseList;
    } else {
      alert("Request Error")
    }
  } catch (error) {
    console.log(error);
  }
};

export const getSingleCourse = async (course_code, id) => {
  try {
    const data = await fetch(
      `https://fingerprintattendanceserver.herokuapp.com/api/courses/${course_code}/user/${id}`,
      {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const res = await data.json();
    if (data.ok) {

      res["id"] = res["_id"];
      delete res["_id"];
      delete res["__v"];
      return res;
    } else {
      console.log("Request Error");
    }
  } catch (error) {
    console.log(error);
  }
};

export const getTodayAttendancePercentage = async (id) => {
  const { recentRes } = await getAttendanceSummary();

  if (recentRes.length !== 0) {
    let totalStudentPresent = 0;
    let totalNumOffering = 0;

    await Promise.all(
      recentRes.map(async (data) => {
        const courseDataTodayAttendance = await getSingleCourse(
          data.course,
          id
        );

        totalStudentPresent =
          totalStudentPresent + data.students_present.length;
        totalNumOffering =
          totalNumOffering + courseDataTodayAttendance.num_students_offering;
      })
    );

    const percentage = Math.floor(
      (totalStudentPresent / totalNumOffering) * 100
    );

    return percentage;
  } else {
    return 0;
  }
};

export const getCourseAttendancePercentage = async (courseData, id) => {
  try {
    const courseDataAttendance = await getSingleCourse(
      courseData.courseCode,
      id
    );
    const percentage =
      (courseData.studentList.length /
        courseDataAttendance.num_students_offering) *
      100;

    return !percentage ? 0 : percentage;
  } catch (error) {
    console.log(error);
  }
};

export const getLecturerSubmittedAttendance = async (
  user_docId,
  lecturerChart
) => {
  try {
   
    const data = await fetch(
      `https://fingerprintattendanceserver.herokuapp.com/api/attendance/user/${user_docId}`,
      {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (data.ok) {
      let res = await data.json();

      res = res.map((item) => {
        item["id"] = item["_id"];
        delete item["_id"];
        delete item["__v"];
        if (!lecturerChart) {
          let dateTime = new Date(item.date);
          item.date = dateTime.toLocaleString();
        }

        return item;
      });

      return res;
    } else {
      console.log("Request Error");
    }
  } catch (error) {
    console.log(error);
  }
};

export const getLecturerAttendanceForCourse = async (user_docId, course) => {
  try {
    const data = await fetch(
      `https://fingerprintattendanceserver.herokuapp.com/api/attendance/user/${user_docId}/course/${course}`,
      {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (data.ok) {
      let res = await data.json();

      res = res.map((data) => {
        data["id"] = data["_id"];
        delete data["_id"];
        delete data["__v"];
        return data;
      });

      return res;
    } else {
      console.log("Request Error");
    }
  } catch (error) {
    console.log(error);
  }
};

export const getLectureDetails = async (currentUser, semester, session) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
    "Submitted",
  ];

  const weekNames = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat", "No"];

  const submittedAttendance = await getLecturerSubmittedAttendance(
    currentUser.id,
    true
  );

  if (submittedAttendance) {
    const data = Array.prototype.concat(
      ...currentUser.courses.map((item1) => {
        let count = 0,
          total = 0;
        let result = [];
        let seenCourse = "";
        let date = "Attendance",
          day = 7,
          month = 12;
        let chartData = [];

        if (submittedAttendance.length === 0) {
          result.push({
            course: item1,
            num_of_lectures: count,
            chartData: [
              {
                name: `${weekNames[day]} ${date}${date} ${monthNames[month]}`,
                Total: total,
              },
            ],
          });

          return result;
        } else {
          for (let i = 0; i <= submittedAttendance.length - 1; i++) {
            if (submittedAttendance[i].course === item1) {
              count = count + 1;

              seenCourse = submittedAttendance[i].course;

              date = new Date(submittedAttendance[i].date).getDate();
              day = new Date(submittedAttendance[i].date).getDay();
              month = new Date(submittedAttendance[i].date).getMonth();
              total = submittedAttendance[i].students_present.length;

              chartData.push({
                name: `${weekNames[day]}, ${monthNames[month]} ${date}`,
                Total: total,
              });
            }
            if (i === submittedAttendance.length - 1) {
              if (seenCourse === "") {
                seenCourse = item1;
                chartData.push({
                  name: `${weekNames[day]} ${date}${
                    date === "Attendance" ? "" : "th"
                  } ${monthNames[month]}`,
                  Total: total,
                });
              }

              result.push({
                course: seenCourse,
                num_of_lectures: count,
                chartData: chartData,
              });
            }
          }
        }

        return result.filter((item) => item !== null);
      })
    );

    return data;
  } else {
    return [];
  }
};

export const getStudentFromRegNumber = async (userId, regNumber) => {
  try {
    const res = await fetch(
      `https://fingerprintattendanceserver.herokuapp.com/api/students/${userId}/reg-number/${regNumber}`,
      {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    let data = await res.json();

    if (res.ok && res.status !== 400) {
      data["id"] = data["_id"];
      delete data["_id"];
      delete data["__v"];
      return data;
    } else {
      alert(data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const getStudentCourseAttendance = async (user_docId, course, id) => {
  try {
    const data = await fetch(
      `https://fingerprintattendanceserver.herokuapp.com/api/attendance/user/${user_docId}/course/${course}/student/${id}`,
      {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (data.ok) {
      let res = await data.json();

      res = res.map((item) => {
        item["id"] = item["_id"];
        delete item["_id"];
        delete item["__v"];
        return item;
      });
      return res;
    } else {
      console.log("Request Error");
    }
  } catch (error) {
    console.log(error);
  }
};

export const getLectureAttendanceSummary = async (attendanceData, id) => {
  let attendanceDoc = [];
  if (attendanceData) {
    attendanceDoc = await Promise.all(
      attendanceData?.map(async (data) => {
        const percentage = await getCourseAttendancePercentage(
          {
            studentList: data.students_present,
            courseCode: data.course,
          },
          id
        );

        let dateTime = new Date(data.date);

        const singleCourseData = await getSingleCourse(data.course, id);
        let numAbsent =
          singleCourseData.num_students_offering - data.students_present.length;

        return {
          ...data,
          date: dateTime.toLocaleString(),
          percentage: Math.floor(percentage),
          numAbsent,
        };
      })
    );
  }
  return attendanceDoc;
};
