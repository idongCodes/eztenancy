const mysql = require('mysql2/promise');

const dbConfig = {
  host: 'localhost',
  user: 'landlord',
  password: '219MayStreet01!',
  database: 'tenant_landlord_app',
};

const db = mysql.createPool(dbConfig);

async function createUserTable() {
  try {
    await db.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        role ENUM('tenant', 'landlord') NOT NULL
      );
    `);
    console.log('User table created');
  } catch (error) {
    console.log('Error creating user table', error);
  }
}

createUserTable();

module.exports = db;
