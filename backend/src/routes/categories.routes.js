const express = require("express");

const router = express.Router();

const categoriesControllers = require("../controllers/categories.controllers");

router.get("/", categoriesControllers.browse);
router.get("/:id", categoriesControllers.read);
router.put("/:id", categoriesControllers.edit);
router.post("/", categoriesControllers.add);
router.delete("/:id", categoriesControllers.destroy);

module.exports = router;
