const express = require("express");

const router = express.Router();

const carouselsControllers = require("../controllers/carousels.controllers");
const checkCarouselDoesntExists = require("../middlewares/checkCarouselDoesntExist");

router.get("/", carouselsControllers.browse);
router.get("/:id", carouselsControllers.readCarouselVideos);
router.put("/:id", carouselsControllers.edit);
router.post("/jointure", carouselsControllers.addJointure);
router.post("/", checkCarouselDoesntExists, carouselsControllers.add);
router.delete("/jointure", carouselsControllers.removeJointure);
router.delete("/:id", carouselsControllers.destroy);

// Get videos associated with a caroussel
router.get("/:id/videos", carouselsControllers.readVideos);

module.exports = router;
