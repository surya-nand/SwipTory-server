const storyUsers = require("../models/user")
require("dotenv").config();

/*----------------Fetch user details---------------*/
const getUser = async (req, res) => {
  try {
    const users = await storyUsers.find();
    res.send(users);
  } catch (error) {
    res.json({
      status: "Failed in fetching users",
      msg: error,
    });
  }
};

const loginUser = async (req, res) => {
  const { userName, password, bookmarks,stories,likes } = req.body;
  try {
    const user = await storyUsers.findOne({ userName });
    if (!user) {
      return res.send({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      const token = jwt.sign({ userName: user.userName }, "secretKey");
      return res.send({ message: "Login Successful",token:token, userDetails: user });
    } else {
      return res.send({ message: "Incorrect password" });
    }
  } catch (error) {
    res.send({ message: "Internal server error" });
  }
};


const registerUser = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const existingUser = await storyUsers.findOne({ userName });

    if (existingUser) {
      return res.send({ message: "username already registered" });
    } else {
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = new storyUsers({
        userName,
        password: hashedPassword,
        bookmarks,
        stories,
        likes,
      });
      await newUser
        .save()
        .then((new_user) => {
          res.send({
            message: "Registration Successful. Please Login",
            details: new_user,
          });
        })
        .catch((error) => {
          console.error("Error while saving new user:", error);
          res.send({
            message: "New user registration failed",
            error: error.message,
          });
        });
    }
  } catch (error) {
    res.json({
      error: error,
      message: "fail",
    });
  }
};

/*----------------Create new user---------------*/
const createUser = async (req, res) => {
  try {
    const { userName, password, bookmarks, stories, likes } = req.body;
    const newUser = new storyUsers({
      userName,
      password,
      bookmarks,
      stories,
      likes,
    });
    await newUser
      .save()
      .then((new_user) => {
        res.send({
          msg: "New user details added",
          details: new_user,
        });
      })
      .catch((error) => {
        res.send({
          msg: "New user details failed to add",
          error: error,
        });
      });
  } catch (error) {
    res.send({
      msg: "Failed to post user details",
      error: error,
    });
  }
};

/*----------------update user likes,bookmarks,stories---------------*/
const updateUser = async (req, res) => {
  try {
    const { userName, password, bookmarks, stories, likes } = req.body;
    const userId = req.params.userId;

    await storyUsers.findByIdAndUpdate(userId, {
      userName,
      password,
      bookmarks,
      stories,
      likes,
    });

    res.send({
      msg: "User details updated",
    });
  } catch (error) {
    res.send({
      msg: "Failed to update user details",
      error: error,
    });
  }
};

module.exports = { getUser, createUser, updateUser, loginUser, registerUser
 };
