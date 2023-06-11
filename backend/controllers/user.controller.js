const User = require("../models/user.model");
const isAuthenticated = require("../middlewares/auth");
const upload = require("../middlewares/upload");

// GET /api/user/profile
module.exports.profile = [
    isAuthenticated,
    async (req, res) => {
        const user = await User.findById(req.user.id).populate({
            path: "posts",
            options: { sort: { createdAt: -1 } },
            populate: {
                path: "user",
                select: "fname lname email username avatar",
            },
        });
        if (!user) {
            return res.status(400).json({ message: "Invalid id" });
        }
        return res.status(200).json(user);
    },
];
// GET /api/user/:id
module.exports.getUserById = [
    isAuthenticated,
    async (req, res) => {
        const user = await User.findById(req.params.id).populate({
            path: "posts",
            options: { sort: { createdAt: -1 } },
            populate: {
                path: "user",
                select: "fname lname email username avatar",
            },
        });
        if (!user) {
            return res.status(400).json({ message: "Invalid id" });
        }
        return res.status(200).json(user);
    },
];
// GET /api/user/recommended
module.exports.recommendedToFollow = [
    isAuthenticated,
    async (req, res) => {
        const user = await User.findById(req.user.id);
        const blocked = [...user.following, user._id];
        let users = await User.aggregate([
            { $match: { _id: { $nin: blocked } } },
            {
                $project: {
                    followers_count: { $size: "$followers" },
                    posts_count: { $size: "$posts" },
                },
            },
            { $sort: { followers_count: -1, posts_count: -1 } },
        ]).limit(5);
        users = await User.populate(users, { path: "_id" });
        users = users.map((user) => user._id);
        return res.status(200).json(users);
    },
];
// GET /api/user/recommended
module.exports.topUsers = [
    isAuthenticated,
    async (req, res) => {
        let users = await User.aggregate([
            {
                $project: {
                    followers_count: { $size: "$followers" },
                    posts_count: { $size: "$posts" },
                },
            },
            {
                $sort: { followers_count: -1, posts_count: -1 },
            },
        ]).limit(5);
        users = await User.populate(users, { path: "_id" });
        users = users.map((user) => user._id);
        return res.status(200).json(users);
    },
];
// GET /api/user/avatar
module.exports.addAvatar = [
    isAuthenticated,
    upload.single("avatar"),
    async (req, res) => {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(400).json({ message: "Invalid id" });
        }
        const avatar = `/${req.file.destination}${req.file.filename}`;
        user.avatar = avatar;
        await user.save();
        return res.status(200).json({ avatar: user.avatar });
    },
];
// POST /api/user/follow/:id
module.exports.follow = [
    isAuthenticated,
    async (req, res) => {
        let current = await User.findById(req.user.id);
        let user = await User.findById(req.params.id);
        if (!user) {
            return res.status(400).json({ message: "Invalid id" });
        }
        if (user.followers.includes(current._id.toString())) {
            return res
                .status(400)
                .json({ message: "you already follow this user" });
        }
        user.followers.push(current._id);
        current.following.push(user._id);
        await user.save();
        await current.save();
        return res.status(201).json({ message: "user followed successfully" });
    },
];
// POST /api/user/unfollow/:id
module.exports.unfollow = [
    isAuthenticated,
    async (req, res) => {
        let current = await User.findById(req.user.id);
        let user = await User.findById(req.params.id);
        if (!user) {
            return res.status(400).json({ message: "Invalid id" });
        }
        if (!user.followers.includes(current._id.toString())) {
            return res
                .status(400)
                .json({ message: "you already unfollow this user" });
        }
        user.followers.pull(current._id);
        current.following.pull(user._id);
        await user.save();
        await current.save();
        return res
            .status(200)
            .json({ message: "user unfollowed successfully" });
    },
];
