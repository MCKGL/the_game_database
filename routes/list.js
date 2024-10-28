const express = require('express');
const router = express.Router();
const listController = require("../controllers/list");
const { auth} = require("../middlewares");

router.post("/add_list/:id_user",[auth.verifyToken, auth.isAdminOrOwner],  listController.create);
router.get("/lists",[auth.verifyToken, auth.isAdmin], listController.getAll);
router.get("/list/:id/:id_user",[auth.verifyToken, auth.isAdminOrOwner], listController.getById);
router.get("/lists/:id_user",[auth.verifyToken, auth.isAdminOrOwner], listController.getListsUser);
router.patch("/list/add_game/:id/:id_user",[auth.verifyToken, auth.isAdminOrOwner], listController.add);
router.patch("/list/remove_game/:id/:id_user",[auth.verifyToken, auth.isAdminOrOwner], listController.remove);
router.patch("/list/:id/:id_user",[auth.verifyToken, auth.isAdminOrOwner], listController.update);
router.delete("/list/:id/:id_user",[auth.verifyToken, auth.isAdminOrOwner], listController.delete);

module.exports = router;