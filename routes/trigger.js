const express = require('express');
const router = express.Router();
const triggerController = require("../controllers/trigger");
const { auth } = require("../middlewares");

router.post("/add_trigger",[auth.verifyToken, auth.isAdmin],  triggerController.create);
router.get("/triggers", triggerController.getAll);
router.get("/trigger/:id", triggerController.getById);
router.get('/trigger/name/:triggerLabel', triggerController.getByName);
router.patch("/trigger/:id",[auth.verifyToken, auth.isAdmin], triggerController.update);
router.delete("/trigger/:id",[auth.verifyToken, auth.isAdmin], triggerController.delete);

module.exports = router;