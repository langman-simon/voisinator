import * as userModel from "../models/user.js";

const getUserById = async (req, res) => {
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

const deleteUser = async (req, res) => {
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

export { getUserById, addUser, patchUser, deleteUser };
