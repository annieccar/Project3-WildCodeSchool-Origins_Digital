const express = require("express");

const router = express.Router();

const carouselsControllers = require("../controllers/carousels.controllers");

router.get("/", carouselsControllers.browse);
router.get("/:id", carouselsControllers.read);
router.put("/:id", carouselsControllers.edit);
router.post("/", carouselsControllers.add);
router.delete("/:id", carouselsControllers.destroy);

module.exports = router;
