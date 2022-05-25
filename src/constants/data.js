import { subDays, format } from "date-fns";

export const UserData = [
  {
    id: 1,
    date: format(subDays(new Date(), 7), "EEEEEE, do LLL, yyyy"),
    department: "CSC",
    student_present: 50,
    student_absent: 150
},
{
    id: 2,
    date: format(subDays(new Date(), 5), "EEEEEE, do LLL, yyyy"),
    department: "CSC",
    student_present: 100,
    student_absent: 100
},
{
    id: 3,
    date: format(subDays(new Date(), 4), "EEEEEE, do LLL, yyyy"),
    department: "CSC",
    student_present: 120,
    student_absent: 80
},
{
    id: 4,
    date: format(subDays(new Date(), 2), "EEEEEE, do LLL, yyyy"),
    department: "CSC",
    student_present: 90,
    student_absent: 110
},
{
    id: 5,
    date: format(Date.now(), "EEEEEE, do LLL, yyyy"),
    department: "CSC",
    student_present: 130,
    student_absent: 70
},
];

export const courseData = [
  {
    id: 1,
    code: "MTH101",
    course_title: "Elementary Mathematics I",
    num_of_lectures: 5,
  },
  {
    id: 2,
    code: "MTH203",
    course_title: "Elementary Differential Equation I",
    num_of_lectures: 7,
  },
  {
    id: 3,
    code: "MTH303",
    course_title: "Partial Differential Eqaution",
    num_of_lectures: 3,
  },
];


export const attendanceData = [
    {
        course: "MTH101",
        date: Date.now(),
        session: "2020/2021",
        semester: "Rain Semester",
        attendance: [
            {
                id: "1",
                name: "Fred Tom",
                reg_number: "20171067567",
                department: "Mathematics",

            },
            {
                id: "2",
                name: "Fred Tom",
                reg_number: "20171067567",
                department: "Mathematics",

            },
            {
                id: "3",
                name: "Fred Tom",
                reg_number: "20171067567",
                department: "Mathematics",

            },
            {
                id: "4",
                name: "Fred Tom",
                reg_number: "20171067567",
                department: "Mathematics",

            },
            {
                id: "5",
                name: "Fred Tom",
                reg_number: "20171067567",
                department: "Mathematics",

            },
            {
                id: "6",
                name: "Fred Tom",
                reg_number: "20171067567",
                department: "Mathematics",

            },
            {
                id: "7",
                name: "Fred Tom",
                reg_number: "20171067567",
                department: "Mathematics",

            },
            {
                id: "8",
                name: "Fred Tom",
                reg_number: "20171067567",
                department: "Mathematics",

            },
            {
                id: "9",
                name: "Fred Tom",
                reg_number: "20171067567",
                department: "Mathematics",

            },
            {
                id: "10",
                name: "Fred Tom",
                reg_number: "20171067567",
                department: "Mathematics",

            },
        ]
    }   
]
