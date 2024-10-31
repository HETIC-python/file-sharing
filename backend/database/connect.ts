import mysql from 'mysql2/promise'
import * as process from "node:process";

export function connect() {
const database = mysql.createPool({
    host: process.env.DB_HOST,
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "file-sharing"
})
return database
}
export default connect