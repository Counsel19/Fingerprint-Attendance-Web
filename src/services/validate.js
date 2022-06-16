import { getAllCourses } from "./getService";
import { compare } from "./scannerServices";

export const validateCourse = async (courseCode) => {
  const courseDoc = await getAllCourses();

  let validList = courseDoc.map((course) => {
    if (course.course_code === courseCode) {
      return false;
    } else {
      return true;
    }
  });

  if (validList.includes(false)) {
    return false;
  } else {
    return true;
  }
};

export async function validateCourses(courses, id) {
  let result;

  try {
    const courseDoc = await getAllCourses(id);

    let recursiveFunction = function (arr, x, start, end) {
      if (start > end) return false;

      if (arr[end].course_code === x) return true;
      else return recursiveFunction(arr, x, start, end - 1);
    };

    result = courses.map((course) => {
      return recursiveFunction(courseDoc, course, 0, courseDoc.length - 1);
    });
   
    if (result.includes(false) || result.length === 0) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.log(error);
  }
}

export const validateStudent = async (fingerprint, currentTemplate) => {
  try {
    let s1, s2;
    s1 = await compare(
      process.env.REACT_APP_SCANNER_API_KEY,
      fingerprint[0],
      currentTemplate
    );
    if (s1 < 60) {
      s2 = await compare(
        process.env.REACT_APP_SCANNER_API_KEY,
        fingerprint[1],
        currentTemplate
      );
    }

    if (s1 > s2) {
      return s1;
    } else {
      return s2;
    }
  } catch (error) {
    console.log(error);
  }
};
