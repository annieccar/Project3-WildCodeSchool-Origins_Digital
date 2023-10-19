const express = require("express");

const router = express.Router();

const categoriesControllers = require("../controllers/categories.controllers");
const checkRoles = require("../middlewares/checkRoles");

router.get("/", categoriesControllers.browse);
router.get("/:id", categoriesControllers.read);
// Get videos associatedd with a category
router.get("/:id/videos", categoriesControllers.readVideos);
router.use(checkRoles(3));
router.put("/:id", categoriesControllers.edit);
router.post("/", categoriesControllers.add);
router.delete("/:id", categoriesControllers.destroy);

module.exports = router;
