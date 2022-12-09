import { useContext, useEffect } from "react";
import { createContext, useState } from "react";
import axios from "axios";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const accessToken = localStorage.getItem("auth_token");
    if (accessToken) {
      try {
        axios.get(`/api/getUser`).then((res) => {
          if (res.data.status === 200) {
            setIsAuthenticated(true);
            setUser(res.data.user[0]);
          }
        });
      } catch (error) {
        console.log("authenticated failed", error);
        localStorage.removeItem("auth_token");
      }
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        isAuthenticated,
        cartCount,
        setCartCount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
