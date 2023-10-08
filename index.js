const express = require("express");
const bodyParser = require("body-parser");
const dotEnv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./config/database")


const { userRoutes } = require("./routes/userRoutes");
const { storyRoutes } = require("./routes/storyRoutes");
const { categoryRoutes } = require("./routes/categoryRoutes");

dotEnv.config();
const app = express();

/*----------------Database connection---------------*/
connectDB();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("./public"));

app.get("/", (req, res) => {
  res.json({
    msg: "All good swipe-stories",
  });
});

/*----------------API ROUTES---------------*/
userRoutes(app);
storyRoutes(app);
categoryRoutes(app);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.port}`);
});
