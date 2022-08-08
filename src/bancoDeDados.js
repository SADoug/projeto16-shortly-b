import pg from "pg";
import dotenv from "dotenv";

dotenv.config();
const { Pool } = pg;

const databaseConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
}

const db = new Pool(databaseConfig);

export default db;


/*

FUNCIONANDO
const { Pool } = pg;
const db = new Pool({
  host: process.env.DB_HOST,
  port: 5432,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
 
});
export default db;
*/