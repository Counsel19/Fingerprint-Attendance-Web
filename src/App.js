import { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  courseInputs,
  studentInputs,
  userInputs,
  editUserInputs,
  passwordInputs,
} from "./admin/formSource";
import {
  AdminHome,
  Edit,
  List,
  New,
  Single,
  ChangePassword,
} from "./admin/pages";
import {
  IsUserRedirectUser,
  IsUserRedirectAdmin,
  ProtectedRouteUser,
  ProtectedRouteAdmin,
} from "./helpers/routes";
import {
  Home,
  SignIn,
  Dashboard,
  Profile,
  TakeAttendanceForm,
  ReportForm,
  SingleCourseList,
  StudentStats,
  UserEdit,
  UserChangePassword,
  PageNotFound,
} from "./pages";
import { DataContext } from "./context/dataContext";
import SignInAsAdmin from "./pages/signInAsAdmin/SignInAsAdmin";
import UseAuth from "./hooks/use-auth-listener";
import { SlidingPebbles } from "react-spinner-animated";
import "react-spinner-animated/dist/index.css";

function App() {
  UseAuth();
  const { currentUser, adminUser } = useContext(DataContext);

  return (
    <div className="App">
      {currentUser?.length === 0 && adminUser?.length === 0 ? (
        <SlidingPebbles
          text={"Loading..."}
          bgColor={"#fff"}
          center={true}
          width={"150px"}
          height={"150px"}
        />
      ) : (
        <Router>
          <Routes>
            <Route path="/">
              <Route index element={<Home />} />
              <Route
                path="signin"
                element={
                  <IsUserRedirectUser loggedInPath="/dashboard">
                    <SignIn />
                  </IsUserRedirectUser>
                }
              />
              <Route
                path="signin-admin"
                element={
                  <IsUserRedirectAdmin loggedInPath="/admin">
                    <SignInAsAdmin />
                  </IsUserRedirectAdmin>
                }
              />

              <Route
                path="dashboard"
                element={
                  <ProtectedRouteUser authPath="/signin">
                    <Dashboard />
                  </ProtectedRouteUser>
                }
              />
              <Route
                path="profile"
                element={
                  <ProtectedRouteUser authPath="/signin">
                    <Profile />
                  </ProtectedRouteUser>
                }
              />
              <Route
                path="profile/edit"
                element={
                  <ProtectedRouteUser authPath="/signin">
                    <UserEdit inputs={editUserInputs} title="Edit Profile" />
                  </ProtectedRouteUser>
                }
              />
              <Route
                path="profile/edit/change-password"
                element={
                  <ProtectedRouteUser authPath="/signin">
                    <UserChangePassword inputs={passwordInputs} />
                  </ProtectedRouteUser>
                }
              />

              <Route
                path="take-attendance"
                element={
                  <ProtectedRouteUser authPath="/signin">
                    <TakeAttendanceForm />
                  </ProtectedRouteUser>
                }
              />

              <Route
                path="student-stats"
                element={
                  <ProtectedRouteUser authPath="/signin">
                    <StudentStats />
                  </ProtectedRouteUser>
                }
              />
              <Route
                path="report-form"
                element={
                  <ProtectedRouteUser authPath="/signin">
                    <ReportForm />
                  </ProtectedRouteUser>
                }
              />
              <Route
                path="report/:course"
                element={
                  <ProtectedRouteUser authPath="/signin">
                    <SingleCourseList attendance={true} />
                  </ProtectedRouteUser>
                }
              />
              <Route
                path="report/:course/:id"
                element={
                  <ProtectedRouteUser authPath="/signin">
                    <SingleCourseList attendanceData={true} />
                  </ProtectedRouteUser>
                }
              />
            </Route>

            <Route path="/admin">
              <Route
                index
                element={
                  <ProtectedRouteAdmin authPath="/signin-admin">
                    <AdminHome />
                  </ProtectedRouteAdmin>
                }
              />

              <Route path="users">
                <Route
                  index
                  element={
                    <ProtectedRouteAdmin authPath="/signin-admin">
                      <List user={true} />
                    </ProtectedRouteAdmin>
                  }
                />
                <Route
                  path=":userId"
                  element={
                    <ProtectedRouteAdmin authPath="/signin-admin">
                      <Single />
                    </ProtectedRouteAdmin>
                  }
                />
                <Route
                  path="new"
                  element={
                    <ProtectedRouteAdmin authPath="/signin-admin">
                      <New inputs={userInputs} title="Add New Lecturer" />
                    </ProtectedRouteAdmin>
                  }
                />
                <Route
                  path="edit/:id"
                  element={
                    <ProtectedRouteAdmin authPath="/signin-admin">
                      <Edit inputs={editUserInputs} title="Edit Lecturer" />
                    </ProtectedRouteAdmin>
                  }
                />
                <Route
                  path="edit/:id/change-password"
                  element={
                    <ProtectedRouteAdmin authPath="/signin-admin">
                      <ChangePassword inputs={passwordInputs} />
                    </ProtectedRouteAdmin>
                  }
                />
                <Route
                  path="new"
                  element={
                    <ProtectedRouteAdmin authPath="/signin-admin">
                      <New inputs={userInputs} title="Add New Lecturer" />
                    </ProtectedRouteAdmin>
                  }
                />
              </Route>

              <Route path="students">
                <Route
                  index
                  element={
                    <ProtectedRouteAdmin authPath="/signin-admin">
                      <List student={true} />
                    </ProtectedRouteAdmin>
                  }
                />
                <Route
                  path="new"
                  element={
                    <ProtectedRouteAdmin authPath="/signin-admin">
                      <New inputs={studentInputs} title="Add New Student" />
                    </ProtectedRouteAdmin>
                  }
                />
              </Route>
              <Route path="attendance">
                <Route
                  index
                  element={
                    <ProtectedRouteAdmin authPath="/signin-admin">
                      <List attendance={true} />
                    </ProtectedRouteAdmin>
                  }
                />
                <Route
                  path=":id"
                  element={
                    <ProtectedRouteAdmin authPath="/signin-admin">
                      <List attendanceData={true} />
                    </ProtectedRouteAdmin>
                  }
                />
              </Route>
              <Route path="courses">
                <Route
                  index
                  element={
                    <ProtectedRouteAdmin authPath="/signin-admin">
                      <List newCourse={true} />
                    </ProtectedRouteAdmin>
                  }
                />
                <Route
                  path="new"
                  element={
                    <ProtectedRouteAdmin authPath="/signin-admin">
                      <New
                        newCourse={true}
                        inputs={courseInputs}
                        title="Add New Course"
                      />
                    </ProtectedRouteAdmin>
                  }
                />
              </Route>
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
      )}
    </div>
  );
}

export default App;
