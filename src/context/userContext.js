import { createContext, useContext, useState } from "react";
import {
  sendPasswordResetEmail,
} from "firebase/auth";

import { auth } from '../firebase';

export const UserContext = createContext({});

export const useUserContext = () => {
    
    return useContext(UserContext);
  };

  export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);


    const forgotPassword = (email) => {
        return sendPasswordResetEmail(auth, email);
      };

      const contextValue = {
        forgotPassword,
      };
      return (
        <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
      );
  }
