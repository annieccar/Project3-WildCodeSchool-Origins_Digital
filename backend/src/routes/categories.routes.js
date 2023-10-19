const express = require("express");

const router = express.Router();

const categoriesControllers = require("../controllers/categories.controllers");
const { verifyJWT } = require("../helpers/jwtHelper");
const checkRoles = require("../middlewares/checkRoles");

router.get("/", categoriesControllers.browse);
router.get("/:id", categoriesControllers.read);
// Get videos associated with a category
router.get("/:id/videos", categoriesControllers.readVideos);

router.use(verifyJWT);
router.use(checkRoles(3));
router.put("/:id", categoriesControllers.edit);
router.post("/", categoriesControllers.add);
router.delete("/:id", categoriesControllers.destroy);

module.exports = router;
