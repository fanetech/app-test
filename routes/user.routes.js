//Import
const router = require("express").Router();
const authControllers = require("../controllers/auth.controllers");
const userControllers = require("../controllers/user.controller");

//Routing
//Route auth
router.post("/register", authControllers.signUp);

//Route users
router.get("/", userControllers.getAllUsers);
router.get("/:id", userControllers.getUserInfo);
router.put("/:id", userControllers.updateUser);
router.put("/admin/:id", userControllers.addAdmin);
router.delete("/:id", userControllers.deleteUser);

//export all routes
module.exports = router;
