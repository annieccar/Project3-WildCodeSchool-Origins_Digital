const express = require("express");

const router = express.Router();

const itemsControllers = require("../controllers/items.controllers");

router.get("/items", itemsControllers.browse);
router.get("/items/:id", itemsControllers.read);
router.put("/items/:id", itemsControllers.edit);
router.post("/items", itemsControllers.add);
router.delete("/items/:id", itemsControllers.destroy);

module.exports = router;
