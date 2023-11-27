import express from "express";
import {
  registerUser,
  loginUser,
  deleteProfile,
  editCredentials,
} from "./user.service.js";
import { isUser } from "../auth/auth.middleware.js";

const router = express.Router();

// register user
router.post("/user/register", registerUser);

// login user
router.post("/user/login", loginUser);

// edit user data
router.put("/user/edit", isUser, editCredentials);

// delete own account
router.delete("/user/delete/account", isUser, deleteProfile);
export default router;
