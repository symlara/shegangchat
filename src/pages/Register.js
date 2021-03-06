import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../firebase';
import { setDoc, doc, Timestamp } from 'firebase/firestore';
// import { GoogleButton } from 'react-google-button';


import { useHistory } from 'react-router-dom';

import { useSignInWithGoogle } from "react-firebase-hooks/auth";


const Register = () => {
    // const [signInWithGoogle] = useSignInWithGoogle(auth);

    const [data, setData ] = useState({
        name: '',
        email: '',
        password: '',
        error: null,
        loading: false,
    });

    const history = useHistory();

    const {name, email, password, error, loading} = data;

    const handleChange = (e) => {
        setData({...data, [e.target.name]: e.target.value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setData({ ...data, error: null, loading: true });
        if (!name || !email || !password) {
          setData({ ...data, error: "All fields are required" });
        }
        try {   
            const result = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            await setDoc(doc(db, 'users', result.user.uid), {
                uid: result.user.uid,
                name,
                email,
                createdAt: Timestamp.fromDate(new Date()),
                isOnline: true
            });
            setData({
                name: '', 
                email: '', 
                password: '', 
                error: null, 
                loading: false
            });
            history.replace('/profile');
            alert('Registered successfully!')

        } catch(err) {
            setData({ ...data, error: err.message, loading: false });
        }
    }

  return (
    <section>
        <form className='login-card' onSubmit={handleSubmit}>
        <h3 className='text-white text-center'>Create an Account</h3>
            <div className='input-container'>
                <label htmlFor="name">Name</label>
                <input type="text" name="name" value={name} onChange={handleChange}  />
            </div>

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
                <button
                className="btn text-white" 
                disabled={loading}>{loading ? 'Creating ...' : 'Register'}
                </button>
            </div>
            
            <hr />
            {/* <p className='text-white text-center'>OR</p>
                <GoogleButton 
                    className='google-button'
                    type="light"  
                    onClick={() => signInWithGoogle('').then(() => {
                        history.push('/profile')
                    })}  
                /> */}
        </form>
    </section>
  )
    
}
export default Register;