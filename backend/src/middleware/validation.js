import * as categoryValidator from "../middleware/validator/category.js";

export const categoryValidatorMiddleware = {
  categoryToAdd: async (req, res, next) => {
    try {
      req.val = await categoryValidator.category.validate(req.body);
      next();
    } catch (e) {
      res.status(400).send(e.message);
    }
  },
};
