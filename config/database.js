const mongoose = require("mongoose")

mongoose.set("strictQuery", true);

const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_SERVER, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`MongoDB connected with server ${data.connection.host}`);
    })
    .catch((error) => {
      console.log("DB connection failed", error);
    });
};

module.exports = connectDB;