const httpstatustext = require("../utils/httpstatustext")
module.exports = (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.currentUser.role)){
            res.status(400).json({status:httpstatustext.ERROR,message:"you are not allowed to do that"})
        }
        else{
            next();
            // res.status(200).json({status:httpstatustext.SUCCESS,data:{data:null}})
        }
    }
}