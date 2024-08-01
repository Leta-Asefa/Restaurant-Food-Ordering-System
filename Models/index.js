const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');

async function initializeDatabase() {
    try {
        // Connect to MySQL server
        const connection = await mysql.createConnection({
            host: process.env.HOST,
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD
        });
        // console.log('Connected to MySQL server');

        // Create database if it doesn't exist
        await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
        // console.log('Database created or already exists');

        // Close the connection
        await connection.end();
        // console.log('MySQL connection closed');

        // Initialize Sequelize with the created database
        const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
            host: process.env.HOST,
            dialect: 'mysql'
        });
        // console.log('Sequelize initialized');

        // Define your models and other logic here
        const db = {};

        // Import models
        db.User = require('./userModel')(sequelize, Sequelize.DataTypes);
        db.Menu = require('./menuModel')(sequelize, Sequelize.DataTypes);
        db.Order = require('./orderModel')(sequelize, Sequelize.DataTypes);
        db.Payment = require('./paymentModel')(sequelize, Sequelize.DataTypes);

        // console.log('User model imported');

        // Sync models with database
        await sequelize.sync();

        db.sequelize = sequelize;
        db.Sequelize = Sequelize;
        return db;
    } catch (error) {
        console.error('Error initializing database:', error);
        throw error;
    }
}

module.exports = initializeDatabase;
