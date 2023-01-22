const express = require('express')
const path = require('path');


const usersRoutes = require('./routes/users')
const postsRoutes = require('./routes/posts')

require('dotenv').config()

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
  next()
});

app.use('/api/users', usersRoutes)
app.use('/api/posts', postsRoutes)

module.exports = app
