import { createContext, useContext, useState, useEffect } from "react";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider, 
  signInWithPopup,
  signInWithRedirect,
  sendPasswordResetEmail,
  confirmPasswordReset,
  getAuth,
  getRedirectResult
} from 'firebase/auth';

import { auth } from "../firebase";


const AuthContext = createContext({})


export const useAuth = () => useContext(AuthContext)

// export const useUserContext = () => {
//   return useContext(UserContext);
// };

export default function AuthContextProvider({children}) {


  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
      // runs whenever the component mounts
    const unsubscribe = onAuthStateChanged(auth, user => {
        setCurrentUser(user)
    })
    return () => {
        // runs whenever the component unmounts
      unsubscribe()
    }
  }, [])
  

  function register(email, password) {
    const provider = new GoogleAuthProvider();
      return createUserWithEmailAndPassword(auth, email, password, provider)
  }

  function login(email, password) {
    const provider = new GoogleAuthProvider();
      return signInWithEmailAndPassword(auth, email, password, provider)
  }

  function signInWithGoogle()  {
    const provider = new GoogleAuthProvider()
    return signInWithRedirect(auth, provider)
    
}

  function forgotPassword(email) {
      return sendPasswordResetEmail(auth, email, 
          {
              // this tells firebase where to send the user after they've updated their password
          url: 'http://locahost:3000/login'
      }).then(() => {
        alert('Password reset email sent!')
      })
  }

  // function resetPassword(email) {
  //   return sendPasswordResetEmail(auth, email).then(() => {
  //     alert('Password reset email sent!')
  //   })
  // }

  function resetPassword(oobCode, newPassword) {
      return confirmPasswordReset(auth, oobCode, newPassword)
  }
      
  function logout() {
      return signOut(auth)
  }

  const value = {
      currentUser,
      register,
      login,
      logout,
      signInWithGoogle,
      forgotPassword,
      resetPassword
  }


  return <AuthContext.Provider value={value}>
      {children}
  </AuthContext.Provider>
}