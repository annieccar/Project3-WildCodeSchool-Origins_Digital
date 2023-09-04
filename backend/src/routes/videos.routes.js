const express = require("express");

const router = express.Router();

const videosControllers = require("../controllers/videos.controllers");

router.get("/search", videosControllers.search);
router.get("/", videosControllers.browse);
router.get("/:id", videosControllers.read);
router.put("/:id", videosControllers.edit);
router.post("/", videosControllers.add);
router.delete("/:id", videosControllers.destroy);

module.exports = router;
