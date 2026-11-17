import vine from "@vinejs/vine";

const categorySchema = vine.object({
  label: vine.string().trim(),
  icon: vine.string().trim(),
  color: vine.string().trim(),
});

export const category = vine.create(categorySchema);
