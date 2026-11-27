import vine from "@vinejs/vine";

const createPublicationValidator = vine.create({
  userId: vine.number().withoutDecimals().positive(),
  categoryId: vine.number().withoutDecimals().positive(),
  title: vine.string().trim().maxLength(100).ascii(),
  description: vine.string().trim().maxLength(255).ascii(),
  eventStartAt: vine.date({formats: ['iso8601']}),
  eventEndAt: vine.date({formats: ['iso8601']}),
  eventAddress: vine.string().trim().maxLength(255),
  maxParticipants: vine.number().withoutDecimals().positive().min(1),
  coverImage: vine.nativeFile().maxSize(1024 * 1024).mimeTypes(['image/png', 'image/jpeg'])
});

const patchPublicationValidator = vine.create({
  userId: vine.number().withoutDecimals().positive().optional(),
  categoryId: vine.number().withoutDecimals().positive().optional(),
  title: vine.string().trim().maxLength(100).ascii().optional(),
  description: vine.string().trim().maxLength(255).ascii().optional(),
  eventStartAt: vine.date({formats: ['iso8601']}).optional(),
  eventEndAt: vine.date({formats: ['iso8601']}).optional(),
  eventAddress: vine.string().trim().maxLength(255).optional(),
  maxParticipants: vine.number().withoutDecimals().positive().min(1).optional(),
  coverImage: vine.nativeFile().maxSize(1024 * 1024).mimeTypes(['image/png', 'image/jpeg']).optional()
});

const titleValidator = vine.create({
  title: vine.string().trim().maxLength(100).ascii().optional(),
});

export { createPublicationValidator, patchPublicationValidator, titleValidator };