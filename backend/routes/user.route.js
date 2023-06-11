const router = require("express").Router();
const Controller = require("../controllers/user.controller");

router.get("/profile", Controller.profile);
router.get("/recommended", Controller.recommendedToFollow);
router.get("/top", Controller.topUsers);
router.post("/avatar", Controller.addAvatar);
router.post("/follow/:id", Controller.follow);
router.post("/unfollow/:id", Controller.unfollow);
router.get("/:id", Controller.getUserById);
module.exports = router;
