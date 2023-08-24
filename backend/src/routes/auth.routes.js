const express = require("express");

const router = express.Router();

const authControllers = require("../controllers/auth.controllers");
const checkUserDoesntExists = require("../middlewares/checkUserDoesntExist");

router.post("/signin", authControllers.signIn);
router.post("/signup", checkUserDoesntExists, authControllers.signUp);

module.exports = router;
