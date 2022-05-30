import { GoReport } from "react-icons/go";
import { MdLaptopWindows, MdPeople, MdAnalytics } from "react-icons/md";
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
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla
            aspernatur officia praesentium non doloribus repudiandae, architecto
            voluptate fugit perferendis repellat.
          </p>
        </div>

        <section id="about__app">
          <h2>About App</h2>

          <article>
            <div className="article-details">
              <img
                className="about__img"
                src="/images/fingerprint.jpg"
                alt="about the app"
              />

              <div>
                <h1>Lorem ipsum dolor sit amet.</h1>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Magni libero expedita in necessitatibus, itaque doloremque
                  dolorem eligendi maxime possimus temporibus iste et pariatur,
                  blanditiis dolor corrupti eveniet vero minus nihil. Lorem
                  ipsum dolor sit amet, consectetur adipisicing elit. Rerum
                  expedita sint amet ducimus! Vero id temporibus mollitia iure
                  quos voluptas!
                </p>
              </div>
            </div>
            <div className="article-details">
              <div>
                <h1>Lorem ipsum dolor sit amet.</h1>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Magni libero expedita in necessitatibus, itaque doloremque
                  dolorem eligendi maxime possimus temporibus iste et pariatur,
                  blanditiis dolor corrupti eveniet vero minus nihil. Lorem
                  ipsum dolor sit amet, consectetur adipisicing elit. Rerum
                  expedita sint amet ducimus! Vero id temporibus mollitia iure
                  quos voluptas!
                </p>
              </div>
              <img
                className="about__img"
                src="/images/authentic.jpg"
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
              <h2>Lorem ipsum dolor sit.</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum
                consequatur rerum laudantium dicta libero incidunt!
              </p>
            </div>
            <div className="card">
              <MdLaptopWindows className="card__icon" />
              <h2>Lorem ipsum dolor sit.</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum
                consequatur rerum laudantium dicta libero incidunt!
              </p>
            </div>
            <div className="card">
              <MdPeople className="card__icon" />
              <h2>Lorem ipsum dolor sit.</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum
                consequatur rerum laudantium dicta libero incidunt!
              </p>
            </div>
            <div className="card">
              <MdAnalytics className="card__icon" />
              <h2>Lorem ipsum dolor sit.</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum
                consequatur rerum laudantium dicta libero incidunt!
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
