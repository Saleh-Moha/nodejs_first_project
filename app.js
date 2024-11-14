require("dotenv").config()
const url = process.env.MONOG_URL;
const ex = require('express')
const app = ex()
app.use(ex.json())
const mongoose = require("mongoose")
const coursesroutes = require('./routes/product.s.route')
const usersroutes = require('./routes/users.route')
app.use('/api',coursesroutes)
app.use('/api',usersroutes)

const httpstatustext = require("./utils/httpstatustext");
app.all('*',(req,res,next)=>{
    res.status(404).json({status:httpstatustext.ERROR,message:"this resourse is not found"})
})


const cors = require("cors")
app.use(cors())


console.log(process.env.MONOG_URL);
mongoose.connect(url).then(()=>{
    console.log("mongoose db connected")
})

app.listen(process.env.PORT,()=>{
    console.log(`runnig on port 3000`)
})
