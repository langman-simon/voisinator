export const readRoles = async (SQLClient) => {
  const { rows } = await SQLClient.query("SELECT * FROM role ORDER BY id");
  return rows;
};

export const readRole = async (SQLClient, id) => {
  const { rows } = await SQLClient.query("SELECT * FROM role WHERE id = $1", [
    id,
  ]);
  return rows[0];
};

export const createRole = async (SQLClient, label) => {
  const { rows } = await SQLClient.query(
    "INSERT INTO role (label) VALUES ($1) RETURNING *",
    [label],
  );
  return rows[0];
};

export const updateRole = async (SQLClient, id, label) => {
  const { rows } = await SQLClient.query(
    "UPDATE role SET label = $1 WHERE id = $2 RETURNING *",
    [label, id],
  );
  return rows[0];
};

export const deleteRole = async (SQLClient, id) => {
  return await SQLClient.query("DELETE FROM role WHERE id = $1", [id]);
};
