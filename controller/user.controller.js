const Users = require('../models/users.model');  // Confirm the file path here
const httpstatustext = require("../utils/httpstatustext")
const {body, validationResult} = require('express-validator')
const Httpstatus = require('../utils/httpstatustext');
const { first } = require('lodash');
const bcrypt = require("bcryptjs")
var jwt = require("jsonwebtoken")
const generatetoken = require("../utils/generatejwt");
const { token } = require('morgan');


const getAllUsers= async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;  // Default limit to 10 if not provided
  const page = parseInt(req.query.page) || 1;     // Default page to 1 if not provided
  const skip = (page - 1) * limit;

  try {
      const users = await Users.find({}, { "__v": false , "password":false }).limit(limit).skip(skip);
      res.json({ status: "success", data: {users} });
  } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
  }
};

const userRigster= async(req,res)=>{
    try{    
    const{firstname,lastname,email,password,role}=req.body;
    // email validation
    const existedUser = await Users.findOne({email:email})
    if(existedUser){
        return res.status(400).json({status:httpstatustext.ERROR,message:"the user is already exist"})
    }
    // password hashing
    const hashedpassword = await bcrypt.hash(password,10);
    const newuser = new Users({
        firstname,
        lastname,
        email,
        role,
        password:hashedpassword
    })
    // generate jwt

    const token = await generatetoken({email:newuser.email , id:newuser._id,role:newuser.role })
    newuser.token = token;
    await newuser.save();
    res.status(200).json({status:httpstatustext.SUCCESS, data:{user : newuser}})
}
catch(err){
    console.log(err)
    res.status(404).json({status:httpstatustext.ERROR,message:err.message})
}
};

const userLogin = async(req,res)=>{
    try{
        const {email,password} = req.body;
        if(!email && !password){
            return res.status(400).json({status:httpstatustext.ERROR,message:"email and password must be valid"})
        }
        const user = await Users.findOne({email:email});
        if(!user){
            return res.status(404).json({status:httpstatustext.ERROR,message:"user not found"});
        }
        const matchPassword = await bcrypt.compare(password,user.password);
        if (user && matchPassword){
            const token = await generatetoken({email:user.email ,id:user._id,role:user.role});
            return res.status(200).json({status:httpstatustext.SUCCESS,message:"successfully logged in",data:{token:token}});
        }
        else{
            return res.status(404).json({status:httpstatustext.ERROR,message:"something went wrong"})
        }
    }
    catch(err){
        return res.status(404).json({status:httpstatustext.ERROR,message:err.message})
    }
    
}


module.exports = {
    getAllUsers,
    userRigster,
    userLogin
}