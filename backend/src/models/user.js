export const createUser = async (
  SQLClient,
  { roleId, pseudo, firstName, name, email, password, city, searchRadiusKm },
) => {
  if (checkIfUserExist(SQLClient, { email })) {
    throw new Error("User with this pseudo or email already exists"); // throw Error or there is another way to handle this?
  } else {
    SQLClient.query(
      "INSERT INTO user (role_id, pseudo, first_name, name, email, password_hash, city, search_radius_km) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
      [roleId, pseudo, firstName, name, email, password, city, searchRadiusKm],
    );
  }
};

export const readUserById = async (SQLClient, { id }) => {
  const { rows } = await SQLClient.query(
    "SELECT * FROM user WHERE id = $1 VALUES ",
    [id],
  );
  return rows;
};

export const updateUser = async (
  SQLClient,
  {
    id,
    roleId,
    pseudo,
    firstName,
    name,
    email,
    password,
    city,
    searchRadiusKm,
  },
) => {
  const fieldsToUpdate = [];
  const values = [];

  if (roleId !== undefined && roleId !== null) {
    fieldsToUpdate.push("role_id = $1");
    values.push(roleId);
  }
  if (pseudo !== undefined && pseudo !== null) {
    fieldsToUpdate.push(`pseudo = $${values.length + 1}`);
    values.push(pseudo);
  }
  if (firstName !== undefined && firstName !== null) {
    fieldsToUpdate.push(`first_name = $${values.length + 1}`);
    values.push(firstName);
  }
  if (name !== undefined && name !== null) {
    fieldsToUpdate.push(`name = $${values.length + 1}`);
    values.push(name);
  }
  if (email !== undefined && email !== null) {
    fieldsToUpdate.push(`email = $${values.length + 1}`);
    values.push(email);
  }
  if (password !== undefined && password !== null) {
    fieldsToUpdate.push(`password_hash = $${values.length + 1}`);
    values.push(password);
  }
  if (city !== undefined && city !== null) {
    fieldsToUpdate.push(`city = $${values.length + 1}`);
    values.push(city);
  }
  if (searchRadiusKm !== undefined && searchRadiusKm !== null) {
    fieldsToUpdate.push(`search_radius_km = $${values.length + 1}`);
    values.push(searchRadiusKm);
  }

  if (fieldsToUpdate.length === 0) {
    throw new Error("No fields to update");
  }

  const query = `UPDATE user SET ${fieldsToUpdate.join(
    ", ",
  )} WHERE id = $${values.length + 1}`;
  values.push(id);

  await SQLClient.query(query, values);
};

export const deleteUser = async (SQLClient, { id }) => {
  const { rowCount } = await SQLClient.query("DELETE FROM user WHERE id = $1", [
    id,
  ]);
  return rowCount > 0;
};

export const checkIfUserExist = async (SQLClient, { email }) => {
  const { rows } = await SQLClient.query(
    "SELECT * FROM user WHERE email = $1",
    [email],
  );
  return rows.length > 0;
};
