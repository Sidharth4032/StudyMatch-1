const mysql = require('mysql2/promise');

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
};

const migrationScript = async () => {
    try {
        const connection = await mysql.createConnection(dbConfig);

        // Users Table
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE
            )
        `);

        // Subjects Table
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS subjects (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) UNIQUE NOT NULL,
                description TEXT
            )
        `);


        console.log("Migration completed successfully");
        await connection.end();
    } catch (error) {
        console.error("Migration failed:", error);
    }
};

migrationScript();
