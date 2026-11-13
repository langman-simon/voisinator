import "dotenv/config";
import pg from "pg";

const pgPool = new pg.Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
  max: 10 /*just for example*/,
});

export const pool = {
  query: async (query, params) => {
    try {
      return await pgPool.query(query, params);
    } catch (e) {
      console.error(e);
      throw e;
    }
  },
  end: () => {
    return pgPool.end();
  },
};
