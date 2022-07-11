const app= require('./app')
const dotenv= require("dotenv")
const mongoose= require('mongoose')

dotenv.config({path:'./config.env'})

mongoose.connect(process.env.DATA_BASE).then((suc)=>{
    // console.log(suc)
    console.log("Data base connection successful")
}).catch((err)=>{
    console.log("Error Occured while connecting to Data base")
    console.log(err)
})


app.listen(process.env.PORT, ()=>{
    console.log(`Hello from the server ${process.env.PORT}`)
})