const User = require("../models/user.model");
const Schema = require("../lib/schema");
const validator = require("../middlewares/validator");

// POST /api/auth/register
module.exports.register = [
    validator(Schema.register),
    async (req, res) => {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ message: "User already exist" });
        }
        user = new User({ ...req.body });
        await user.save();
        return res.status(200).json({ message: "User created succcessfully" });
    },
];
// POST /api/auth/login
module.exports.login = [
    validator(Schema.login),
    async (req, res) => {
        const user = await User.findOne({ email: req.body.email }).select(
            "+password"
        );
        if (!user) {
            return res.status(400).json({ message: "Invalid email" });
        }
        const isPasswordMatch = await user.checkPassword(req.body.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Wrong password" });
        }
        const token = await user.generateToken();
        return res
            .status(200)
            .json({ token, message: "Signed in succcessfully" });
    },
];
