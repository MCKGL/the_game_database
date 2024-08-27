const express = require('express');
const router = express.Router();
const hardwareController = require("../controllers/hardware");
const { auth } = require("../middlewares");

router.post("/add_hardware",[auth.verifyToken, auth.isAdmin],  hardwareController.create);
router.get("/hardwares", hardwareController.getAll);
router.get("/hardware/:id", hardwareController.getById);
router.get('/hardware/name/:hardwareName', hardwareController.getByName);
router.patch("/hardware/:id",[auth.verifyToken, auth.isAdmin], hardwareController.update);
router.delete("/hardware/:id",[auth.verifyToken, auth.isAdmin], hardwareController.delete);

module.exports = router;