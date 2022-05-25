import { useContext, useEffect } from "react";
import { DataContext } from "../context/dataContext";

const UseAuth = () => {
  const { setCurrentUser, setAdminUser } = useContext(DataContext);


  useEffect(() => {
    const getAuth = async () => {
      const res = await fetch("http://localhost:3001/auth/request-login", {
        credentials: "include",
      });
      console.log("res.status", res.status)
      if (res.status === 401) {
       setAdminUser(null);
       setCurrentUser(null);
      } else {
        const user = await res.json();
        user["id"] = user["_id"];
        delete user["_id"];
        if (user.isAdmin) {
          setAdminUser(user);
        } else {
          setCurrentUser(user);
        }
      }
    };

    getAuth();
  }, [setAdminUser, setCurrentUser]);

};

export default UseAuth;
