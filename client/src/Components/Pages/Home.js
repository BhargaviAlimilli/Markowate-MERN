import React, {useState, useEffect} from 'react'
import {toast} from 'react-toastify'
import {outlets} from "../../actions/outlets"
import {useSelector} from 'react-redux'

function Home(){
    const [code, setcode] = useState("")
    const [dataset,setDataset]=useState([])
    const { auth } = useSelector((state) => ({ ...state }));
    const {data} = auth
    const {access_token}= data


    const handleSubmit= async(e)=>{
        console.log(access_token)
        console.log(outlets)

        try{
            const res = await outlets({outlet_code:code}, access_token)    
            console.log(access_token)
            if(res.data.status==="Ok" && res.data.data.length>0){
                setDataset(res.data.data)                
            }
        } catch (err) {
          toast.warning(err.response.data)
        }        
    }
    
    useEffect(()=>{
        handleSubmit()
    }, [code])



    return(
        <div className="color-change">
        <h2 >We create futuristic mobile products to make tech brands digitally powerful</h2>
        <p >Markovate is a product development agency focusing on digital transformation and product development.</p>
        <form onSubmit={handleSubmit} >
            <input type='text' placeholder='Enter Outlet code to search' value={code} 
                onChange={(e) => setcode(e.target.value)}/>

            <input type='submit' value='Search' />
        </form>
        {dataset.length>0 && dataset.map((item,i)=>{
        return(
            <div key={i}>
            <h5>Record: {i+1} </h5>
            <h6>Outlet Name: {item.outlet_name}</h6>
            <p>outlet code: {item.outlet_code}</p>
            <p>Town Name: {item.town_name}</p>
            <p>Town code: {item.town_code}</p>
            <p>Route name: {item.route_name}</p>  
            <hr/>          
            </div>
        )})}

        {dataset.length<=0 && <h6>Enter valid outlet code</h6>}


        </div>

    )    
}
export default Home