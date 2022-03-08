const User = require('../models/User');
const { Pool } = require('pg');
const pool = new Pool();


exports.addNewUser = (req, res, next) => {
    const {username, password, email, bio} = req.body
    const user = new User({username, password, email, bio})
    user.createUser()
    .then(() => {
        res.status(201).json({
            message: 'User created successfully!'
        })
      } 
    ).catch(
        (error) => {
            const errorToThrow = new Error();
            switch (error?.code) {
                case '23505':
                    errorToThrow.message = 'User already exists';
                    errorToThrow.statusCode = 403;
                    break;
                default:
                    errorToThrow.statusCode = 500;
            }
            //pass error to next()
            next(errorToThrow);
        }
    )
}


// exports.createNewUser = (req, res) => {
//     const {username, email, password, bio} = req.body
  
//     pool.query(`INSERT INTO users(username, email, password, bio) 
//     VALUES ($1, $2, $3, $4)`,
//     [username, email, password, bio], (error) => {
//       if (error) {
//         throw error
//       }
//       res.status(201).send(`New user added.}`)
//     })
//   }



exports.getOneUser = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM users WHERE user_id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}


exports.getAllUsers = (request, response) => {
  
    pool.query('SELECT * FROM users', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}