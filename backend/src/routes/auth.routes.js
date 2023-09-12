const express = require("express");

const router = express.Router();

const authControllers = require("../controllers/auth.controllers");
const checkUserDoesntExists = require("../middlewares/checkUserDoesntExist");
const { hashPassword } = require("../middlewares/hashPassword");
const validateSchema = require("../middlewares/validateSchema");
const createUserSchema = require("../Validators/createUser.validator");
const loginUserSchema = require("../Validators/loginUser.validator");

router.post("/signin", validateSchema(loginUserSchema), authControllers.signIn);
router.post(
  "/signup",
  validateSchema(createUserSchema),
  checkUserDoesntExists,
  hashPassword,
  authControllers.signUp
);

module.exports = router;
