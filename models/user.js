const mongoose = require("mongoose")

const storyUsers = mongoose.model('storyUser',{
    userName: String,
    password: String,
    bookmarks: Array,
    stories: Array,
    likes: Array,
})

module.exports = storyUsers;