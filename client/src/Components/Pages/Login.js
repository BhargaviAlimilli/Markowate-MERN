import React, {useState} from 'react'
import {loginUser} from './../../actions/authentication'
import {useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {toast} from 'react-toastify'



function Login(){

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const Navigate= useNavigate()
    const dispatch= useDispatch()

    const handleSubmit= async(e)=>{
        e.preventDefault()
        try{
            const res = await loginUser({ email,password })    
            console.log(res.data)
            if(res.data.status==="Ok"){
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
        <div className='color-change' >
        <h2>Login with your credentials</h2>
        <hr />
        <form onSubmit={handleSubmit} >
            <input type='email' placeholder='Enter Email' value={email} 
                onChange={(e) => setEmail(e.target.value)}/>

            <input type='password' placeholder='Enter Password' value={password}
                onChange={(e) => setPassword(e.target.value)} />
            <input type='submit' value='submit' />
 
        </form>
        </div>
    )
}

export default Login