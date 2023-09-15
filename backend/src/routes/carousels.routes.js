const express = require("express");

const router = express.Router();

const carouselsControllers = require("../controllers/carousels.controllers");

router.get("/", carouselsControllers.browse);
router.get("/:id", carouselsControllers.readCarouselVideos);
router.put("/:id", carouselsControllers.edit);
router.post("/", carouselsControllers.add);
router.delete("/:id", carouselsControllers.destroy);

// Get videos associatedd with a caroussel
router.get("/:id/videos", carouselsControllers.readVideos);

module.exports = router;
