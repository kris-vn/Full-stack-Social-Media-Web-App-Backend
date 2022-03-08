const express = require('express')

const app = express();

const usersRoutes = require('./routes/users')
const postsRoutes = require('./routes/posts')
const commentsRoutes = require('./routes/comments')

require('dotenv').config()


app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
  next()
});


app.use('/api/users', usersRoutes)
app.use('/api/posts', postsRoutes)
app.use('/api/comments', commentsRoutes)


app.use((err, req, res, next) => {
  if(err.statusCode) {
      res.status(err.statusCode).send(err.message);
  } else {
      console.log(err);
      res.status(500).send('An unexpected error occurred.');
  }
});


module.exports = app
