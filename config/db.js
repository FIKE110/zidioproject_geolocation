import mysql from "mysql2"
import dotenv from "dotenv"

dotenv.config()

const config={
    host:process.env.MYSQL_HOST,
    user:process.env.MYSQL_USER,
    password:process.env.MYSQL_PASSWORD,
    database:process.env.MYSQL_DB,
    port: 28942
}

let pool=null

export function createConnection(){
    pool=mysql.createPool(config).promise()
}

export async function query(sql,extra){
    const row=await pool.query(sql,extra)
    return row
}
