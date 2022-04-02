import express  from "express";
import { getProfile, signIn, signUp, updateImage } from "../Controllers/users.js";
import { upload } from "../Middleware/upload.js";
const router = express.Router();

router.post("/",signUp);
router.post("/signIn",signIn);
router.get("/:id",getProfile);
router.patch("/image/:id",upload.single("profilePicture"),updateImage);

export default router;