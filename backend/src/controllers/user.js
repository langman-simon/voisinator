import * as userModel from "../models/user.js";
import { pool } from "../database/db.js";
import { hashPassword, verifyPassword } from "../services/password.js";
import jwt from "jsonwebtoken";

const login = async (req, res) => {
  try {
    const { email, password } = req.val;

    const user = await userModel.readUserByEmail(pool, {
      email,
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const isValid = await verifyPassword(user.password_hash, password);

    if (!isValid) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        pseudo: user.pseudo,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      },
    );

    return res.status(200).json({
      token,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const register = async (req, res) => {
  try {
    const {
      role_id,
      pseudo,
      first_name,
      name,
      email,
      latitude,
      longitude,
      user_address,
      search_radius_km,
    } = req.val;

    let { password } = req.val;

    const userExists = await userModel.checkIfUserExistByEmail(pool, {
      email,
    });

    if (userExists) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    password = await hashPassword(password);

    await userModel.createUser(pool, {
      role_id,
      pseudo,
      first_name,
      name,
      email,
      password,
      latitude,
      longitude,
      user_address,
      search_radius_km,
    });

    return res.status(201).json({
      message: "User added successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.val;

    const user = await userModel.readUserById(pool, { id });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const patchUser = async (req, res) => {
  try {
    const {
      id,
      role_id,
      pseudo,
      first_name,
      name,
      latitude,
      longitude,
      user_address,
      search_radius_km,
    } = req.val;

    let { password } = req.val;

    const { email } = req.user;

    const user = await userModel.readUserByEmail(pool, {
      email,
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (password !== undefined && password !== null) {
      password = await hashPassword(password);
    }

    await userModel.updateUser(pool, {
      id,
      role_id,
      pseudo,
      first_name,
      name,
      password,
      latitude,
      longitude,
      user_address,
      search_radius_km,
    });

    return res.status(200).json({
      message: "User updated successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { email } = req.session;

    const user = await userModel.readUserByEmail(pool, {
      email,
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const { id } = user;
    await userModel.deleteUser(pool, { id });

    return res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export { login, register, getUser, patchUser, deleteUser };
