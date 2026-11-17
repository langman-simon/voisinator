import vine from "@vinejs/vine";

const createCategorySchema = vine.create({
  label: vine.string().trim().maxLength(50),
  icon: vine
    .nativeFile()
    .maxSize(1024 * 1024)
    .mimeType(["image/png", "image/svg+xml"]),
  color: vine.string().trim().hexCode(),
});

const patchCategorySchema = vine.create({
  label: vine.string().trim().maxLength(50).optional(),
  icon: vine
    .nativeFile()
    .maxSize(1024 * 1024)
    .mimeType(["image/png", "image/svg+xml"])
    .optional(),
  color: vine.string().hexCode().optional(),
});

export { createCategorySchema, patchCategorySchema };
