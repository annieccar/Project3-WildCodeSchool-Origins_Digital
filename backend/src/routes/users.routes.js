const express = require("express");

const router = express.Router();

const usersControllers = require("../controllers/users.controllers");

const updateUserSchema = require("../Validators/updateUser.validator");
const validateSchema = require("../middlewares/validateSchema");
const { hashPassword } = require("../middlewares/hashPassword");

router.get("/", usersControllers.browse);
router.get("/:id", usersControllers.read);
router.put(
  "/:id",
  validateSchema(updateUserSchema),
  hashPassword,
  usersControllers.edit
);
router.post("/", usersControllers.add);
router.delete("/:id", usersControllers.destroy);

module.exports = router;
