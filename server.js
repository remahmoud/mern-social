const hpp = require("hpp");
const cors = require("cors");
const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const connectDB = require("./backend/config/db");

const AuthRouter = require("./backend/routes/auth.route");
const UserRouter = require("./backend/routes/user.route");
const PostRouter = require("./backend/routes/post.route");
const CommentRouter = require("./backend/routes/comment.route");

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 5000;
const environment = process.env.NODE_ENV;

// middlewares
if (environment === "development") {
    app.use(morgan("dev"));
}
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/auth", AuthRouter);
app.use("/api/user", UserRouter);
app.use("/api/post", PostRouter);
app.use("/api/comment", CommentRouter);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(express.static(path.join(path.join(__dirname, "frontend/build"))));

app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "frontend/build", "index.html"));
});
app.listen(port, () => {
    console.log(`(MySocial) running on port ${port}...`);
});
