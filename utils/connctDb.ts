import { Client } from "pg"

const pool = new Client({
    connectionString: "postgresql://root:e2N7kfepr8ltB4Cbe2O6OT2q@luca.iran.liara.ir:30234/postgres"
}); 

pool.connect();

export default pool 