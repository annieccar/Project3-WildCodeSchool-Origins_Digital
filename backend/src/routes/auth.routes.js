const express = require("express");

const router = express.Router();

const validateSchema = require("../middlewares/validateSchema");
const loginSchema = require("../Validators/login.validator");
const checkUserExistsByEmailWithPassword = require("../middlewares/checkUserExistsByEmailWithPassword");
const authControllers = require("../controllers/auth.controllers");
const checkUserDoesntExists = require("../middlewares/checkUserDoesntExist");
const { hashPassword } = require("../middlewares/hashPassword");
const createUserSchema = require("../Validators/createUser.validator");
const { verifyUser } = require("../helpers/jwtHelper");

router.post(
  "/login",
  validateSchema(loginSchema),
  checkUserExistsByEmailWithPassword,
  authControllers.login
);
router.post(
  "/signup",
  validateSchema(createUserSchema),
  checkUserDoesntExists,
  hashPassword,
  authControllers.signUp
);
router.get("/logout", authControllers.logout);

router.get("/verify", verifyUser, authControllers.verifyUser);

module.exports = router;
