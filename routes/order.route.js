const express = require("express");
const { orderModel } = require("../model/order.model");
// const { auth } = require("../middleware/auth");
// const jwt = require("jsonwebtoken")

const orderRouter = express.Router();

orderRouter.post("/order", async (req, res) => {
    try {
        const { user, books, totalAmount } = req.body;
        if (!user || !books || !totalAmount) {
            return res.status(400).json({ error: "Please provide user, books, and totalAmount" });
        }

        // Create a new order
        const newOrder = new orderModel({
            user,
            books,
            totalAmount,
        });

        const savedOrder = await newOrder.save();

        res.status(201).json(savedOrder);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

orderRouter.get("/orders", async (req, res) => {
    try {
        const orders = await orderModel.find().populate("User Books");
        res.status(200).json(orders);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "something went wrong " });
    }
});

module.exports = {
    orderRouter
};
