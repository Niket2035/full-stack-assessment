import express, { RequestHandler } from "express";
import { CreateUser, LoginUser, LogoutUser } from "../controllers/authController";


const router = express.Router();

router.post("/api/create", CreateUser as unknown as RequestHandler);
router.post("/api/login", LoginUser as unknown as RequestHandler);
router.get("/api/logout", LogoutUser as unknown as RequestHandler);


export default router;