import React, { useState } from "react";
import { useMemo } from "react";
import { createContext } from "react";

export const UserContext = createContext(null);

const UserContextInfo = ({ children }) => {
  const [login, setLogin] = useState("");
  console.log('userLogin', login);

  const userInfo = useMemo(() => {
    return {
      login,
      setLogin,
    };
  }, [login]);
  
  return (
    <UserContext.Provider value={userInfo}>{children}</UserContext.Provider>
  );
};

export default UserContextInfo;
