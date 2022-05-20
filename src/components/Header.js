import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { auth, db } from '../firebase';
import { signOut } from 'firebase/auth';
import {updateDoc, doc} from 'firebase/firestore';
import { AuthContext } from '../context/auth';
import { useHistory } from 'react-router-dom'



const Header = () => {
  const history = useHistory();
  const { user } = useContext(AuthContext);

  
  const handleSignout = async () => {
    await updateDoc(doc(db, 'users', auth.currentUser.uid), {
      isOnline: false,
    });
    await signOut(auth);
    history.replace('/');
  }


  return (
    <div>
      <nav>
          <h3>
            <Link className='pr-3 font-bold text-2xl' to="/">SheGang</Link>
              <Link to="/dashboard">Dashboard</Link>
          </h3>
          <div>
              {user ? (
              <>
              <Link to="/profile">Profile</Link>
              <button className='btn' onClick={handleSignout} >Logout</button>
              </> 
              ) : (  
              <>
              <Link to="/register">Register</Link>
              <Link to="/login">Login</Link>
              </>
              )}
          </div>
      </nav>
        <div className='topnav' id="myTopnav">

        </div>
    </div>

    
  )
}

export default Header;