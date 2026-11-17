export const idValidator = vine.create({
  id: vine.number().withoutDecimals().positive(),
});
