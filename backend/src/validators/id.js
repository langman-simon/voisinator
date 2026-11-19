import vine from "@vinejs/vine";

export const idValidator = vine.create({
  id: vine.number().withoutDecimals().positive(),
});
