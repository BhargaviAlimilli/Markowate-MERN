const Data= require("../data")

exports.outlet= async (req,res)=>{
    console.log(req.body, "input data")
    console.log(Data.outletData[0].outlet_name) 
    try{  
        let data=[]
        if(!req.body.outlet_code){
            return res.status(422).send("please provide outlet code")
        }
        if(req.body.outlet_code){
            Data.outletData.map(item =>{
                if(item.outlet_code===req.body.outlet_code){
                    console.log(item)
                    data.push(item)
                }
            })
            return res.status(200).json({
                status:"Ok",
                data: data
            })
        }

    }catch(err){
        res.status(400).json({
            status:"Fail",
            message:err.message
        })        
        console.log("Error", err)
    }
}
