const ex = require('express')

const router = ex.Router()

const {body, validationResult} = require('express-validator')

const productcontroller = require('../controller/product.controller')
const verifyToken = require("../middelwares/auth")
const allowto = require("../middelwares/allowedto")

const port = 3000



router.get('/courses',verifyToken, productcontroller.getAllCourses)

router.get('/courses/:id',verifyToken,productcontroller.getSignleCourse)


router.post('/add-courses',verifyToken,body('name').notEmpty(),productcontroller.AddCourse)


router.patch('/update-course/:id',verifyToken,productcontroller.UpdateCourse)


router.delete('/delete-course/:id',verifyToken,allowto("admin","manager"), productcontroller.DeleteCourse);


module.exports = router;