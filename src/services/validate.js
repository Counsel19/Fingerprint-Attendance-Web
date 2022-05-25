import { getAllCourses } from "./getService";

export const validateCourse = async (courseCode) => {


    const courseDoc = await getAllCourses();

    let validList = courseDoc.map(course => {
        if(course.course_code === courseCode){
            return false
        }else{
            return true
        }
    })

    if(validList.includes(false)){
        return false;
        
    }else{
        return true;
    }
    
}