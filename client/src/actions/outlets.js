import axios from 'axios'
export const outlets= async(outletcode, token)=>{
    console.log(token, "token here..........")
    return await axios.post(`${process.env.REACT_APP_API}/outlets`, outletcode,{
        headers: {
          Authorization: `Bearer ${token}`,
        }})
}