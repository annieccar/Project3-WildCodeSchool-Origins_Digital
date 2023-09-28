const express = require("express");

const router = express.Router();

const itemsControllers = require("../controllers/items.controllers");

router.get("/", itemsControllers.browse);
router.get("/:id", itemsControllers.read);
router.put("/:id", itemsControllers.edit);
router.post("/", itemsControllers.add);
router.delete("/:id", itemsControllers.destroy);

module.exports = router;
