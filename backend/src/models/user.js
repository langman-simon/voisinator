export const createUser = async (
  SQLClient,
  {
    role_id,
    pseudo,
    first_name,
    name,
    email,
    password,
    longitude,
    latitude,
    user_address,
    search_radius_km,
  },
) => {
  if (await checkIfUserExist(SQLClient, { email })) {
    throw new Error("User with this pseudo or email already exists");
  } else {
    SQLClient.query(
      `INSERT INTO "user" (role_id, pseudo, first_name, name, email, password_hash, longitude, latitude, user_address, search_radius_km) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
      [
        role_id,
        pseudo,
        first_name,
        name,
        email,
        password,
        longitude,
        latitude,
        user_address,
        search_radius_km,
      ],
    );
  }
};

export const readUserById = async (SQLClient, { id }) => {
  const { rows } = await SQLClient.query('SELECT * FROM "user" WHERE id = $1', [
    id,
  ]);
  return rows[0];
};

export const updateUser = async (
  SQLClient,
  { id },
  {
    role_id,
    pseudo,
    first_name,
    name,
    email,
    password,
    longitude,
    latitude,
    user_address,
    search_radius_km,
  },
) => {
  const fieldsToUpdate = [];
  const values = [];

  if (role_id !== undefined && role_id !== null) {
    values.push(role_id);
    fieldsToUpdate.push(`role_id = $${values.length}`);
  }
  if (pseudo !== undefined && pseudo !== null) {
    values.push(pseudo);
    fieldsToUpdate.push(`pseudo = $${values.length}`);
  }
  if (first_name !== undefined && first_name !== null) {
    values.push(first_name);
    fieldsToUpdate.push(`first_name = $${values.length}`);
  }
  if (name !== undefined && name !== null) {
    values.push(name);
    fieldsToUpdate.push(`name = $${values.length}`);
  }
  if (email !== undefined && email !== null) {
    values.push(email);
    fieldsToUpdate.push(`email = $${values.length}`);
  }
  if (password !== undefined && password !== null) {
    values.push(password);
    fieldsToUpdate.push(`password_hash = $${values.length}`);
  }
  if (longitude !== undefined && longitude !== null) {
    values.push(longitude);
    fieldsToUpdate.push(`longitude = $${values.length}`);
  }
  if (latitude !== undefined && latitude !== null) {
    values.push(latitude);
    fieldsToUpdate.push(`latitude = $${values.length}`);
  }
  if (user_address !== undefined && user_address !== null) {
    values.push(user_address);
    fieldsToUpdate.push(`user_address = $${values.length}`);
  }
  if (search_radius_km !== undefined && search_radius_km !== null) {
    values.push(search_radius_km);
    fieldsToUpdate.push(`search_radius_km = $${values.length}`);
  }

  if (fieldsToUpdate.length === 0) {
    throw new Error("No fields to update");
  }

  values.push(id);
  const query = `UPDATE "user" SET ${fieldsToUpdate.join(
    ", ",
  )} WHERE id = $${values.length}`;

  await SQLClient.query(query, values);
};

export const deleteUser = async (SQLClient, { id }) => {
  const { rowCount } = await SQLClient.query(
    `DELETE FROM "user" WHERE id = $1`,
    [id],
  );
  return rowCount > 0;
};

export const checkIfUserExist = async (SQLClient, { email }) => {
  const { rows } = await SQLClient.query(
    `SELECT * FROM "user" WHERE email = $1`,
    [email],
  );
  return rows.length > 0;
};
