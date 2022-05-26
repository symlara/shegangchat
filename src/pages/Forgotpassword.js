import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import {useAuth} from '../context/AuthContext';



export default function ForgotPassword() {
    const history = useHistory()
    const [email, setEmail] = useState('')
    const { forgotPassword } = useAuth()

    
    return (
        <section>
            <form className='login-card'  onSubmit={async e => {
            e.preventDefault()
            // your forgot password logic here
            forgotPassword(email)
            .then(response => {
              console.log(response)
              alert('Email sent, please check provided email')
            }).catch(e => {
              console.log(e.message)
              alert(e.message)
            })
          }}
            >
                <h3 className='text-white text-center'>Forgot password?</h3>

                <div className='input-container'>
                    <input 
                        placeholder="Email"
                        value={email} 
                        onChange={e => setEmail(e.target.value)}
                        name="email"
                        type="email"
                        autoComplete='email'
                        required                    
                    />
                    <div className='btn_container'>
                    <button type="submit" className='btn text-white'>
                        Submit
                    </button>
                    </div>
                </div>
                <hr />
                <p className='text-white text-center'>OR</p>
                <div className='btn_container'>
                <button variant='link' className='btn text-white' onClick={() => history.push('/login')}>
                    Login
                </button>
                </div>
            </form>
        </section>
    )
}