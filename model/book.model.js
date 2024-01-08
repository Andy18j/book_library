const mongoose = require("mongoose")

const bookSchema = mongoose.Schema({
    title: String,
  author: String,
  category: String,
  price: Number,
  quantity: Number
})

const bookModel = mongoose.model("Book",bookSchema)

module.exports = {
    bookModel
}