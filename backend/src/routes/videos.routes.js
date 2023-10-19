const express = require("express");

const router = express.Router();

const videosControllers = require("../controllers/videos.controllers");
const { verifyJWT } = require("../helpers/jwtHelper");
const multerThumbnail = require("../middlewares/multerThumbnail");
const multerVideo = require("../middlewares/multerVideo");
const checkRoles = require("../middlewares/checkRoles");

router.get("/search", videosControllers.search);
router.use(verifyJWT);
router.use(checkRoles(2, 3));
router.get("/", videosControllers.browse);
router.get("/:id", videosControllers.read);
router.use(checkRoles(3));
router.put("/category", videosControllers.editCategory);
router.put("/:id", videosControllers.edit);
router.post("/", multerVideo, videosControllers.add);
router.post("/thumbnail", multerThumbnail, videosControllers.addThumbnail);
router.delete("/:id", videosControllers.destroy);

module.exports = router;
