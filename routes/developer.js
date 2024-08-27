const express = require('express');
const router = express.Router();
const developerController = require("../controllers/developer");
const { auth } = require("../middlewares");

router.post("/add_developer",[auth.verifyToken, auth.isAdmin],  developerController.createDeveloper);
router.get("/developers", developerController.getAllDevelopers);
router.get("/developer/:id", developerController.getDeveloperById);
router.get('/developer/name/:developerName', developerController.getDeveloperByName);
router.patch("/developer/:id",[auth.verifyToken, auth.isAdmin], developerController.updateDeveloper);
router.delete("/developer/:id",[auth.verifyToken, auth.isAdmin], developerController.deleteDeveloper);

module.exports = router;