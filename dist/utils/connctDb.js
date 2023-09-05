"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const pool = new pg_1.Client({
    connectionString: "postgresql://root:e2N7kfepr8ltB4Cbe2O6OT2q@luca.iran.liara.ir:30234/postgres"
});
pool.connect();
exports.default = pool;
