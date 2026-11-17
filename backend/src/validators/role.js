import vine from "@vinejs/vine";

const createRoleSchema = vine.create({
  label: vine.string().trim().maxLength(30),
});

const patchRoleSchema = vine.create({
  label: vine.string().trim().maxLength(30),
});

export { createRoleSchema, patchRoleSchema };
