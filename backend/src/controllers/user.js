import * as userModel from "../models/user.js";
import { pool } from "../database/db.js";

const addUser = async (req, res) => {
  const {
    roleId,
    pseudo,
    firstName,
    name,
    email,
    password,
    city,
    searchRadiusKm,
  } = req.body;

  try {
    const user = await userModel.createUser(pool, {
      roleId,
      pseudo,
      firstName,
      name,
      email,
      password,
      city,
      searchRadiusKm,
    });
    return res.status(201).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.readUserById(pool, { id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const patchUser = async (req, res) => {
  const { id } = req.params;
  const {
    roleId,
    pseudo,
    firstName,
    name,
    email,
    password,
    city,
    searchRadiusKm,
  } = req.body;

  try {
    const userExists = await userModel.userExists(pool, {
      id,
    });
    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }
    await userModel.updateUser(pool, {
      id,
      roleId,
      pseudo,
      firstName,
      name,
      email,
      password,
      city,
      searchRadiusKm,
    });
    return res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    SQLClient = await pool.connect();
    const userExists = await userModel.userExists(pool, {
      id,
    });
    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }
    await userModel.deleteUser(pool, { id });
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { addUser, getUser, patchUser, deleteUser };
