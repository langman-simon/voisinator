import vine from "@vinejs/vine";

export const loginValidator = vine.create({
  email: vine.string().email().maxLength(100),
  password: vine.string().trim().minLength(7).maxLength(18),
});
