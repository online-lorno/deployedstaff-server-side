import mysql from 'mysql2/promise'

const pool = mysql.createPool({
  host: 'your-mysql-host',
  user: 'your-mysql-user',
  password: 'your-mysql-password',
  database: 'your-mysql-database',
})

async function executeQuery(sql: string, params: any) {
  const connection = await pool.getConnection()
  try {
    const [rows] = await connection.execute(sql, params)
    return rows
  } finally {
    connection.release()
  }
}

export default {
  executeQuery,
}
