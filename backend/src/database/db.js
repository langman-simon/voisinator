import "dotenv/config";
import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
  max: 10 /*just for example*/,
});

async function initDB() {
  const client = await pool.connect();

  try {
    const sql = fs.readFileSync(sqlPath, "utf-8"); // sqlPath is the path to your SQL file here : /src/SQL/initDB.sql

    await client.query(sql);

    console.log("database initialized");
  } catch (error) {
    console.error("Database initialization failed", error);
  } finally {
    client.release();
  }
}

process.on("exit", () => {
  pgPool.end().then(() => console.log("pool closed"));
});
