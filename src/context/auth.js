import { createContext, useEffect, useState, useContext } from 'react';
import { onAuthStateChanged, sendPasswordResetEmail, } from 'firebase/auth';
import { auth } from '../firebase';
import Loading from '../components/Loading';

export const AuthContext = createContext({
    forgotPassword: () => Promise
})

export const useAuth = () => useContext(AuthContext)


export default function AuthContextProvider  ({ children })  {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            setUser(user);
            setLoading(false);
        });
    }, []);

    if(loading) {
        return <Loading />;
    }

    function forgotPassword(email) {
        return sendPasswordResetEmail(auth, email, {
          url: `http://localhost:3000/login`,
        })
      }

  const value = {
      forgotPassword
  }


    return (
    <AuthContext.Provider value={{ user, value }}>
        { children }
    </AuthContext.Provider>
    )
}

