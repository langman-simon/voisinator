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
  const { rows } = await SQLClient.query(
    "UPDATE category SET label = $1, icon = $2, color = $3 WHERE id = $4 RETURNING *",
    [label, icon, color, id],
  );
  return rows[0];
};

export const deleteCategory = async (SQLClient, id) => {
  return await SQLClient.query("DELETE FROM category WHERE id = $1", [id]);
};
