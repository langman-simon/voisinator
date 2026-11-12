import * as userModel from "../models/user.js";

// wiat for validation to be implemented.

export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.findUserById(req.app.locals.SQLClient, { id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const userExists = await userModel.userExists(req.app.locals.SQLClient, {
      id,
    });
    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }
    await userModel.deleteUser(req.app.locals.SQLClient, { id });
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateUser = async (req, res) => {
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
    const userExists = await userModel.userExists(req.app.locals.SQLClient, {
      id,
    });
    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }
    await userModel.updateUser(req.app.locals.SQLClient, {
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

export const createUser = async (req, res) => {
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
    const user = await userModel.createUser(req.app.locals.SQLClient, {
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

export const getUserByEmail = async (req, res) => {
  const { email } = req.params;
  try {
    const user = await userModel.findUserByEmail(req.app.locals.SQLClient, {
      email,
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserByPseudo = async (req, res) => {
  const { pseudo } = req.params;
  try {
    const user = await userModel.findUserByPseudo(req.app.locals.SQLClient, {
      pseudo,
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
