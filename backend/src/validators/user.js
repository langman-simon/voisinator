import vine from "@vinejs/vine";

const createUserValidator = vine.create({
  role_id: vine.number().withoutDecimals().positive(),
  pseudo: vine.string().trim().maxLength(50).ascii(),
  first_name: vine.string().trim().maxLength(50),
  name: vine.string().trim().maxLength(50),
  email: vine.string().email().maxLength(100),
  password: vine
    .string()
    .trim()
    .minLength(7)
    .maxLength(18)
    .confirmed({ as: "password_confirmation" }),
  longitude: vine.number().range([-180, 180]),
  latitude: vine.number().range([-90, 90]),
  user_address: vine.string().maxLength(255),
  search_radius_km: vine.number().min(1).max(30),
});

const patchUserValidator = vine.create({
  role_id: vine.number().withoutDecimals().positive(),
  pseudo: vine.string().trim().maxLength(50).ascii(),
  first_name: vine.string().trim().maxLength(50),
  name: vine.string().trim().maxLength(50),
  password: vine
    .string()
    .trim()
    .minLength(8)
    .maxLength(255)
    .confirmed({ as: "password_confirmation" }),
  longitude: vine.number().range([-180, 180]),
  latitude: vine.number().range([-90, 90]),
  user_address: vine.string().maxLength(255),
  search_radius_km: vine.number().min(1).max(30),
});

export { createUserValidator, patchUserValidator };
