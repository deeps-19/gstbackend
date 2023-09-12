let express = require('express');
const vemail=require('email-validator');
const con = require("./database/connection") ;
const userModel = require('./module/customer.js');
const bodyparser=require('body-parser');
const dontenv=require('dotenv')
const app=express();
const cors = require('cors');
const nodemailer = require("nodemailer");

dontenv.config();
const PORT = process.env.PORT;
const email = process.env.email;
const pass = process.env.pass;
app.listen(PORT,(res,req)=>{
     console.log("server is runningb");
})
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json({extended:true}));
app.use(cors({
    origin :"*"
    

}));
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
                let transporter = nodemailer.createTransport({
                    service: 'gmail',
                    
                    // host: 'smtp.elasticemail.com',
                    port:465,
                    secure: true,
                    auth: {
                        user: email,
                        pass: pass
                    },
                    tls:{
                        rejectUnauthorized:true
                    }
                  });

                  let info= transporter.sendMail({
                    from: '"Samarth GSK Contact Information" <adp839612@gmail.com>', // sender address
                    to: "adp839612@gmail.com", // list of receivers
                    subject: "Customer feedback", // Subject line
                    text: "Feedback", // plain text body
                    html: `name:${req.body.Name}<br>Email: ${req.body.Email} <br>Message:${req.body.Message}`, // html body
                  });
                let new_user =  userModel({
                   
                    Name:req.body.Name,
                    Email:req.body.Email,
                    Message:req.body.Message
                   
                });
              
                
                console.log("Message sent: %s", info.messageId);
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