import { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { NavBar } from "../../components";
import "./signInAsAdmin.css";
import { DataContext } from "../../context/dataContext";

const SignInAsAdmin = () => {
  const { setAdminUser } = useContext(DataContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/admin";

  const [admin, setAdmin] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const noInput = admin.email === "" || admin.password === "";

  const handleInput = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    setAdmin({ ...admin, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const { email, password } = admin;

    try {
      const res = await fetch("https://fingerprintattendanceserver.herokuapp.com/auth/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await res.json();

      if (res.status === 400 || !res) {
        window.alert(data.message);
        setLoading(false);
      } else {
        const admin = data.data._doc;

        admin["id"] = admin["_id"];
        delete admin["_id"];

        if (admin.isAdmin) {
          setAdminUser(admin);

          navigate(from, { replace: true });
        } else {
          window.alert("User Account exist, but not an admin");
          setLoading(false);
          return;
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="signInAsAdmin__container">
      <NavBar />
      <div className="signInAsAdmin__wrapper">
        <div className="signInAsAdmin__info">
          <h1>Welcome Admin</h1>
          <p>Enter your credentials to Log In</p>
        </div>
        <div className="signInAsAdmin__details">
          <h2 className="signInAsAdmin__caption">Log In as Admin</h2>
          <form method="POST" onSubmit={handleSubmit}>
            <label htmlFor="username">Email: </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleInput}
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              onChange={handleInput}
            />

            <input disabled={loading || noInput} type="submit" value="Sign In" />
          </form>

          <p className="signInAsAdmin__text">
            Not an Admin?{" "}
            <Link to="/signin" className="to_signin">
              Log In as a Staff
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInAsAdmin;
