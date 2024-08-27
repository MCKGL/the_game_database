const express = require('express');
const router = express.Router();
const typeController = require("../controllers/type");
const { auth } = require("../middlewares");

router.post("/add_type",[auth.verifyToken, auth.isAdmin],  typeController.create);
router.get("/types", typeController.getAll);
router.get("/type/:id", typeController.getById);
router.get('/type/name/:typeLabel', typeController.getByName);
router.patch("/type/:id",[auth.verifyToken, auth.isAdmin], typeController.update);
router.delete("/type/:id",[auth.verifyToken, auth.isAdmin], typeController.delete);

module.exports = router;