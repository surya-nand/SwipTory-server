const story = require("../models/story");
require("dotenv").config();

const getStory = async (req, res) => {
  try {
    const { categories } = req.query;
    const filter = categories ? { storyCategory: { $in: categories } } : {};
    const stories = await Story.find(filter);
    res.send(stories);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch stories" });
  }
};

const createStory = async (req, res) => {
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
};

const updateStory = async (req, res) => {
  try {
    const {
      storyHeading,
      storyDescription,
      storyCategory,
      slides,
      likesCount,
      storyImageUrl,
    } = req.body;
    const storyId = req.params.storyId;

    const slideObjects = slides.map((slide) => ({
      slide_heading: slide.slide_heading,
      slide_description: slide.slide_description,
      slide_imageurl: slide.slide_imageurl,
      slide_category: slide.slide_category,
    }));

    await Story.findOneAndUpdate(
      { unique_id: storyId },
      {
        storyHeading,
        storyDescription,
        storyCategory,
        slides: slideObjects,
        likesCount,
        storyImageUrl,
      }
    );

    res.json({ message: "Story updated successfully." });
  } catch (error) {
    res.status(500).json({ error: "Unable to update the story." });
  }
};

const shareStory = async(req,res) => {
  try {
    const { storyHeading, storyDescription, storyCategory, slides, likesCount, storyImageUrl } = req.body;
    const storyId = req.params.storyId;

    const response= await Story.findOne({storyId});

    if (!response) {
      return res.status(404).json({ error: "Story not found." });
    }

    res.json({ storydetails: response });
  } catch (error) {
    res.status(500).json({ error: "story is safe, but figuring out how to show" });
  }
}

module.exports = {getStory, createStory, updateStory, shareStory}
