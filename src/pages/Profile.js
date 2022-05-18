import React, { useState, useEffect } from 'react'
import Img from '../blank-profile-picture-g2d31a7c33_640.png';
import Camera from '../components/svg/Camera';
import { storage, db, auth } from '../firebase';
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";

import {getDoc, doc, updateDoc} from 'firebase/firestore';


const Profile = () => {
    const [img, setImg] = useState('');
    const [user, setUser] = useState();
   

    useEffect(() => {
      getDoc(doc(db, 'users', auth.currentUser.uid)).then((docSnap) =>{
          if(docSnap.exists) {
              setUser(docSnap.data());
        }
      });

      if (img) {
        const uploadImg = async () => {
            const imgRef = ref(
                storage, 
                `avatar/${new Date().getTime()} - ${img.name}`
            );
            try {
                const snap = await uploadBytes(imgRef, img)
                const url = await getDownloadURL(ref(storage, snap.ref.fullPath))
                
                await updateDoc(doc(db, 'users', auth.currentUser.uid), {
                avatar: url,
                avatarPath: snap.ref.fullPath
           });
           console.log(url);

             setImg("");
            } catch(err) {
                console.log(err.message);
            }
        };
        uploadImg();
      }

    }, [img]);
    
    

  return (
    <section>   
        <div className='profile_container'>
            <div className='img_container'>
                <img src={Img} alt='avatar' />
                <div className='overlay'>
                    <div>
                        <label htmlFor="photo">
                            <Camera />
                        </label>
                        <input 
                            type="file" 
                            accept="image/" 
                            style={{ display: "none" }} 
                            id="photo" 
                            onChange={(e) => setImg(e.target.files[0])}                        />
                    </div>
                </div>
            </div>
            <div className='text_container text-white'>
                <h3>User name</h3>
                <p>User email</p>
                <hr />
                <small>Joined on...</small>
            </div>
        </div>

    </section>
  );
}

export default Profile;