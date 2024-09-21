const express = require('express');
const router = express.Router();
const listController = require("../controllers/list");
const { auth, upload} = require("../middlewares");

router.post("/add_list/:id_user",[auth.verifyToken, auth.isAdminOrUser],  listController.create);
router.get("/lists",[auth.verifyToken, auth.isAdmin], listController.getAll);
router.get("/list/:id/:id_user",[auth.verifyToken, auth.isAdminOrUser], listController.getById);
router.get("/lists/:id_user",[auth.verifyToken, auth.isAdminOrUser], listController.getListsUser);
router.patch("/list/:id/:id_user",[auth.verifyToken, auth.isAdminOrUser], listController.update);
router.delete("/list/:id/:id_user",[auth.verifyToken, auth.isAdminOrUser], listController.delete);

module.exports = router;