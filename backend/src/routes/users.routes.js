const express = require("express");

const router = express.Router();

const usersControllers = require("../controllers/users.controllers");

const createUserSchema = require("../Validators/createUser.validator");
const updateUserSchema = require("../Validators/updateUser.validator");
const validateSchema = require("../middlewares/validateSchema");
const { hashPassword } = require("../middlewares/hashPassword");
const checkUserDoesntExists = require("../middlewares/checkUserDoesntExist");
const checkRoles = require("../middlewares/checkRoles");
const fileUpload = require("../middlewares/multer");

router.get("/", checkRoles(3), usersControllers.browse);
router.get("/usertypes", checkRoles(3), usersControllers.browseUsertypes);
router.get("/csv", checkRoles(3), usersControllers.usersToCSV);
router.get("/:id", usersControllers.read);
router.put(
  "/:id",
  fileUpload,
  validateSchema(updateUserSchema),
  hashPassword,
  usersControllers.edit
);
router.put("/:id/admin", checkRoles(3), usersControllers.editByAdmin);
router.put("/:id/usertype", usersControllers.editUserTypeID);
router.post(
  "/",
  checkRoles(3),
  validateSchema(createUserSchema),
  checkUserDoesntExists,
  hashPassword,
  usersControllers.add
);
router.delete("/:id", checkRoles(3), usersControllers.destroy);

module.exports = router;
