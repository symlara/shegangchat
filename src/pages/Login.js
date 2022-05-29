import React, { useState } from 'react'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';
// import { FaGoogle } from 'react-icons/fa';

// import { GoogleButton } from 'react-google-button';


// import { useSignInWithGoogle } from "react-firebase-hooks/auth";

import { useHistory } from 'react-router-dom';


const Login = () => {
    // const [signInWithGoogle] = useSignInWithGoogle(auth);

   
    
    
    const [data, setData ] = useState({
        email: '',
        password: '',
        error: null,
        loading: false,
    });

 


    const history = useHistory();

    const { email, password, error, loading} = data;

    const handleChange = (e) => {
        setData({...data, [e.target.name]: e.target.value });
    };

    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setData({ ...data, error: null, loading: true });
        if ( !email || !password) {
          setData({ ...data, error: "All fields are required" });
        }
        try {   
            const result = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            await updateDoc(doc(db, 'users', result.user.uid), {
                isOnline: true
            });
            setData({
                email: '', 
                password: '', 
                error: null, 
                loading: false
            });
            history.replace('/profile');
        } catch(err) {
            setData({ ...data, error: err.message, loading: false });
        }
    }

  

  return (
    <section>
        <form className='login-card' onSubmit={handleSubmit}>
        <h3 id="login" className='text-white text-center'>Log into your account</h3>

            <div className='input-container'>
                <label htmlFor="email">Email</label>
                <input type="text" name="email" value={email} onChange={handleChange} />
            </div>

            <div className='input-container'>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" value={password} onChange={handleChange} />
            </div>
            {error ? <p className='error'>{error}</p>:null}
            <div className="btn_container">
                <button className="btn text-white" disabled={loading}>{loading ? 'Logging in ...' : 'Login'}</button>
            </div>
          
            <hr/>
            {/* <p className='text-white text-center'>OR</p> */}
           
               
            {/* <div 
            className='btn text-white' 
           ><GoogleButton  
           className="google-button"
           onClick={() => signInWithGoogle("", {prompt: "select_account"}).then(() =>{
            history.push('/profile')})} />
            </div> */}
        </form>
    </section>
  )
    
}
export default Login;