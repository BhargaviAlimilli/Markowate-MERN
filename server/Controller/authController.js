const User= require('./../Model/userModel')
const jwt= require('jsonwebtoken')

exports.login= async (req,res)=>{
    console.log(req.body, "input data")
    try{
        if(!req.body.email){
            return res.status(400).send("please provide email to login")
        }
        if(!req.body.password){
            return res.status(400).send("please provide password to login")
        }
        let user = await User.findOne({ email:req.body.email }).exec()
        if (!user){
            return res.status(400).send("No user registered on this email, please try with registered email.")
        }
        if(!await user.correctPassword(req.body.password, user.password)){
            return res.status(400).send("Wrong password.")
        }
        console.log(user)
        console.log(user.id)
        console.log(user.name)

        
        const token= jwt.sign({_id: user.id}, process.env.JWT_SECRET_KEY)

        res.status(200).json({
            status:"Ok",
            data:{
                status: "LOGGED_IN",
                userData:{
                    id: user.id,
                    user_name: user.name
                },
                access_token: token
            },
        })
    }catch(err){
        res.status(400).json({
            status:"Fail",
            message:err.message
        })        
        console.log("Error", err)
    }
}

exports.register= async (req,res)=>{
    console.log(req.body)
    try{
        if(!req.body.name){
            return res.status(400).send("please provide name")
        }
        if(!req.body.email){
            return res.status(400).send("please provide email")
        }
        if(!req.body.password){
            return res.status(400).send("please provide password")
        }
        if(req.body.password.length < 6 || req.body.password.length>12){
            return res.status(400).send("password length should be more than 6 and less than 12")
        }
        let userExist = await User.findOne({ email:req.body.email }).exec()
        if (userExist){
            return res.status(400).send("Email is already in use. Try with different Email.")
        }

        const user= await User.create(req.body)
        console.log(user)
        const token= jwt.sign({_id: user.id}, process.env.JWT_SECRET_KEY)
        res.status(200).json({
            status:"Ok",
            data:{
                status: "LOGGED_IN",
                userData:{
                    id: user.id,
                    user_name: user.name
                },
                access_token: token
            },
        })
    }catch(err){
        res.status(400).json({
            status:"Fail",
            message:err.message
        })
        console.log("Error", err)
    }
}

//middleware to check whether the user is loggedIN
exports.isLoggedin= (req,res,next)=>{
    console.log(req.headers, "headers here")
    const token = req.headers.authorization.split(' ')[1]
    console.log(token, "token here")  
   const user=  jwt.verify(token,process.env.JWT_SECRET_KEY)
   req.user=user
   next()
}
