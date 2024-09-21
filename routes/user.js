const express = require('express');
const router = express.Router();
const { verifyRegister, auth } = require("../middlewares");
const userController = require("../controllers/user");

router.post("/register", [verifyRegister.checkDuplicateEmail], userController.register);
router.post("/login", userController.login);
router.get("/users", [auth.verifyToken, auth.isAdmin], userController.getAllUsers);
router.get("/user/:id_user", [auth.verifyToken, auth.isAdminOrUser], userController.getUser);
router.patch('/user/:id_user', [auth.verifyToken, auth.isAdminOrUser], userController.updateUser);

module.exports = router;