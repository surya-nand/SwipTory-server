const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    category: String,
})

const Category = mongoose.model("category",categorySchema)

module.exports = Category;