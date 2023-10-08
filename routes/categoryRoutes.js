const {
  getCategories,
  createCategory,
} = require("../controllers/categoryController");

/*----------------Category ROUTES---------------*/
const categoryRoutes = (app) => {
  app.route("/api/categories").get(getCategories);
  app.route("/api/categories").post(createCategory);
};

module.exports = { categoryRoutes };
