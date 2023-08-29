const express = require("express");

const router = express.Router();

const authControllers = require("../controllers/auth.controllers");
const checkUserDoesntExists = require("../middlewares/checkUserDoesntExist");
const { hashPassword } = require("../middlewares/hashPassword");

router.post("/signin", authControllers.signIn);
router.post(
  "/signup",
  checkUserDoesntExists,
  hashPassword,
  authControllers.signUp
);

module.exports = router;
