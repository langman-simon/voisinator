import "dotenv/config";
import pg from "pg";

const { Pool } = pg;

const pgPool = new Pool({
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
      console.log("query executed");
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

process.on("exit", () => {
  pgPool.end.then(() => console.log("pool closed"));
});
