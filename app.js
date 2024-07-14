const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const contactsRouter = require('./routes/api/contacts');
require('dotenv').config();

const app = express();
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

app.use('/api/contacts', contactsRouter);

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