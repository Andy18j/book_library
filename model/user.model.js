const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    isAdmin: Boolean
})

const userModel = mongoose.model("User",userSchema)



module.exports = {
    userModel
}