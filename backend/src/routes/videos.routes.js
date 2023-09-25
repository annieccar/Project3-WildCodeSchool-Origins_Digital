const express = require("express");

const router = express.Router();

const videosControllers = require("../controllers/videos.controllers");
const { verifyJWT } = require("../helpers/jwtHelper");
const multerThumbnail = require("../middlewares/multerThumbnail");
const multerVideo = require("../middlewares/multerVideo");

router.get("/search", videosControllers.search);
router.use(verifyJWT);
router.get("/", videosControllers.browse);
router.get("/:id", videosControllers.read);
router.put("/:id", videosControllers.edit);
router.post("/", multerVideo, videosControllers.add);
router.post("/thumbnail", multerThumbnail, videosControllers.addThumbnail);
router.delete("/:id", videosControllers.destroy);

module.exports = router;
