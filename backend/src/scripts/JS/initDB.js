import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { pool } from "../../database/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const sqlPath = join(__dirname, "../SQL/initDB.sql");
const requests = readFileSync(sqlPath, {
  encoding: "utf-8",
});

try {
  await pool.query(requests);
  console.log("Database initialized");
} catch (error) {
  console.error(error);
} finally {
  await pool.end();
  console.log("Pool closed");
}
