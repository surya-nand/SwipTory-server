const storyUsers = require("../models/user")
require("dotenv").config();

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

module.exports = { getUser, createUser, updateUser };
