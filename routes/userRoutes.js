const {
  createUser,
  updateUser,
  getUser,
  loginUser,
  registerUser,
} = require("../controllers/userController");

/*----------------user ROUTES---------------*/

const userRoutes = (app) => {
  app.route("/api/storyUsers").get(getUser);
  app.route("/api/storyUsers").post(createUser);
  app.route("/api/storyUsers/:userId").put(updateUser);
  app.route("/api/storyUsers/login").post(loginUser);
  app.route("/api/storyUsers/register").post(registerUser);

};

module.exports = { userRoutes };



