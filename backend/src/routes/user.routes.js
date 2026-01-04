const router = require("express").Router();
const jwtAuth = require("../middlewares/jwt.middleware");
const ctrl = require("../controllers/user.controller");

router.get("/", jwtAuth, ctrl.getUsers);
router.get("/:id", jwtAuth, ctrl.getUserById);
router.post("/", jwtAuth, ctrl.createUser);
router.put("/:id", jwtAuth, ctrl.updateUser);
router.delete("/:id", jwtAuth, ctrl.deleteUser);

module.exports = router;
