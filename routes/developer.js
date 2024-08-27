const express = require('express');
const router = express.Router();
const developerController = require("../controllers/developer");
const { auth } = require("../middlewares");

router.post("/add_developer",[auth.verifyToken, auth.isAdmin],  developerController.create);
router.get("/developers", developerController.getAll);
router.get("/developer/:id", developerController.getById);
router.get('/developer/name/:developerName', developerController.getByName);
router.patch("/developer/:id",[auth.verifyToken, auth.isAdmin], developerController.update);
router.delete("/developer/:id",[auth.verifyToken, auth.isAdmin], developerController.delete);

module.exports = router;