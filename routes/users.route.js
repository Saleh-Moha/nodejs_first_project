const ex = require('express')

const router = ex.Router()

const {body, validationResult} = require('express-validator')

const usersController = require("../controller/user.controller");
const verifyToken = require("../middelwares/auth");

// get all users 
// register
// login


router.get('/users',verifyToken,usersController.getAllUsers)


router.post('/register',body('firstname','lastname','email','password').notEmpty(),usersController.userRigster)


router.post('/login',usersController.userLogin)



module.exports = router;