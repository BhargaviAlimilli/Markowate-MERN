import './App.css';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { useSelector } from 'react-redux';
import Nav from './Components/Nav';
import Login from './Components/Pages/Login'
import Home from './Components/Pages/Home'
import Register from './Components/Pages/Register'
import Image from "./Image/1651751963084.jpeg"

const Entry=()=> {
  return(
    <>
      <h1 >Welcome</h1>
      <img src={Image} alt="logo" style={{height:"300px", width:"390px"}}/>
    </>
    )}

function App() {
  const {auth}= useSelector((state)=> ({...state}))

  return (
    <Router >
      <Nav />
      <div className='App' >
      <ToastContainer />
        <Routes>
        {auth!== null &&
          <Route path='/home' element={<Home />} />
         }
         
        <Route path='/' element={<Entry />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        </Routes>
      </div>
    </Router>
    
  );
}

export default App;
