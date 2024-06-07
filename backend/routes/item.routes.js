const itemController = require('../controllers/item.controller.js');
const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth.js');

router.get("/g",checkAuth,itemController.getItems);
router.post("/s",checkAuth,itemController.saveItems);
router.put("/u/:id",checkAuth,itemController.updateItems);
router.delete("/d/:id",checkAuth,itemController.deleteItems);
module.exports = router;