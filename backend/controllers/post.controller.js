const User = require("../models/user.model");
const Post = require("../models/post.model");
const Comment = require("../models/comment.model");
const Schema = require("../lib/schema");
const validator = require("../middlewares/validator");
const isAuthenticated = require("../middlewares/auth");
const upload = require("../middlewares/upload");

// Get /api/post/:id
module.exports.getSinglePost = [
    isAuthenticated,
    async (req, res) => {
        const post = await Post.findById(req.params.id)
            .populate({
                path: "comments",
                options: { sort: { createdAt: -1 } },
                populate: {
                    path: "user",
                    select: "fname lname email username avatar",
                },
            })
            .populate("user");
        return res
            .status(200)
            .json({ post, message: "post created successfully" });
    },
];
// Get /api/post/me
module.exports.getMyPosts = [
    isAuthenticated,
    async (req, res) => {
        const user = await User.findById(req.user.id);
        const posts = await Post.find({ user: user._id })
            .populate({
                path: "comments",
                populate: {
                    path: "user",
                    select: "fname lname email username avatar",
                },
            })
            .populate("user", "fname lname email username avatar")
            .sort("-createdAt");
        return res.status(200).json(posts);
    },
];
// Get /api/post/all
module.exports.getAllPosts = [
    isAuthenticated,
    async (req, res) => {
        const user = await User.findById(req.user.id);
        const posts = await Post.find({
            user: { $in: [...user.following, user._id] },
        })
            .populate({
                path: "comments",
                populate: {
                    path: "user",
                    select: "fname lname email username avatar",
                },
            })
            .populate("user", "fname lname email username avatar")
            .sort("-createdAt")
            .limit(50);
        return res.status(200).json(posts);
    },
];
module.exports.uploadPhoto = [
    isAuthenticated,

    async (req, res) => {
        const photo = `/${req.file.destination}${req.file.filename}`;
        return res.status(200).json(photo);
    },
];
// POST /api/post/create
module.exports.createNewPost = [
    isAuthenticated,
    validator(Schema.PostOrComment),
    upload.single("image"),
    async (req, res) => {
        const user = await User.findById(req.user.id);
        const photo = req.file
            ? `/${req.file.destination}${req.file.filename}`
            : "";
        const post = new Post({ ...req.body, user: user._id, photo });
        await post.save();
        user.posts.addToSet(post._id);
        await user.save();
        return res
            .status(200)
            .json({ post, message: "post created successfully" });
    },
];
// DELETE /api/post/remove/:id
module.exports.removePost = [
    isAuthenticated,
    async (req, res) => {
        const user = await User.findById(req.user.id);
        const post = await Post.findById(req.params.id);
        await post.remove();
        user.posts.pull(post._id);
        await user.save();
        await Comment.deleteMany({ post: post._id });
        return res.status(200).json({ message: "post removed successfully" });
    },
];

// POST /api/post/like/:id
module.exports.like = [
    isAuthenticated,
    async (req, res) => {
        let post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(400).json({ message: "Invalid post id" });
        }
        if (post.likes.includes(req.user.id)) {
            return res
                .status(400)
                .json({ message: "you already like this post" });
        }
        post.likes.addToSet(req.user.id);
        await post.save();
        return res
            .status(201)
            .json({ post, message: "post is liked successfully" });
    },
];
// POST /api/post/unlike/:id
module.exports.unlike = [
    isAuthenticated,
    async (req, res) => {
        let post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(400).json({ message: "Invalid post id" });
        }
        if (!post.likes.includes(req.user.id)) {
            return res.status(400).json({ message: "you not like this post" });
        }
        post.likes.pull(req.user.id);
        await post.save();
        return res
            .status(201)
            .json({ post, message: "post is liked successfully" });
    },
];
