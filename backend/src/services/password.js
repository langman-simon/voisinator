import { hash, verify } from "argon2";

const hashPassword = async (password) => {
  try {
    const hashed = await hash(password);
    return hashed;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const verifyPassword = async (password_hash, password) => {
  try {
    const verified = await verify(password_hash, password);
    return verified;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { hashPassword, verifyPassword };
