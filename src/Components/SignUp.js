import React from 'react'
import {myContext} from "../Context/AuthProvider"
import {useState, useContext, useEffect} from "react"
import { getDownloadURL, ref, uploadBytesResumable } from '@firebase/storage';
import {storage} from "./Firebase"
import {database} from "./Firebase"
import { addDoc } from 'firebase/firestore';
function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const {signup} = useContext(myContext);
    const [proImg, setImg] = useState("");

    let handleFileUpload = (e) =>{
       let file = e.target.files[0];
        setImg(file);
    }

    let handleSubmit = async(e)=>{
        e.preventDefault();
        setLoading(true)
        let response = await signup(email, password);
        let uid = response.user.uid;
        setLoading(false)

        if(!proImg) return;
        const storageRef = ref(storage, `/User/${uid}/profileImg`);
        const uploadTask = uploadBytesResumable(storageRef, proImg);
        uploadTask.on("state_changed", (snapshot)=>{
            const prog = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );

        }, (err)=> console.log(err),
            async ()=>{
                let url = await getDownloadURL(uploadTask.snapshot.ref)
                console.log(url)

                let docRef=await addDoc(database.user, {
                    username: name,
                    email: email,
                    userId: uid,
                    profile_url : url,
                    post: []
                });
                console.log(docRef.id);
            }
        )

    }
    return (
    <div>
        <form onSubmit={handleSubmit}>
            <div>
                <label >
                    Name
                </label>
                <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}}/>
            </div>
            <div>
                <label>
                    Email
                </label>
                <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
            </div>
            <div>
                <label>
                    Password
                </label>
                <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
            </div>
            <div>
                <label>
                    profile
                </label>
                <input type="file" accept='image/*' onChange={handleFileUpload}/>
            </div>
            <button type = "submit" disabled={loading}>Sign Up</button>
        </form>
    </div>
  )
}

export default SignUp