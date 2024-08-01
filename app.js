require('dotenv').config();
const express = require('express');
const initializeDatabase = require('./Models/index.js');
const userRoutes = require('./Routes/userRoutes');
const menuRoutes = require('./Routes/menuRoutes');
const orderRoutes = require('./Routes/orderRoutes');
const paymentRoutes = require('./Routes/paymentRoutes');

const app = express();
app.use(express.json());

initializeDatabase().then(db => {
 
    app.use((req, res, next) => {
        req.db = db;
        next();
    });
   
    app.use('/user', userRoutes);
    app.use('/menu',menuRoutes)
    app.use('/order',orderRoutes)
    app.use('/payment',paymentRoutes)
 
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Unable to initialize database:', err);
});
