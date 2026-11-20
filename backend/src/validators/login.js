import vine from "@vinejs/vine";

export const loginValidator = vine.create({
  email: vine.string().email().maxLength(100),
  password: vine.string().trim().minLength(1).maxLength(18),
});
