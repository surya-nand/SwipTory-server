const {
  createUser,
  updateUser,
  getUser,
} = require("../controllers/userController");

/*----------------user ROUTES---------------*/

const userRoutes = (app) => {
  app.route("/api/storyUsers").get(getUser);
  app.route("/api/storyUsers").post(createUser);
  app.route("/api/storyUsers/:userId").put(updateUser);
};

module.exports = { userRoutes };
