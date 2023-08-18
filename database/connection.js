const mongo = require("mongoose")
const dotenv=require("dotenv")
dotenv.config();
uri=process.env.connect
// console.log(conne)
const conn = mongo.connect(uri,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>{console.log("Mongo db connected")})
.catch((error)=>{console.log(error)})

module.exports = conn
