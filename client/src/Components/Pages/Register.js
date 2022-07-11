import React, {useState} from 'react'
import {newUser} from './../../actions/authentication'
import {useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {toast} from 'react-toastify'


function Register(){
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const Navigate= useNavigate()
    const dispatch= useDispatch()

    const handleSubmit= async(e)=>{
        e.preventDefault()
        try{
            const res = await newUser({ name,email,password })      
            console.log(res.data)
            if(res.data){
                Navigate('/home')
                window.localStorage.setItem("auth", JSON.stringify(res.data))
                dispatch({
                    type: "LOGGED_IN",
                    payload: res.data,
                  });
                
            }
        } catch (err) {
          console.log(err)
          toast.error(err.response.data)

        }        
    }
    

    return(
        <div className='color-change'>
        <h2>Register Now</h2>
        <hr />
        <form onSubmit={handleSubmit} >
        <input type='text' placeholder='Enter name' value={name} 
                onChange={(e) => setName(e.target.value)}/>

            <input type='email' placeholder='Enter Email' value={email} 
                onChange={(e) => setEmail(e.target.value)}/>

            <input type='password' placeholder='Enter Password' value={password}
                onChange={(e) => setPassword(e.target.value)} />
            <input type='submit' value='submit' />
 
        </form>
        </div>
    )
}

export default Register