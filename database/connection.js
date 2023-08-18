const mongo = require("mongoose")
const dotenv=require("dotenv")
dotenv.config();
conne=process.env.connect
const conn = mongo.connect(conne,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>{console.log("Mongo db connected")})
.catch((error)=>{console.log(error)})

module.exports = conn
