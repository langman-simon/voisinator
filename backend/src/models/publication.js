export const createPublication = async (
  SQLClient,
  { userId, categoryId, title, description, eventStartAt, eventEndAt, longitude, latitude,eventAddress, maxParticipants, coverImage },
) => {
    await SQLClient.query(
      "INSERT INTO publication (user_id, category_id, title, description, event_start_at, event_end_at, longitude, latitude, event_address, max_participants, cover_image) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)",
      [userId, categoryId, title, description, eventStartAt, eventEndAt, longitude, latitude, eventAddress, maxParticipants, coverImage],
    );
};

export const updatePublication = async (
  SQLClient,
  {
    id,
    categoryId,
    title,
    description,
    eventStartAt,
    eventEndAt,
    longitude,
    latitude,
    eventAddress,
    maxParticipants,
    coverImage
  },
) => {
  const fieldsToUpdate = [];
  const values = [];

  if (categoryId !== undefined && categoryId !== null) {
    values.push(categoryId);
    fieldsToUpdate.push(`category_id = $${values.length}`);
  }
  if (title !== undefined && title !== null) {
    values.push(title);
    fieldsToUpdate.push(`title = $${values.length}`);
  }
  if (description !== undefined && description !== null) {
    values.push(description);
    fieldsToUpdate.push(`description = $${values.length}`);
  }
  if (eventStartAt !== undefined && eventStartAt !== null) {
    values.push(eventStartAt);
    fieldsToUpdate.push(`event_start_at = $${values.length}`);
  }
  if (eventEndAt !== undefined && eventEndAt !== null) {
    values.push(eventEndAt);
    fieldsToUpdate.push(`event_end_at = $${values.length}`);
  }
  if (longitude !== undefined && longitude !== null) {
    values.push(longitude);
    fieldsToUpdate.push(`longitude = $${values.length}`);
  }
  if (latitude !== undefined && latitude !== null) {
    values.push(latitude);
    fieldsToUpdate.push(`latitude = $${values.length}`);
  }
  if (eventAddress !== undefined && eventAddress !== null) {
    values.push(eventAddress);
    fieldsToUpdate.push(`event_address = $${values.length}`);
  }
  if (maxParticipants !== undefined && maxParticipants !== null) {
    values.push(maxParticipants);
    fieldsToUpdate.push(`max_participants = $${values.length}`);
  }
  if (coverImage !== undefined && coverImage !== null) {
    values.push(coverImage);
    fieldsToUpdate.push(`cover_image = $${values.length}`);
  }

  if (fieldsToUpdate.length === 0) {
    throw new Error("No fields to update");
  }

  values.push(id);
  const query = `UPDATE publication SET ${fieldsToUpdate.join(
    ", ",
  )} WHERE id = $${values.length}`;

  await SQLClient.query(query, values);
};

export const findPublicationsByTitle = async(SQLClient, {title}) => {
    const { rows } = await SQLClient.query("SELECT * from publication WHERE title = $1", [title]);
    return rows;
}

export const findPublicationsByUserId = async(SQLClient, {userId}) => {
    const { rows } = await SQLClient.query("SELECT * from publication WHERE user_id = $1", [userId]);
    return rows;
}

export const findPublicationsByCategory = async(SQLClient, {userId}) => {
    const { rows } = await SQLClient.query("SELECT * from publication WHERE category_id = $1", [categoryId]);
    return rows;
}

export const findPublicationsByRadius = async(SQLClient, {latitude, longitude, kmRadius}) => {
    /*Query made by AI*/
    const { rows } = await SQLClient.query(
    `SELECT * FROM (
       SELECT *,
         6371 * acos(LEAST(1,
           cos(radians($1)) * cos(radians(latitude)) *
           cos(radians(longitude) - radians($2)) +
           sin(radians($1)) * sin(radians(latitude))
         )) AS "distanceKm"
       FROM publication
     ) AS p
     WHERE "distanceKm" <= $3
     ORDER BY "distanceKm"`,
    [latitude, longitude, kmRadius],
  );
  return rows;
}

export const deletePublication = async (SQLClient, { id }) => {
  const { rowCount } = await SQLClient.query("DELETE FROM publication WHERE id = $1", [
    id,
  ]);
  return rowCount > 0;
};