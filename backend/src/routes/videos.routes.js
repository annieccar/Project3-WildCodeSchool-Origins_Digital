const express = require("express");

const router = express.Router();

const videosControllers = require("../controllers/videos.controllers");

router.get("/videos", videosControllers.browse);
router.get("/videos/:id", videosControllers.read);
router.put("/videos/:id", videosControllers.edit);
router.post("/videos", videosControllers.add);
router.delete("/videos/:id", videosControllers.destroy);

module.exports = router;
