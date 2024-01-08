const mongoose = require("mongoose")

const { ObjectId } = mongoose.Schema.Types;


const orderSchema = mongoose.Schema({
    user : { type: ObjectId, ref: 'User' },
    books : [{ type: ObjectId, ref: 'Book' }],
    totalAmount: Number
})

const orderModel = mongoose.model("order",orderSchema)

module.exports = {
    orderModel
}