export const readCategories = async (SQLClient) => {
  const { rows } = await SQLClient.query("SELECT * FROM category ORDER BY id");
  return rows;
};

export const readCategory = async (SQLClient, id) => {
  const { rows } = await SQLClient.query(
    "SELECT * FROM category WHERE id = $1",
    [id],
  );
  return rows[0];
};

export const createCategory = async (SQLClient, label, icon, color) => {
  const { rows } = await SQLClient.query(
    "INSERT INTO category (label, icon, color) VALUES ($1, $2, $3) RETURNING *",
    [label, icon, color],
  );
  return rows[0];
};

export const updateCategory = async (SQLClient, id, label, icon, color) => {
  const fieldsToUpdate = [];
  const values = [];

  if (label !== undefined && label !== null) {
    values.push(label);
    fieldsToUpdate.push(`label = $${values.length}`);
  }

  if (icon !== undefined && icon !== null) {
    values.push(icon);
    fieldsToUpdate.push(`icon = $${values.length}`);
  }

  if (color !== undefined && color !== null) {
    values.push(color);
    fieldsToUpdate.push(`color = $${values.length}`);
  }

  if (fieldsToUpdate.length === 0) {
    throw new Error("No fields to update");
  }

  values.push(id);

  const query = `
  UPDATE category
  SET ${fieldsToUpdate.join(", ")}
  WHERE id = $${values.length}
  RETURNING *
  `;

  const { rows } = await SQLClient.query(query, values);
  return rows[0];
};

export const deleteCategory = async (SQLClient, id) => {
  return await SQLClient.query("DELETE FROM category WHERE id = $1", [id]);
};
