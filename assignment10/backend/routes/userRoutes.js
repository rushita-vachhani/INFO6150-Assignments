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
import { body } from "express-validator";

const router = express.Router();

// ----------------------------
// PUBLIC ROUTES
// ----------------------------

// CREATE USER (admin or employee)
router.post(
  "/user/create",
  [
    body("fullName").notEmpty().withMessage("Full name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").notEmpty().withMessage("Password is required"),
    body("type")
      .isIn(["admin", "employee"])
      .withMessage("Type must be admin or employee"),
  ],
  createUser
);

// LOGIN
router.post(
  "/auth/login",
  [
    body("email").isEmail().withMessage("Email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  login
);

// ----------------------------
// PROTECTED ROUTES
// ----------------------------

// EDIT USER
router.put(
  "/user/edit",
  authRequired,
  [
    body("email").isEmail().withMessage("Valid email is required"),
    body("fullName").optional().isString(),
    body("password").optional().isString(),
  ],
  editUser
);

// DELETE USER
router.delete(
  "/user/delete",
  authRequired,
  [body("email").isEmail().withMessage("Valid email is required")],
  deleteUser
);

// GET ALL USERS (with password — assignment only)
router.get("/user/getAll", authRequired, getAllUsers);

// UPLOAD IMAGE
router.post(
  "/user/uploadImage",
  authRequired,
  [body("email").isEmail().withMessage("Valid email is required")],
  uploadImage
);

// ADMIN USER LIST (no password)
router.get("/users", authRequired, getUsers);

export default router;
