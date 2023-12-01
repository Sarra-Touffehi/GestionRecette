import express from 'express';

const router = express.Router();

import {register,login,updateProfile} from  "../controllers/userController.js";
const app=express()


router.route("/register")
.post(register);

router.route("/login")
.post(login);

router.route("/:userId")
.put(updateProfile);


export default router;