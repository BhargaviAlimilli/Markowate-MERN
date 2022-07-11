const outletController= require('./../Controller/outletController')

const express = require('express')

const router= express.Router()

router.route('/outlets').post(outletController.outlet)

module.exports=router