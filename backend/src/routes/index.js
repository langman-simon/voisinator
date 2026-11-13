import { Router } from "express";
import { default as userRouter } from "./user.js";

const router = Router();

router.use("/user", userRouter);

export default router;
