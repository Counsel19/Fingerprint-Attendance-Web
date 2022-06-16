import { GoReport } from "react-icons/go";
import { MdLaptopWindows, MdAnalytics, MdVerifiedUser } from "react-icons/md";
import { NavBar, Footer } from "../../components";
import "./home.css";

const Home = () => {
  return (
    <div className="home__container">
      <div className="home__wrapper">
        <NavBar dashbord={false} />
        <div className="banner">
          <h1>Fingerprint Biometric Attendance Application</h1>
          <p>
            An attendance management system to foster digitalized, authentic and
            effecient processing and recording of student's attendance to lecturers.
          </p>
        </div>

        <section id="about__app">
          <h2>About Application</h2>

          <article>
            <div className="article-details">
              <div>
                <p>
                  This Biometric attendance Managment systems uses the fingerprints of students
                  to verify students who actually attended lectures. The system
                  scans the fingerprint of the students, coordinates are
                  determined and then the system maps the endpoints and
                  intersections of the fingerprint. These are then referenced
                  against what is in the system from the student.
                </p>

                <p>
                  If a student has not been entered into the system, he or she
                  will not be able to use the biometric attendance system. The
                  administrator is laden with the reponsbility to register
                  students and staffs and also monitor and the track progress.
                </p>
              </div>
              <img
                className="about__img"
                src="/images/authenticN.jpg"
                alt="about the app"
              />
            </div>
          </article>
        </section>

        <section id="solutions_offered">
          <h2>Solutions offered</h2>

          <div className="solution__details">
            <div className="card">
              <GoReport className="card__icon" />
              <h2>Enhanced Reporting</h2>
              <p>
                The application provides charts, tables and other summarized
                data formats to aid reporting to data.
              </p>
            </div>
            <div className="card">
              <MdLaptopWindows className="card__icon" />
              <h2>Digitalized attendance Record System</h2>
              <p>
                The application fosters a degitalized and thus organized and
                efficent way for recording, managing and retrieving student's
                attendance records.
              </p>
            </div>
            <div className="card">
              <MdVerifiedUser className="card__icon" />
              <h2>Security Checks</h2>
              <p>
                Avoids duplicate attendance from a single student and other
                associated indequacies of the traditional system. Therefore
                encouraging regaularity of students.
              </p>
            </div>
            <div className="card">
              <MdAnalytics className="card__icon" />
              <h2>Attendance Analysis</h2>
              <p>
                Mechanism for concised and acurate analysis of student's
                attendance to lectures. It also provides measures to supervise
                lecturers commitment to delivering lectures.
              </p>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default Home;
