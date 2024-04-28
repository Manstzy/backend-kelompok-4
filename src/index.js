require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');

const userRouter = require('./routes/userRouter');
const addressRouter = require('./routes/addressRouter');

const app = express();

// middleware start
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({ origin: true, credentials: true }));
sequelize
  .authenticate()
  .then(() => {
    console.log('database connection has been established successfully');
  })
  .catch((error) => {
    console.log('connection error', error);
  });

// middleware end

// router start
app.use('/user', userRouter);
app.use('/address', addressRouter);
// router end

const PORT = process.env.SERVER_PORT;

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});
