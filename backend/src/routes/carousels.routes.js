const express = require("express");

const router = express.Router();

const carouselsControllers = require("../controllers/carousels.controllers");

router.get("/", carouselsControllers.browse);
// Get all videos with their associated carousel
router.get("/videos", carouselsControllers.readVideosWithCarousel);
router.get("/:id", carouselsControllers.read);
router.put("/:id", carouselsControllers.edit);
router.post("/", carouselsControllers.add);
router.delete("/:id", carouselsControllers.destroy);

// Get videos associatedd with a caroussel
router.get("/:id/videos", carouselsControllers.readVideos);

module.exports = router;
