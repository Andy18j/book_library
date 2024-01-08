const express = require("express")
const {userModel} = require("../model/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userRouter = express.Router()


// for ragisterd the user //  
userRouter.post("/register",async(req,res)=>{
   try{
     const {name,email,password,isAdmin}=req.body
     const hased = await bcrypt.hash(password,7)
     const newuser = new userModel({name,email,password:hased,isAdmin})
     await newuser.save()
     res.status(201).json({msg:"User Ragisterd Sucessfullyy...."})
   }
   catch(err){
    // console.log("err")
    res.status(501).json({msg:"Something went wrong to post the user registerd data"})
   }
})

//for login and it return a jwt token to verify user
userRouter.post("/login",async(req,res)=>{
    try{
        const {email,password} = req.body
        const user = await userModel.findOne({email})
        if (!user){
            return res.status(504).json({msg:"User are not registed ,kindly register ur account..."})
        }
            const comparepassword = await bcrypt.compare(password,user.password)
            const token = jwt.sign({userId:user._Id},process.env.secretKEY,{
                expiresIn:"5min"
            })
            if (comparepassword){
                return res.status(201).json({msg:"User Login Sucessfully...",token})
            }else{
                return res.status(501).json({msg:"Wrong Credentials..."})
            }
    }
    catch(err){
        console.log(err)
        res.status(502).json({msg:"Something went wrong to login the user"})
    }
})


module.exports = {
    userRouter
}