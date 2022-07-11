import React, {useState, useEffect} from 'react'
import {toast} from 'react-toastify'
import {outlets} from "../../actions/outlets"
function Home(){
    const [code, setcode] = useState("")
    const [data,setData]=useState([])


    const handleSubmit= async(e)=>{
        try{
            const res = await outlets({outlet_code:code})    
            // console.log(res.data.data)
            if(res.data.status==="Ok" && res.data.data.length>0){
                setData(res.data.data)                
            }
        } catch (err) {
          console.log(err)
          toast.error(err.response.data)

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
        {data.length>0 && data.map(item=>{
        return <h5>{JSON.stringify(item)}</h5>
        })}

        {data.length<=0 && <h6>Enter valid outlet code</h6>}


        </div>

    )    
}
export default Home