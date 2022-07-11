const mongoose= require('mongoose')
const bcrypt = require('bcryptjs')
const validator= require('validator')

const userSchema= new mongoose.Schema({
    name:{
        type: String,
        required:[true, "Name is mandatory field"],
    },
    email:{
        type:String,
        required:[true, "Email is mandatory"],
        unique:true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    password: {
        type: String,
        required: [true, "Password is mandatory"],
        min: 6,
        max: 12
    }
})

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        return next()
    }
    this.password= await bcrypt.hash(this.password,12)
})

userSchema.methods.correctPassword= async function(candidatePassword,userPassword){
    return await bcrypt.compare(candidatePassword,userPassword)
}

const User= mongoose.model('User', userSchema)
module.exports= User