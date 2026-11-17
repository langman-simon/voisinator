import * as categoryValidator from "../validators/category.js";

export const categoryValidatorMiddleware = {
  categoryToAdd: async (req, res, next) => {
    try {
      req.val = await categoryValidator.createCategorySchema.validate(req.body);
      next();
    } catch (e) {
      res.status(400).send(e.message);
    }
  },
  categoryToPatch: async (req, res, next) => {
    try {
      req.val = await categoryValidator.patchCategorySchema.validate(req.body);
      next();
    } catch (e) {
      res.status(400).send(e.message);
    }
  },
};
