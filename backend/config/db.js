const mongoose = require("mongoose");

module.exports = () => {
    const realDB = process.env.MONGO_URI;
    const testDB = process.env.MONGO_URI_TEST;
    const isDevelopment = process.env.NODE_ENV === "development";
    const uri = isDevelopment ? testDB : realDB;
    try {
        mongoose.connect(uri, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            family: 4,
        });
        console.log(
            `(MONGODB) connected to ${isDevelopment ? "test" : "real"} db`
        );
    } catch (error) {
        console.log(error.message);
    }
};
