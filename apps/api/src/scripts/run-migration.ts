import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import path from "path";
import { Pool } from "pg";
import { env } from "../env";

const pool = new Pool({
  connectionString: env.POSTGRES_CONNECTION_STRING,
});

const db = drizzle(pool);

// this will automatically run needed migrations on the database
const main = async () => {
  try {
    await migrate(db, { migrationsFolder: path.join(__dirname, "../../migrations") });
    console.log("✅ Migrations ran successfully.");
  } catch (e) {
    console.error(e);
    await pool.end();
    process.exit(1);
  }
};

main();
