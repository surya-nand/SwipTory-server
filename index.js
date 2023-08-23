const express = require("express");
const bodyParser = require("body-parser");
const dotEnv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const Story = require("./models/story");
const storyUsers = require("./models/user");
const Category = require("./models/category");

dotEnv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("./public"));

app.get("/", (req, res) => {
  res.json({
    msg: "All good",
  });
});

app.get("/api/storyUsers", async (req, res) => {
  try {
    const users = await storyUsers.find();
    res.send(users);
  } catch (error) {
    res.json({
      status: "Failed in fetching users",
      msg: error,
    });
  }
});

app.post("/api/storyUsers", async (req, res) => {
  try {
    const { userName, password, bookmarks, stories,likes } = req.body;
    const newUser = new storyUsers({ userName, password, bookmarks, stories,likes });
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
});0

app.put("/api/storyUsers/:userId", async (req, res) => {
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
});

app.get("/api/stories", async (req, res) => {
  try {
    const {categories} = req.query;
    const filter = categories ? { storyCategory: { $in: categories } } : {};
    const stories = await Story.find(filter);
    res.send(stories);

  } catch (error) {
    res.status(500).json({ error: "Failed to fetch stories" });
  }
});

app.post("/api/stories", async (req, res) => {
  try {
    const {
      unique_id,
      storyHeading,
      storyDescription,
      storyCategory,
      slides,
      likesCount,
      storyImageUrl,
    } = req.body;
    // // Validate minimum 3 slides
    // if (slides.length < 3) {
    //   return res.status(400).json({ error: "Minimum 3 slides are required." });
    // }
    

    const slideObjects = slides.map((slide) => ({
      slide_heading: slide.slide_heading,
      slide_description: slide.slide_description,
      slide_imageurl: slide.slide_imageurl,
      slide_category: slide.slide_category,
    }));

    const newStory = new Story({
      unique_id,
      storyHeading,
      storyDescription,
      storyCategory,
      slides: slideObjects,
      likesCount,
      storyImageUrl,
    });
    await newStory.save();

    res.json({ message: "Story saved successfully." });
  } catch (error) {
    res.status(500).json({ error: "Unable to save the story." });
  }
});

app.put("/api/stories/:storyId", async (req, res) => {
  try {
    const { storyHeading, storyDescription, storyCategory, slides, likesCount, storyImageUrl } = req.body;
    const storyId = req.params.storyId;

    const slideObjects = slides.map((slide) => ({
      slide_heading: slide.slide_heading,
      slide_description: slide.slide_description,
      slide_imageurl: slide.slide_imageurl,
      slide_category: slide.slide_category,
    }));

    await Story.findByIdAndUpdate(storyId, {
      storyHeading,
      storyDescription,
      storyCategory,
      slides: slideObjects,
      likesCount,
      storyImageUrl,
    });

    res.json({ message: "Story updated successfully." });
  } catch (error) {
    res.status(500).json({ error: "Unable to update the story." });
  }
});

app.get("/api/stories/:storyId", async (req, res) => {
  try {
    const { storyHeading, storyDescription, storyCategory, slides, likesCount, storyImageUrl } = req.body;
    const storyId = req.params.storyId;

    // // Validate minimum 3 slides
    // if (slides.length < 3) {
    //   return res.status(400).json({ error: "Minimum 3 slides are required." });
    // }

    const slideObjects = slides.map((slide) => ({
      slide_heading: slide.slide_heading,
      slide_description: slide.slide_description,
      slide_imageurl: slide.slide_imageurl,
      slide_category: slide.slide_category,
    }));

    const response= await Story.findById(storyId, {
      storyHeading,
      storyDescription,
      storyCategory,
      slides: slideObjects,
      likesCount,
      storyImageUrl,
    });
    res.json({ storydetails: response});
  } catch (error) {
    res.status(500).json({ error: "story is safe, but figuring out how to show" });
  }
});

app.get("/api/categories", async (req, res) => {
  try {
    const categories = await Category.find();
    res.send(categories);
  } catch (error) {
    res.json({
      status: "failed in fetching categories",
      msg: error,
    });
  }
});

app.post("/api/categories", async (req, res) => {
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
});

app.listen(process.env.PORT, () => {
  mongoose


    .connect(process.env.MONGO_SERVER, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Database connected successfully");
    })
    .catch((error) => {
      console.log("DB connection failed", error);
    });
  console.log(`Server is running on ${process.env.port}`);
});
