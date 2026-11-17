import { hash, verify } from "argon2";

const hashPassword = (password) => {
  try {
    const password_hashed = hash(password);
  } catch (error) {}
};

const verifyPassword = (password_hash, password) => {
  try {
    const verifyPassword = verify(password_hash, password);
  } catch (error) {}
};
