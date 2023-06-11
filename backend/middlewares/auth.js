const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const header = req.header("Authorization");
    if (header && header.startsWith("Bearer")) {
        try {
            const token = header.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = { id: decoded.id };
            next();
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    } else {
        return res.status(401).json({ message: "Unauthorized" });
    }
};
