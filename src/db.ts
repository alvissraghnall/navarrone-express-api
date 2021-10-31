import Pool from 'pg-pool';
import { config } from "dotenv";

config();

process.env.USER = "alviss"

const pool = new Pool({
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: parseInt(process.env.DBPORT!),
    database: process.env.DATABASE
});

export default pool;
