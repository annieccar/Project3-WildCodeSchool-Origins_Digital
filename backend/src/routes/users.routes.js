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

router.get("/usertypes", usersControllers.browseUsertypes);
router.get("/:id", usersControllers.read);
router.put(
  "/:id",
  fileUpload,
  validateSchema(updateUserSchema),
  hashPassword,
  usersControllers.edit
);

router.use(checkRoles(3));
router.get("/", usersControllers.browse);
router.get("/csv", usersControllers.usersToCSV);
router.put("/:id/admin", usersControllers.editByAdmin);
router.put("/:id/usertype", usersControllers.editUserTypeID);
router.post(
  "/",
  validateSchema(createUserSchema),
  checkUserDoesntExists,
  hashPassword,
  usersControllers.add
);
router.delete("/:id", usersControllers.destroy);

module.exports = router;
