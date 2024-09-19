const express = require('express');
const router = express.Router();
const {auth} = require("../middlewares");
const releaseDateController = require('../controllers/releaseDate');

router.post("/add_release_date",[auth.verifyToken, auth.isAdmin], releaseDateController.create);
router.get("/release_dates", releaseDateController.getAll);
router.get("/release_date/:id", releaseDateController.getById);
router.patch("/release_date/:id",[auth.verifyToken, auth.isAdmin], releaseDateController.update);
router.delete("/release_date/:id",[auth.verifyToken, auth.isAdmin], releaseDateController.delete);

module.exports = router;