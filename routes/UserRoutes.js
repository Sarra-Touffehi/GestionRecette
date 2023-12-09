import express from 'express';
const router = express.Router();

import {register,login,updateProfile,getAllUsers,getUserById} from  "../controllers/userController.js";
const app=express()

router.route("/")
    .get(getAllUsers);

router.route("/register")
.post(register);

router.route("/login")
.post(login);

router.route("/:userId")
.put(updateProfile)
.get(getUserById)


export default router;