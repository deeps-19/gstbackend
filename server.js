let express = require('express');
const vemail=require('email-validator');
const con = require("./database/connection") ;
const userModel = require('./module/customer.js');
const bodyparser=require('body-parser');
const dontenv=require('dotenv')
const app=express();

dontenv.config();
const PORT = process.env.PORT;
app.listen(PORT,(res,req)=>{
     console.log("server is runningb");
})
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json({extended:true}));
app.post('/api/creater',(req,res)=>{
    
    // if( req.body=={})
    // {
    //     // res.sendStatus(400)
    //     // return res.send("Please give your Feedback!!!");
    //     console.log("hhh");
    // }
  
        // console.log(req.body);
        if(vemail.validate(req.body.Email)){
            try{
                let new_user =  userModel({
                   
                    Name:req.body.Name,
                    Email:req.body.Email,
                    Message:req.body.Message
                   
                });
             
                console.log(new_user);
                new_user.save();
                res.sendStatus(200)
             }
             catch(error)
             {
               return res.sendStatus(error);
             }
    
        }
        else{
            return res.send("Please Enter Valid Mail")
        }
  
   
    
    
 })