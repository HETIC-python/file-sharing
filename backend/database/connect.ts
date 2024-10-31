import mysql from 'mysql2/promise';

export async function connect() {
const database = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "file-sharing"
})
return database
}
export default connect