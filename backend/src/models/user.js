export const createUser = async (
  SQLClient,
  { roleId, pseudo, firstName, name, email, password, city, searchRadiusKm },
) => {};

export const readUser = async (SQLClient) => {
  const { rows } = await SQLClient.query("SELECT * FROM user ORDER BY id");
  return rows;
};

export const updateUser = async (
  SQLClient,
  { roleId, pseudo, firstName, name, email, password, city, searchRadiusKm },
) => {};

export const deleteUser = async (SQLClient, { id }) => {};
