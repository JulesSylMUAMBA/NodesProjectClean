import { Pool } from 'pg';

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'ballondor',
    password: 'B@ll0nD0r2024!',
    port: 5432,
});

pool.on('error', (err: Error) => {
    console.error('Erreur avec le pool PostgreSQL', err);
});

export default pool;
