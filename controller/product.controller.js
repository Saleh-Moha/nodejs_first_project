const Courses = require('../models/products.model')
const {body, validationResult} = require('express-validator')
const Httpstatus = require('../utils/httpstatustext')


const getAllCourses = async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;  // Default limit to 10 if not provided
  const page = parseInt(req.query.page) || 1;     // Default page to 1 if not provided
  const skip = (page - 1) * limit;

  try {
      const courses = await Courses.find({}, { "__v": false }).limit(limit).skip(skip);
      res.json({ status: "success", data: { courses } });
  } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
  }
};

const getSignleCourse = async (req,res)=>{
  try{    
    const id = req.params.id;
    const course = await Courses.findById(id);
    if(!course){
      res.status(404).json({status:Httpstatus.SUCCESS,data:"null" , msg:"course not found"});
    }
    res.json({status:Httpstatus.SUCCESS,data:{course:course}});
  }
  catch(err){res.json({"msg":"invalid "},err)}

}

const AddCourse = async (req,res)=>{
    const {name,price} = req.body;
    const error = validationResult(req);
    if(!error.isEmpty()){
      return res.status(400).json({status:Httpstatus.FAIL})
    }
    const newCourse = new Courses({
      name,
      price,
      added_with:req.currentUser.email
  });
    await newCourse.save();
    res.status(200).json({satatus:Httpstatus.SUCCESS,data:{course:newCourse}});
}

const UpdateCourse = async (req,res)=>{
  try{const proid = req.params.id;
    const updatedcourse = await Courses.findByIdAndUpdate(proid,{$set: {...req.body}}) 
  
    res.status(200).json({status:Httpstatus.SUCCESS,data:{course:updatedcourse}})
  }catch(err){res.status(404).json(err)}
  
}

const DeleteCourse = async (req, res) => {
  try{const proid = req.params.id; 
    const course = await Courses.deleteOne({_id : proid})
    res.status(200).json({status:Httpstatus.SUCCESS,data:{course:null}});
  }
  catch(err){
    res.status(404).json(err)
  }
    
}


module.exports = {
    getAllCourses,
    getSignleCourse,
    AddCourse,
    UpdateCourse,
    DeleteCourse
}