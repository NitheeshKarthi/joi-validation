const express=require("express")
const app=express()
const morgan=require("morgan")
const router=require("./routes/signup")
const routerr=require("./routes/login")
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/',router)
app.use('/',routerr)
const port=5000
app.listen(port,()=>{
    console.log("server started")
})