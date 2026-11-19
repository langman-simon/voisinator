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
  const { rows } = await SQLClient.query(
    `INSERT INTO "user" (
      role_id,
      pseudo,
      first_name,
      name,
      email,
      password_hash,
      longitude,
      latitude,
      user_address,
      search_radius_km
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
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
  return rows[0];
};

export const readUserById = async (SQLClient, { id }) => {
  const { rows } = await SQLClient.query(
    `SELECT
      id,
      role_id,
      pseudo,
      first_name,
      name,
      email,
      longitude,
      latitude,
      user_address,
      search_radius_km,
      created_at
    FROM "user"
    WHERE id = $1`,
    [id],
  );
  return rows[0];
};

export const readUserByEmail = async (SQLClient, { email }) => {
  const { rows } = await SQLClient.query(
    `SELECT
      id,
      role_id,
      pseudo,
      first_name,
      name,
      email
      password_hash,
      longitude,
      latitude,
      user_address,
      search_radius_km,
      created_at
    FROM "user"
    WHERE email = $1`,
    [email],
  );
  return rows[0];
};

export const updateUser = async (
  SQLClient,
  {
    id,
    role_id,
    pseudo,
    first_name,
    name,
    password,
    longitude,
    latitude,
    user_address,
    search_radius_km,
  },
) => {
  const fields = {
    role_id,
    pseudo,
    first_name,
    name,
    password_hash: password,
    longitude,
    latitude,
    user_address,
    search_radius_km,
  };

  const fieldsToUpdate = [];
  const values = [];

  for (const [column, value] of Object.entries(fields)) {
    if (value !== undefined && value !== null) {
      values.push(value);
      fieldsToUpdate.push(`${column} = $${values.length}`);
    }
  }

  if (fieldsToUpdate.length === 0) {
    throw new Error("No fields to update");
  }

  values.push(id);

  const { rows } = await SQLClient.query(
    `UPDATE "user"
    SET ${fieldsToUpdate.join(", ")}
    WHERE id = $${values.length}`,
    values,
  );
  return rows[0];
};

export const deleteUser = async (SQLClient, { id }) => {
  const { rowCount } = await SQLClient.query(
    `DELETE FROM "user"
    WHERE id = $1`,
    [id],
  );

  return rowCount > 0;
};

export const checkIfUserExistByEmail = async (SQLClient, { email }) => {
  const { rows } = await SQLClient.query(
    `SELECT EXISTS(
      SELECT 1
      FROM "user"
      WHERE email = $1
    ) AS exists`,
    [email],
  );

  return rows[0].exists;
};

export const checkIfUserExistById = async (SQLClient, { id }) => {
  const { rows } = await SQLClient.query(
    `SELECT EXISTS(
      SELECT 1
      FROM "user"
      WHERE id = $1
    ) AS exists`,
    [id],
  );

  return rows[0].exists;
};
