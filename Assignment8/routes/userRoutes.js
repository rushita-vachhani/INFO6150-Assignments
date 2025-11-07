import { Router } from "express";
import { createUser, editUser, deleteUser, getAllUsers, uploadImage, login } from "../controllers/userController.js";
import { createUserValidation, editUserValidation, loginValidation } from "../middleware/validate.js";
import { uploadSingleImage } from "../middleware/upload.js";

const router = Router();

router.post("/user/create", createUserValidation, createUser);
router.put("/user/edit", editUserValidation, editUser);
router.delete("/user/delete", deleteUser);
router.get("/user/getAll", getAllUsers);
router.post("/user/uploadImage", uploadSingleImage, uploadImage);

router.post("/auth/login", loginValidation, login);

export default router;
