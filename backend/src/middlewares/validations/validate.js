import { errors } from "@vinejs/vine";

export const validate = (validator) => {
  return async (req, res, next) => {
    try {
      req.val = await validator.validate(req.body);
      next();
    } catch (e) {
      if (e instanceof errors.E_VALIDATION_ERROR) {
        return res.status(400).json({ errors: e.messages });
      }
      next(error);
    }
  };
};
