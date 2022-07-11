import axios from 'axios'
export const outlets= async(outletcode)=>{
    console.log(outletcode)
    return await axios.post(`${process.env.REACT_APP_API}/outlets`, outletcode)
}