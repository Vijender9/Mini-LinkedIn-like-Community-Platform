import { createContext, useContext, useEffect, useState } from "react";
import API from "../api/axios.js"; // your axios instance

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // initially null
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      console.log("token test in authContext",token)
      if (token) {
        try {
          const res = await API.get("/user/getMe", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log("res after getMe",res);
          setUser(res.data.data); // set the safeUser
        } catch (err) {
          console.log("Auto-login failed", err);
          localStorage.removeItem("token");
          setUser(null);
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
