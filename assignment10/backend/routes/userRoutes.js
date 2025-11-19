import express from "express";
import {
  createUser,
  editUser,
  deleteUser,
  getAllUsers,
  getUsers,
  uploadImage,
  login
} from "../controllers/userController.js";

import { authRequired } from "../middleware/auth.js";

const router = express.Router();

// Public
router.post("/user/create", createUser);
router.post("/auth/login", login);

// Auth Required
router.put("/user/edit", authRequired, editUser);
router.delete("/user/delete", authRequired, deleteUser);
router.get("/user/getAll", authRequired, getAllUsers);
router.post("/user/uploadImage", authRequired, uploadImage);

// Assignment 10: Admin user list (no password)
router.get("/users", authRequired, getUsers);

export default router;
