 const {getStory, createStory, updateStory, shareStory} = require('../controllers/storyController')

 const storyRoutes = (app) => {
    app.route("/api/stories").get(getStory)
    app.route("/api/stories").post(createStory)
    app.route("/api/stories/:storyId").put(updateStory)
    app.route("/api/stories/:storyId").get(shareStory)
 }

 module.exports = {storyRoutes}