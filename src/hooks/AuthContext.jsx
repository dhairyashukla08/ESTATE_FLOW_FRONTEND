import axios from "axios";
import { createContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react"

const AuthContext=createContext();
export const AuthProvider=({children})=>{
    const[user,setUser]=useState(null);
    const [loading,setLoading]=useState(true);


    useEffect(()=>{
        const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
    },[]);

   const logout=()=>{
    localStorage.removeItem('user');
    setUser(null);
   };
   return(
    <AuthContext.Provider value={{user,loading,logout}}>
        {children}
    </AuthContext.Provider>
)
};

export const useAuth=()=>useContext(AuthContext);


