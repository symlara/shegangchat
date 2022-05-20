import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

import { useAuth } from '../context/auth';

const ForgotPasswordPage = () => {
    const history = useHistory()
    const forgotPassword  = useAuth();
    const [email, setEmail] = useState('')
    


    return (
        <div>
            <form className='login-card' onSubmit=
            {async e => {
                e.preventDefault()
                forgotPassword(email)
                .then(response => {console.log(response)})

                try {
                    await forgotPassword(email)
                    prompt(`An email is sent to ${email} for password reset instructions.`)
                    
                    
                } catch(err) {
                    console.log(err.message)
                }
            }}>
                <div className='input-container'>
                <h3 className='text-white text-center'>Forgot Password</h3>
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" value={email} onChange={e => setEmail(e.target.value)} 
                    />
                </div>
                <div className="btn_container">
                    <button className="btn text-white" type="submit">Submit</button>
                </div>
                

            </form>

        </div>
    )
}

export default ForgotPasswordPage