const outletController= require('./../Controller/outletController')
const {isLoggedin}= require('./../Controller/authController')


const express = require('express')

const router= express.Router()

router.route('/outlets').post(isLoggedin,outletController.outlet)

module.exports=router