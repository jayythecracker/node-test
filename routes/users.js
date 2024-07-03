const express = require('express');
const route = express.Router();

const validateToken = require('../validators/tokenValidator');
const User = require('../models/userModel');

route.get('/',[validateToken,async(req,res,next)=>{
   const user=req.body.user;
   if(user.role === 'user'){
    const users = await User.find()
    res.json(users)
   }else{
    res.status(400).json({msg:'Not Allowed!'})
   }
}]);
module.exports = route;