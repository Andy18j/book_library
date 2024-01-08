const express = require("express")
const jwt = require("jsonwebtoken")
const {bookRouter} = require("../routes/book.route")
const {orderRouter} = require("../routes/order.route")



const auth=(req,res,next)=>{
    const token=req.headers.authorization
    if(token){
       const decoded= jwt.verify(token.split(" ")[1],process.env.secretKEY)
       if(decoded){
       req.body.username=decoded.UserName;
        next()
       }else{
        res.status(400).send({"msg":"Please login first"})
       }
    }else{
        res.status(400).send({"msg":"Please login first"})
    }

}

module.exports= {
    auth
}