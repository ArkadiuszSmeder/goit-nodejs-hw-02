const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require("path");
const { v4: uuidV4 } = require('uuid');
const apiRouter = require('./routes/api/api.js');
const JWTStrategy = require('./config/jwt.js');
require('dotenv').config();

const app = express();

app.set("view engine", "ejs");

app.use(express.static(path.resolve(__dirname, "./public")));

const { DB_URL: urlDB } = process.env;

const connection = async () => {
  try {
    mongoose.connect(urlDB, {dbName: 'db-contacts'});
    console.log('Database connection successful');
  } catch (err) {
      console.log('Database connection error:', err.message);
      process.exit(1);
  }
};

connection();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

JWTStrategy();

app.use('/api', apiRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

module.exports = app

// const startServer = async () => {
//   try {
//     await connection;
//     console.log('Database connection successful');
//     app.listen(3001, () => {
//       console.log('Server is running on port 3001');
//     })
//   } catch (err) {
//     console.log(err);
//     process.exit(1);
//   }
// }

// startServer();