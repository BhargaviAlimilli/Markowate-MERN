const express= require('express')
const cors= require('cors')
const authRoutes= require('./Routes/authRouter')
const outletRoutes= require('./Routes/outletRouter')


const app= express()

app.use(cors())
app.use(express.json())
app.use('/api', outletRoutes)
app.use('/api', authRoutes)


module.exports= app