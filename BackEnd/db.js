const mongoose = require("mongoose");
const mongooseURI = "mongodb://localhost:27017/inotebook";

const connectToMongo = async() => {
  await mongoose.connect(mongooseURI);
    console.log("connected to mongos currectly");
}

module.exports = connectToMongo;
