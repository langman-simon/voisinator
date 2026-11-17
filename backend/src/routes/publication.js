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
import { createPublicationValidator, patchPublicationValidator, titleValidator} from "../validators/publication.js";
import { idValidator } from "../validators/id.js";
import { validate } from "../middlewares/validations/validate.js";

const router = Router();

router.get("/:id",validate(idValidator, "params"), findPublicationById);
router.get("/:categoryId",validate(idValidator, "params"), findPublicationByCategoryId);
router.get("/:title",validate(titleValidator), findPublicationsByTitle);
router.get("/:latitude/:longitude/:kmRadius", findPublicationsByRadius);
router.get("/:userId",validate(idValidator, "params"), findPublicationByUserId);
router.post("/",validate(createPublicationValidator, "body"),addPublication);
router.patch("/id",validate(idUserValidator),validate(patchPublicationValidator, "body"), patchPublication);
router.delete("/:id",validate(idValidator, "params"), deletePublication);

export default router;