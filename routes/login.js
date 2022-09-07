const express=require("express")
const routerr = express()
const db=require("../connection")
const joischema=require("../helper/joi")
const bcrypt = require('bcrypt');
const saltRounds = 10;
routerr.post("/login",(req,res)=>{
    let login=req.body
    let email=`select * from signup where email='${login.email}'`
    db.query(email,async(err,result)=>{
        if(!err){
            let searchEmail=await(db.query(email))
            if(searchEmail.rowCount==0){
                console.log("Email id not registered. Please sign up!")
                res.send("Email id not registered. Please sign up!")
            }else
            {
                db.query(`select password from signup where email='${login.email}'`,(err,result)=>{
                    if(!err){
                        let hash=result.rows[0].password
                        bcrypt.compare(login.password, hash, function(err, result){
                            if(result){
                                console.log("login success")
                                res.send("Login success! Welcome!").status(200)
                            }
                            else{
                                console.log("incorrect password")
                                res.send("Incorrect password!").status(400)
                            }
                        })
                    }else{
                        res.send(err).status(400)
                    }
                })
            }
        }else{
            console.log("login failed",err)
            res.send().status(400)
        }
    })            
})
module.exports=routerr