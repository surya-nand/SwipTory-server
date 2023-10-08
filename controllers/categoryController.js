const category = require("../models/category")
require("dotenv").config();

const getCategories = async(req,res) => {
    try {
        const categories = await Category.find();
        res.send(categories);
      } catch (error) {
        res.json({
          status: "failed in fetching categories",
          msg: error,
        });
      }
}

const createCategory = async(req,res) => {
    try {
        const { category } = req.body;
        const newCategory = new Category({ category });
        await newCategory
          .save()
          .then((new_Category) => {
            res.send({
              msg: "New category details added",
              details: new_Category,
            });
          })
          .catch((error) => {
            res.send({
              msg: "New category details failed to add",
              error: error,
            });
          });
      } catch (error) {
        res.send({
          msg: "Failed to post new_category details",
          error: error,
        });
      }
}

module.exports = {getCategories, createCategory}