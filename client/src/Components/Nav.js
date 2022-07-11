import React  from "react";
import { useSelector, useDispatch } from "react-redux";
import Image from "../Image/c6a2bd21-5ce5-4801-8ecf-b464ca584ccb.png"

import {useNavigate} from 'react-router-dom'


function Navbar(){

    const {auth}= useSelector((state)=> ({...state}))
    const dispatch= useDispatch()
    const Navigate= useNavigate()

    const logOut=()=>{
        dispatch({
            type: "LOGOUT",
            payload: null
        })
        window.localStorage.removeItem('auth')
        Navigate("/");
    }


    return(
        <nav>
        <div className="nav-wrapper">
        <a href="#" className="brand-logo right" style={{paddingRight: "38px"}}>Markovate<img src={Image} style={{height:"20px",width:"22px"}} alt="logo" /> </a>
        <ul id="nav-mobile" className="left hide-on-med-and-down">
        {auth == null && (
                <>
                <li><a href="/login">Login</a></li>
                <li><a href="/register">Register</a></li>    
                </>
            )}
            

            {auth !== null && (
                <>
                    <li><a  onClick={logOut}>LogOut</a></li>
                </>
            )}
        </ul>
        </div>
  </nav>
    )
}

export default Navbar