import { readFileSync } from "node:fs";
import { pool } from "../../database/db.js";

process.on("exit", () => {
  pgPool.end().then(() => console.log("pool closed"));
});

const requests = readFileSync("./initDB.sql", { encoding: "utf-8" });

try {
  await pool.query(requests, []);
  console.log("done");
} catch (e) {
  console.error(e);
}
