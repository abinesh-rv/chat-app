const router = require("express").Router();
const {Register, Login, setAvatar, getAllUsers} = require("../controllers/userControls")

router.post("/register",Register)
router.post("/login",Login)
router.patch("/setAvatar/:id",setAvatar)
router.get("/getAllUsers/:id",getAllUsers)

module.exports = router