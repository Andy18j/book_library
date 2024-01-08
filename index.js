const express = require("express")
const {connection} = require("./config/db")
const { userRouter } = require("./routes/user.route")
const { bookRouter } = require("./routes/book.route")
const { orderRouter } = require("./routes/order.route")
require("dotenv").config()

const app = express()
app.use(express.json())
app.use("/api",userRouter)
app.use("/api",bookRouter)
app.use("/api",orderRouter)

app.get("/",(req,res)=>{
    res.send("Welcome To The Masai Libreary")
})


app.listen(process.env.port,async()=>{
    try{
       await connection
       console.log("Connected to the db/...")
    }
    catch(err){
        console.log(err)
        console.log("Not connected to the db")
    }
    console.log(`port is running on the ${process.env.port}`)
})