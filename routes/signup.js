const express=require("express")
const router = express()
const db=require("../connection")
const joischema=require("../helper/joi")
const bcrypt = require('bcrypt');
const saltRounds = 10;

//signing up with joi validation
router.post("/signup",(req,res)=>{
    let signup=req.body
    let dataToValidate={
        username:signup.username,
        password:signup.password,
        birthyear:signup.birthyear,
        email:signup.email
    }
    const result = joischema.validate(dataToValidate,joischema.schema);
    console.log(result)
    if(result.error==null){
        bcrypt.hash(signup.password, saltRounds, function(err, hash) {
            let insert=`insert into signup(email,password,username,birthyear)
            values('${signup.email}','${hash}','${signup.username}',${signup.birthyear})`
            db.query(insert,(err,result)=>{
                if(!err){
                    console.log("success")
                    res.send().status(200)
                }else{
                    console.log("data insertion failed",err)
                    res.send().status(400)
                }
            })        
        })       
    }    
})
module.exports=router