const db = require('./config/database');

async function createTables() {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMET PRIMARY KEY,
	email VARCHAR(255) NOT NULL UNIQUE,
	password VARCHAR(255) NOT NULL,
	role ENUM('tenant', 'landlord') NOT NULL,
	name VARCHAR(255) NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
   `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS work_orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
	title VARCHAR(255) NOT NULL,
	description TEXT NOT NULL,
	status ENUM('open', 'in_progress', 'completed') NOT NULL DEFAULT 'open',
	tenant_id INT NOT NULL,
	landlord_id NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (tenant_id) REFERENCES users(id),
	FOREIGN KEY (landlord_id) REFERENCES users(id)
      );
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS messages (
        id INT AUTO_INCREMENT PRIMARY KEY,
	content TEXT NOT NULL,
	sender_id INT NOT NULL,
	recipient_id INT NOT NULL,
	work_order_id INT,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (sender_id) REFERENCES users(id),
	FOREIGN KEY (recipient_id) REFERENCES users(id),
	FOREIGN KEY (work_order_id) REFERENCES work_orders(id)
      );
    `);

    console.log('Tables created successfully!');
    } catch (error) {
      console.error('Error creating tables:', error);
    } finally {
      db.end();
    }
  }

createTables();
