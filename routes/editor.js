const express = require('express');
const router = express.Router();
const editorController = require("../controllers/editor");
const { auth } = require("../middlewares");

router.post("/add_editor",[auth.verifyToken, auth.isAdmin],  editorController.create);
router.get("/editors", editorController.getAll);
router.get("/editor/:id", editorController.getById);
router.get('/editor/name/:editorName', editorController.getByName);
router.patch("/editor/:id",[auth.verifyToken, auth.isAdmin], editorController.update);
router.delete("/editor/:id",[auth.verifyToken, auth.isAdmin], editorController.delete);

module.exports = router;