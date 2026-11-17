import { errors } from "@vinejs/vine";

export const validate = (validator, type) => {
  return async (req, res, next) => {
    try {
      let validatedData;
      if (type === "params") {
        validatedData = await validator.validate(req.params);
      }
      if (type === "body") {
        validatedData = await validator.validate(req.body);
      }
      req.val = {
        ...(req.val ?? {}),
        ...validatedData,
      };
      next();
    } catch (error) {
      if (error instanceof errors.E_VALIDATION_ERROR) {
        return res.status(400).json({ errors: error.messages });
      }

      next(error);
    }
  };
};
