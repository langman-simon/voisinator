import * as RoleModel from "../models/role.js";

export const getAllRoles = async (req, res) => {
  try {
    const roles = await RoleModel.readRoles(req.pool);
    res.status(200).json(roles);
  } catch (error) {
    res.status(500);
  }
};

export const getRole = async (req, res) => {
  try {
    const role = await RoleModel.readRole(req.pool, req.params.id);
    if (!role) {
      return res.status(404).json({ error: "Role not found" });
    }
    res.status(200).json(role);
  } catch (error) {
    res.status(500);
  }
};

export const createRole = async (req, res) => {
  try {
    const { label } = req.body;

    if (!typeof label === "string" || !label.trim()) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const role = await RoleModel.createRole(req.pool, label.trim());
    res.status(201).json(role);
  } catch (error) {
    res.status(500);
  }
};

export const updateRole = async (req, res) => {
  try {
    const { label } = req.body;

    if (!typeof label === "string" || !label.trim()) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const role = await RoleModel.updateRole(
      req.pool,
      req.params.id,
      label.trim(),
    );
    if (!role) {
      return res.status(404).json({ error: "Role not found" });
    }
    res.status(200).json(role);
  } catch (error) {
    res.status(500);
  }
};

export const deleteRole = async (req, res) => {
  try {
    const result = await RoleModel.deleteRole(req.pool, req.params.id);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Role not found" });
    }
    res.status(204).json({ message: "Role deleted successfully" });
  } catch (error) {
    if (error.code === "23503") {
      return res.status(409).json({
        error: "Cannot delete role because it is referenced by other records",
      });
    }
    res.status(500);
  }
};
