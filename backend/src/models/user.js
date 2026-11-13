export const createUser = async (
  SQLClient,
  {
    roleId,
    pseudo,
    firstName,
    name,
    email,
    password,
    latitude,
    longitude,
    user_address,
    searchRadiusKm,
  },
) => {
  if (checkIfUserExist(SQLClient, { email })) {
    throw new Error("User with this pseudo or email already exists");
  } else {
    SQLClient.query(
      "INSERT INTO user (role_id, pseudo, first_name, name, email, password_hash, latitude, longitude, user_address, search_radius_km) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)",
      [
        roleId,
        pseudo,
        firstName,
        name,
        email,
        password,
        latitude,
        longitude,
        user_address,
        searchRadiusKm,
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

/* replace foreach by if*/
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
    latitude,
    longitude,
    user_address,
    searchRadiusKm,
  },
) => {
  /*waiting to correction */
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
