const Post = require("../models/post.model");
const Comment = require("../models/comment.model");
const Schema = require("../lib/schema");
const validator = require("../middlewares/validator");
const isAuthenticated = require("../middlewares/auth");

// POST /api/post/comment/:postId
module.exports.addComment = [
    isAuthenticated,
    validator(Schema.PostOrComment),
    async (req, res) => {
        let post = await Post.findById(req.params.postId);
        if (!post) {
            return res.status(400).json({ message: "Invalid post id" });
        }
        const comment = new Comment({
            ...req.body,
            post: post._id,
            user: req.user.id,
        });
        post.comments.addToSet(comment._id);
        await comment.save();
        await post.save();
        return res
            .status(201)
            .json({ comment, message: "commented successfully" });
    },
];
// DELETE /api/post/comment/:postId/:commentId
module.exports.removeComment = [
    isAuthenticated,
    async (req, res) => {
        const post = await Post.findById(req.params.postId);
        const comment = await Comment.findById(req.params.commentId);
        post.comments.pull(comment._id);
        await comment.remove();
        await post.save();
        return res
            .status(200)
            .json({ post, message: "comment removed successfully" });
    },
];
