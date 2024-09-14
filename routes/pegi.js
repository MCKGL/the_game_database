const express = require('express');
const router = express.Router();
const pegiController = require("../controllers/pegi");
const { auth, upload} = require("../middlewares");

router.post("/add_pegi",[auth.verifyToken, auth.isAdmin, upload.single('imgUrl')],  pegiController.create);
router.get("/pegis", pegiController.getAll);
router.get("/pegi/:id", pegiController.getById);
router.get('/pegi/name/:pegiLabel', pegiController.getByName);
router.patch("/pegi/:id",[auth.verifyToken, auth.isAdmin, upload.single('imgUrl')], pegiController.update);
router.delete("/pegi/:id",[auth.verifyToken, auth.isAdmin], pegiController.delete);

module.exports = router;