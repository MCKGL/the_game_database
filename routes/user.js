const express = require('express');
const router = express.Router();
const { verifyRegister, authJwt } = require("../middlewares");
const userController = require("../controllers/user");

router.post("/register", [verifyRegister.checkDuplicateEmail], userController.register);
router.post("/login", userController.login);

module.exports = router;