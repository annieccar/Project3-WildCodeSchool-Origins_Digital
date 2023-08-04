const express = require("express");

const router = express.Router();

const usersControllers = require("../controllers/users.controllers");

router.get("/", usersControllers.browse);
router.get("/:id", usersControllers.read);
router.put("/:id", usersControllers.edit);
router.post("/", usersControllers.add);
router.delete("/:id", usersControllers.destroy);

module.exports = router;
