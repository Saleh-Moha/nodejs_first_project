const jwt = require("jsonwebtoken")
const httpstatustext = require("../utils/httpstatustext")
const verifyToken = (req,res,next)=>{ 
    try{
        const authHeaders = req.headers['Authorization'] || req.headers['authorization']
        const token = authHeaders.split(" ")[1];
        const currentUser = jwt.verify(token,process.env.JWT_SECRET_KEY);
        req.currentUser=currentUser;
        console.log(req.currentUser.id)
        next();
    }
    catch(err){
        res.status(404).json({status:httpstatustext.ERROR,message:{status:"user is not logged in"}})
    }

}
module.exports=verifyToken