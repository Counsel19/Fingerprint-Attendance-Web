import { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { courseInputs, studentInputs, userInputs, editUserInputs, passwordInputs } from "./admin/formSource";
import { AdminHome, Edit, List, New, Single, ChangePassword } from "./admin/pages";
import { IsUserRedirect, ProtectedRoute } from "./helpers/routes";
import {
  Home,
  SignIn,
  Dashboard,
  Profile,
  TakeAttendanceForm,
  ReportForm,
  SingleCourseList,
  StudentStats,
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
                  <IsUserRedirect user={currentUser} loggedInPath="/dashboard">
                    <SignIn />
                  </IsUserRedirect>
                }
              />
              <Route
                path="signin-admin"
                element={
                  <IsUserRedirect user={adminUser} loggedInPath="/admin">
                    <SignInAsAdmin />
                  </IsUserRedirect>
                }
              />
              <Route
                path="signin"
                element={
                  <IsUserRedirect user={currentUser} loggedInPath="/dashboard">
                    <SignIn />
                  </IsUserRedirect>
                }
              />
              <Route
                path="dashboard"
                element={
                  <ProtectedRoute user={currentUser} authPath="/signin">
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="profile"
                element={
                  <ProtectedRoute user={currentUser} authPath="/signin">
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="profile/edit"
                element={
                  <ProtectedRoute user={currentUser} authPath="/signin">
                   <Edit inputs={editUserInputs} title="Edit Lecturer" />
                  </ProtectedRoute>
                }
              />
              <Route
                path="take-attendance-form"
                element={
                  <ProtectedRoute user={currentUser} authPath="/signin">
                    <TakeAttendanceForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="student-stats"
                element={
                  <ProtectedRoute user={currentUser} authPath="/signin">
                    <StudentStats />
                  </ProtectedRoute>
                }
              />
              <Route
                path="report-form"
                element={
                  <ProtectedRoute user={currentUser} authPath="/signin">
                    <ReportForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="report/:course"
                element={
                  <ProtectedRoute user={currentUser} authPath="/signin">
                    <SingleCourseList attendance={true} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="report/:course/:id"
                element={
                  <ProtectedRoute user={currentUser} authPath="/signin">
                    <SingleCourseList attendanceData={true} />
                  </ProtectedRoute>
                }
              />
            </Route>

            <Route path="/admin">
              <Route
                index
                element={
                  <ProtectedRoute user={adminUser} authPath="/signin-admin">
                    <AdminHome />
                  </ProtectedRoute>
                }
              />

              <Route path="users">
                <Route
                  index
                  element={
                    <ProtectedRoute user={adminUser} authPath="/signin-admin">
                      <List user={true} />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path=":userId"
                  element={
                    <ProtectedRoute user={adminUser} authPath="/signin-admin">
                      <Single />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="new"
                  element={
                    <ProtectedRoute user={adminUser} authPath="/signin-admin">
                      <New inputs={userInputs} title="Add New Lecturer" />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="edit/:id"
                  element={
                    <ProtectedRoute user={adminUser} authPath="/signin-admin">
                      <Edit inputs={editUserInputs} title="Edit Lecturer" />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="edit/:id/change-password"
                  element={
                    <ProtectedRoute user={adminUser} authPath="/signin-admin">
                      <ChangePassword inputs={passwordInputs} title="Edit Lecturer" />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="new"
                  element={
                    <ProtectedRoute user={adminUser} authPath="/signin-admin">
                      <New inputs={userInputs} title="Add New Lecturer" />
                    </ProtectedRoute>
                  }
                />
              </Route>

              <Route path="students">
                <Route
                  index
                  element={
                    <ProtectedRoute user={adminUser} authPath="/signin-admin">
                      <List student={true} />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="new"
                  element={
                    <ProtectedRoute user={adminUser} authPath="/signin-admin">
                      <New inputs={studentInputs} title="Add New Student" />
                    </ProtectedRoute>
                  }
                />
              </Route>
              <Route path="attendance">
                <Route
                  index
                  element={
                    <ProtectedRoute user={adminUser} authPath="/signin-admin">
                      <List attendance={true} />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path=":id"
                  element={
                    <ProtectedRoute user={adminUser} authPath="/signin-admin">
                      <List student={true} attendanceData={true} />
                    </ProtectedRoute>
                  }
                />
              </Route>
              <Route path="courses">
                <Route
                  index
                  element={
                    <ProtectedRoute user={adminUser} authPath="/signin-admin">
                      <List newCourse={true} />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="new"
                  element={
                    <ProtectedRoute user={adminUser} authPath="/signin-admin">
                      <New
                        newCourse={true}
                        inputs={courseInputs}
                        title="Add New Course"
                      />
                    </ProtectedRoute>
                  }
                />
              </Route>
            </Route>
          </Routes>
        </Router>
      )}
    </div>
  );
}

export default App;
