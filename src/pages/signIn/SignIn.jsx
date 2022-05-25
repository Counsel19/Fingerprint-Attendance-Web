import { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { NavBar } from "../../components";
import "./signIn.css";
import { DataContext } from "../../context/dataContext";

const SignIn = () => {
  const { setCurrentUser } = useContext(DataContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const noInput = user.email === "" || user.password === "";

  const handleInput = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    setUser({ ...user, [name]: value });
  };

  const handleSignIn = async (event) => {
    event.preventDefault();
    setLoading(true);

    const { email, password } = user;
    try {
      const res = await fetch("http://localhost:3001/auth/login", {
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

      if (!res) {
        window.alert("Request Error!");
        setLoading(false);
        return;
      } else {
        const data = await res.json();

        if (data.status !== 200) {
          window.alert(data.message);
          setLoading(false);
          return;
        }

        const user = data.data._doc;
    
        user["id"] = user["_id"];
        delete user["_id"];

        setCurrentUser(user);
        setLoading(false);
        navigate(from, { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="signIn__container">
      <NavBar />
      <div className="signIn__wrapper">
        <div className="signIn__details">
          <h2 className="signIn__caption">Log In</h2>
          <form method="POST" onSubmit={handleSignIn}>
            <label htmlFor="email">Email: </label>
            <input
              type="text"
              name="email"
              placeholder="email"
              value={user.email}
              onChange={handleInput}
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={user.password}
              onChange={handleInput}
            />

            <input
              disabled={loading || noInput}
              type="submit"
              value="Sign In"
            />
          </form>

          <Link className="signIn__text" to="/signin-admin">
            Log In as admin
          </Link>
        </div>
        <div className="signIn__info">
          <h1>Welcome Back</h1>
          <p>Enter your credentials to Log In</p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
