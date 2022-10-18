const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/token");

const {signup,signin,updateDetails,getAllUser,deleteUser} = require('../controllers/user');

router.post("/signup",signup);
router.post("/signin",signin);
router.put("/update/:id",verifyToken,updateDetails);
router.get("/getAllUser",verifyToken,getAllUser);
router.delete("/delete/:id",verifyToken,deleteUser);
module.exports = router;