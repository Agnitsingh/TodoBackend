import express from "express";
import {getMyProfile, login, logout, register} from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";
const router = express.Router();

//router.get("/all", getAllUsers);

router.post("/new", register);
router.post("/login", login);
router.get("/logout", logout);

// router.get("/userid/special", specialFunc);

// router
//     .route("/userid/:id")
//     .get(getUserDetails)
//     .put(updateUserDetails)
//     .delete(deleteUserDetails);

 router.get("/me", isAuthenticated,getMyProfile);

// router.put("/userid/:id", updateUserDetails);

//  router.delete("/userid/:id", deleteUserDetails);

export default router;

// MVC - Model View Controller