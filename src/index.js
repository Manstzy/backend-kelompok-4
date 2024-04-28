// index.js

const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models'); // Import Sequelize instance
const productRouter = require('./routes/productRouter'); // Import product router
const userRouter = require('./routes/userRouter');

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

// Database connection
sequelize
  .authenticate()
  .then(() =>
    console.log('Database connection has been established successfully')
  )
  .catch((error) => console.error('Connection error', error));

// Routes
app.use('/product', productRouter); // Use product router
app.use('/user', userRouter);

const PORT = process.env.SERVER_PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
