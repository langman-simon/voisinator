import * as userModel from "../models/user.js";
import { pool } from "../database/db.js";

const addUser = async (req, res) => {
  const {
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
  } = req.body;

  try {
    const user = await userModel.createUser(pool, {
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
  } = req.body;

  try {
    const userExists = await userModel.checkIfUserExist(pool, {
      id,
    });
    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }
    await userModel.updateUser(pool, {
      id,
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
    return res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const userExists = await userModel.checkIfUserExist(pool, {
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
