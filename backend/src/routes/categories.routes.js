const express = require("express");

const router = express.Router();

const categoriesControllers = require("../controllers/categories.controllers");

router.get("/categories", categoriesControllers.browse);
router.get("/categories/:id", categoriesControllers.read);
router.put("/categories/:id", categoriesControllers.edit);
router.post("/categories", categoriesControllers.add);
router.delete("/categories/:id", categoriesControllers.destroy);

module.exports = router;
