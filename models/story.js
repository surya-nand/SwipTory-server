const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
  unique_id: String,
  storyHeading: String,
  storyDescription: String,
  likesCount: Number,
  storyCategory: String,
  storyImageUrl: String,
  slides: [
    {
      slide_heading: { type: String, required: true },
      slide_description: { type: String, required: true },
      slide_imageurl: { type: String, required: true },
      slide_category: { type: String, required: true}
    },
  ],
});


const Story = mongoose.model('Story', storySchema);
module.exports = Story;