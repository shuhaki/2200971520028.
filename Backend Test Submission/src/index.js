// src/index.js
require('dotenv').config();
const express      = require('express');
const mongoose     = require('mongoose');
const routes       = require('./routes/shorturls');
const errorHandler = require('./middleware/errorHandler');
const { MONGO_URL, PORT } = require('./config');

console.log('routes is:', routes);
console.log('typeof routes:', typeof routes);
console.log('errorHandler is:', errorHandler);
console.log('typeof errorHandler:', typeof errorHandler);

const app = express();
app.use(express.json());
app.use(routes);
app.use(errorHandler);

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () =>
    console.log(`⚡️ Server running at http://localhost:${PORT}`)
  ))
  .catch(err => console.error(err));