const express = require("express");

const router = express.Router();

const carouselsControllers = require("../controllers/carousels.controllers");

router.get("/carousels", carouselsControllers.browse);
router.get("/carousels/:id", carouselsControllers.read);
router.put("/carousels/:id", carouselsControllers.edit);
router.post("/carousels", carouselsControllers.add);
router.delete("/carousels/:id", carouselsControllers.destroy);

module.exports = router;
