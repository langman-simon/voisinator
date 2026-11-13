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
  const fields = {
    roleId,
    pseudo,
    firstName,
    name,
    email,
    password,
    city,
    searchRadiusKm,
  };

  const fieldsToUpdate = [];
  const values = [];

  Object.entries(fields).forEach(([field, value]) => {
    if (value !== null && value !== undefined) {
      values.push(value);
      fieldsToUpdate.push(`${field} = $${values.length}`);
    }
  });

  if (fieldsToUpdate.length === 0) {
    throw new Error("No fields to update");
  }

  values.push(id);

  const query = `
    UPDATE users
    SET ${fieldsToUpdate.join(", ")}
    WHERE id = $${values.length}
  `;

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
