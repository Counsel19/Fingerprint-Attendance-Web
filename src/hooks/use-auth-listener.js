import { useContext, useEffect, useState } from "react";
import { DataContext } from "../context/dataContext";

const UseAuth = () => {
  const { setCurrentUser, setAdminUser } = useContext(DataContext);
  const [user, setUser] = useState([]);

  useEffect(() => {
    const getAuth = async () => {
      const res = await fetch("http://localhost:3001/auth/request-login", {
        credentials: "include",
      });

      if (res.status === 401) {
        setAdminUser(null);
        setCurrentUser(null);
        setUser(null)
      } else {
        const userData = await res.json();
    
        userData["id"] = userData["_id"];
        delete userData["_id"];
        setUser(userData);

        if (user?.isAdmin) {
          setAdminUser(userData);
          setCurrentUser(userData);
        } else {
          setCurrentUser(userData);
        }
      }
    };

    getAuth();
  }, [setAdminUser, setCurrentUser, setUser, user?.isAdmin]);

  return user;
};

export default UseAuth;
