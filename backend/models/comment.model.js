const mongoose = require("mongoose");

const Comment = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
        },
        text: {
            type: String,
            reuired: true,
        },
        photo: {
            type: String,
        },
    },
    { timestamps: true, versionKey: false }
);
module.exports = mongoose.model("Comment", Comment);
