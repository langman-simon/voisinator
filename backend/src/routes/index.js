import { Router } from "express";
import { default as userRouter } from "./user.js";
import {default as publicationRouter} from "./publication.js";

const router = Router();

router.use("/user", userRouter);
router.use("/publication", publicationRouter);

export default router;
