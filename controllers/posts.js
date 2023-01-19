const { Pool } = require('pg')
const pool = new Pool()
const fs = require('fs')


exports.uploadGif = (req, res, next) => {

  const url = req.protocol + '://' + req.get('host')
  // const { title, image_url, user_id } = req.body.post

  const post = {
    title: req.body.title,
    users_read: req.body.users_read,
    user_id: req.body.user_id,
    username: req.body.username
  }

  pool.query(`INSERT INTO posts(title, users_read, user_id, username) VALUES ($1, $2, $3, $4)`,
    [post.title, post.users_read, post.user_id, post.username], (error) => {
      if (error) {
        return res.status(404).json({ 'message': 'Error when sending request - check all required fields.' })
      }
      res.status(201).send({ 'message': 'Post has been published successfully!' })
    })
}




exports.modifyGif = (req, res, next) => {
  const id = parseInt(req.params.id)
  const { title, users_read, user_id } = req.body
  // console.log({ 'id': req.auth.userId })
  let post = ''



  pool.query('SELECT * FROM posts WHERE post_id = $1', [id], (error, results) => {
    if (error) {
      console.log(error)
      throw error
    }
    const userId = results.rows[0].user_id

    // if (userId !== req.auth.userId) {
    //   console.log(req.auth.userId, userId, 'Request not authorized!')
    //   return res.status(401).json({
    //     error: new Error('Request not authorized!')
    //   });
    // }

    // if (req.file) {
    //   let data = JSON.parse(req.body.post)
    //   const originalFilename = results.rows[0].image_url.split('/images/')[1]
    //   // fs.unlink('images/' + originalFilename, () => {
    //   //   console.log(data)
    //   //   console.log(originalFilename)
    //   //   console.log('Removed old image file from database')
    //   // })

    //   const url = req.protocol + '://' + req.get('host')
    //   // const { title, image_url, user_id } = req.body.post
    //   post = {
    //     title: data.title,
    //     image_url: url + '/images/' + req.file.filename,
    //     user_id: data.user_id
    //   }
    // } else {
    //   post = {
    //     title: req.body.title,
    //     image_url: req.body.image_url,
    //     user_id: req.body.user_id
    //   }
    // }

    post = {
      users_read: req.body.users_read,
    }

    pool.query(
      'UPDATE posts SET users_read = $1 WHERE post_id = $2',
      [post.users_read, id],
      (error, results) => {
        if (error) {
          throw error
        }
        res.status(200).send({ 'message': 'Post modified successfully!' })
      }
    )
  })

}




exports.deleteOneGif = (req, res, next) => {
  const id = parseInt(req.params.id)

  pool.query('SELECT * FROM posts WHERE post_id = $1', [id], (error, results) => {
    const userId = results.rows[0].user_id
    // const filename = results.rows[0].image_url.split('/images/')[1]

    if (error) {
      console.log(error)
      throw error
    }

    if (userId !== req.auth.userId) {
      console.log({ 'authenticated UserId': req.auth.userId }, 'Unauthorized request.')
      return res.status(400).json({
        'message': 'Unauthorized request.'
      });
    }

    pool.query('DELETE FROM posts WHERE post_id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      console.log('Post successfully deleted.')
      return res.status(200).send({ "message": 'Post succesfully deleted' })
    })


    // fs.unlink('images/' + filename, () => {
    //   pool.query('DELETE FROM posts WHERE post_id = $1', [id], (error, results) => {
    //     if (error) {
    //       throw error
    //     }
    //     return res.status(200).send('Gif successfully deleted.')
    //   })
    // })

    // console.log(results)
    // res.status(200).json(results.rows)
  })

}




exports.getOneGif = (req, res, next) => {
  const id = parseInt(req.params.id)

  pool.query('SELECT * FROM posts WHERE post_id = $1', [id], (error, results) => {
    if (error) {
      console.log(error)
      return res.status(404).json({ 'message': 'Page not found.' })
    }
    console.log(results.rows[0].user_id)
    return res.status(200).json(results.rows)
  })
}





exports.getAllPosts = (req, res, next) => {
  pool.query('SELECT * FROM posts INNER JOIN users ON users.user_id = posts.user_id', (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
}