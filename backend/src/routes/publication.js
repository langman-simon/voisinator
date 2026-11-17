import { Router } from "express";
import {
  addPublication,
  patchPublication,
  deletePublication,
  findPublicationByCategoryId,
  findPublicationById,
  findPublicationsByRadius,
  findPublicationsByTitle,
  findPublicationByUserId
} from "../controllers/publication.js";

const router = Router();

router.get("/:id", findPublicationById);
router.get("/:categoryId", findPublicationByCategoryId);
router.get("/:title", findPublicationsByTitle);
router.get("/:latitude/:longitude/:kmRadius", findPublicationsByRadius);
router.get("/:userId", findPublicationByUserId);
router.post("/", addPublication);
router.patch("/id", patchPublication);
router.delete("/:id", deletePublication);

export default router;