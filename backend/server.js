import express from "express";
import pool from "./src/database/db.js";
import categoryRoutes from "./src/routes/category.js";
import roleRoutes from "./src/routes/role.js";

const app = express();
const port = 3001;

app.use(express.json());

app.use((req, res, next) => {
  req.pool = pool;
  next();
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/categories", categoryRoutes);
app.use("/api/roles", roleRoutes);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
