const router = require("express").Router();
const Controller = require("../controllers/comment.controller");

router.post("/:postId", Controller.addComment);
router.delete("/:postId/:commentId", Controller.removeComment);

module.exports = router;
