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
              <Link to="/chat">Chat</Link>
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
      <p className='text-white text-center description'>A PLACE FOR ALL H.E.R. FANS TO FIND ALL THINGS H.E.R., <br />SHE GANG ACTIVITIES, SCHOOL AND CAREER RESOURCES, AND A SENSE OF COMMUNITY.</p>
        <div className='topnav' id="myTopnav">

        </div>
    </div>

    
  )
}

export default Header;