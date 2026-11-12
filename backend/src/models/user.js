export const createUser = async (
  SQLClient,
  { roleId, pseudo, firstName, name, email, password, city, searchRadiusKm },
) => {
  if (sameUserData(SQLClient, { pseudo, email })) {
    throw new Error("User with this pseudo or email already exists"); // throw Error or there is another way to handle this?
  } else {
    SQLClient.query(
      "INSERT INTO user (role_id, pseudo, first_name, name, email, password_hash, city, search_radius_km) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
      [roleId, pseudo, firstName, name, email, password, city, searchRadiusKm],
    );
  }
};

export const findUserById = async (SQLClient, { id }) => {
  const { rows } = await SQLClient.query("SELECT * FROM user WHERE id = $1", [
    id,
  ]);
  return rows[0];
};

export const findUserByEmail = async (SQLClient, { email }) => {
  const { rows } = await SQLClient.query(
    "SELECT * FROM user WHERE email = $1",
    [email],
  );
  return rows[0];
};

export const findUserByPseudo = async (SQLClient, { pseudo }) => {
  const { rows } = await SQLClient.query(
    "SELECT * FROM user WHERE pseudo = $1",
    [pseudo],
  );
  return rows[0];
};

//update only the fields that are not null or undefined, if a field is null or undefined, it will not be updated
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

// delete only existing user by id, if the user does not exist, it will not throw an error
export const deleteUser = async (SQLClient, { id }) => {
  const { rowCount } = await SQLClient.query("DELETE FROM user WHERE id = $1", [
    id,
  ]);
  return rowCount > 0;
};

/*this function checks if a user with the same pseudo or email already exists */
export const checkIfUserExist = async (SQLClient, { pseudo, email }) => {
  const { rows } = await SQLClient.query(
    "SELECT * FROM user WHERE pseudo = $1 OR email = $2",
    [pseudo, email],
  );
  return rows.length > 0;
};
