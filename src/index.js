require('dotenv').config();
const express = require('express');
const cors = require('cors');

const router = require('./routes/router');

const app = express();

// middleware start
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({ origin: true, credentials: true }));
// middleware end

// router start
app.use('/', router);
// router end

// server port start
const PORT = process.env.SERVER_PORT;
app.listen(PORT, () => {
  console.log(`Server Running on PORT: ${PORT}`);
});
// server port end
