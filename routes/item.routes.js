//Import
const router = require("express").Router();
const itemController = require("../controllers/item.controllers");

//Routing
//Route item
router.post("/", itemController.addIdem);
router.get("/", itemController.getItemAll);
router.get("/:id", itemController.getItem);
router.put("/:id", itemController.updateItem);
router.delete("/:id", itemController.deleteItem);

//export all routes
module.exports = router;
