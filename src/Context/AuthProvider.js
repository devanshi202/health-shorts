import React, { createContext } from 'react'
import {useState, useEffect, useContext} from "react"
import {auth} from "../Components/Firebase"
import {signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, onAuthStateChanged} from "firebase/auth"
export const myContext = createContext()

function AuthProvider({children}) {
    
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState();


    let login =(email, password)=>{
        return signInWithEmailAndPassword(auth, email, password);
    }
    let signup =(email, password)=>{
        return createUserWithEmailAndPassword(auth, email, password);
    }
    let logout =()=>{
        return signOut(auth);
    }

    useEffect(()=>{
        let unsubscribe = onAuthStateChanged(auth, (curruser)=>{
            setUser(curruser);
            setLoading(false);
        });

        return ()=>{unsubscribe()}
    },[])

let value={
    user, 
    login,
    signup,
    logout
}
  return (
    <myContext.Provider value={value}>
        {!loading&&children} 
    </myContext.Provider>
    

    // if loading is false then provide this value to all children consuming this context
  )
}

export default AuthProvider