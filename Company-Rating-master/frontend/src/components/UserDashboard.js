import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function UserDashboard(){
    const [token, setToken] = useState("");
    const navigate = useNavigate();

     useEffect(()=>{
        setToken(localStorage.getItem('email'));
     })
     if(!localStorage.getItem('email')){
        navigate("/")
     }
    return (
        <>
            <h1>Welcome {token}</h1>
            <Link to='/logout'>Logout</Link> 
        </>
    )
}