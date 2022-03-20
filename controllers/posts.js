const { Pool } = require('pg');
const pool = new Pool();



exports.uploadGif = (req, res, next) => {
    const { title, image_url, user_id } = req.body
    pool.query(`INSERT INTO posts(title, image_url, user_id) VALUES ($1, $2, $3)`,
    [title, image_url, user_id], (error, results) => {
      if (error) {
        throw error
      }
      res.status(201).send('Gif has been uploaded successfully!')
    })
  }


exports.modifyGif = (req, res, next) => {
    const id = parseInt(req.params.id)
    const { title, image_url, user_id } = req.body
    console.log( {'id': req.auth.userId })
    console.log(req.auth.userId)
  
    pool.query(
      'UPDATE posts SET title = $1, image_url = $2, user_id = $3 WHERE post_id = $4',
      [title, image_url, user_id, id],
      (error, results) => {
        if (error) {
          throw error
        }
        res.status(200).send(`Gif modified successfully!`)
      }
    )
  }


exports.getAllGifs = (req, res, next) => {
    pool.query('SELECT * FROM posts', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}



exports.deleteOneGif = (req, res, next) => {
  const id = parseInt(req.params.id)

  pool.query('DELETE FROM posts WHERE post_id = $1' , [id], (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).send('Gif successfully deleted.')
  })
}





exports.getOneGif = (req, res, next) => {
    const id = parseInt(req.params.id)

    pool.query('SELECT * FROM posts WHERE post_id = $1', [id], (error, results) => {
        if (error) {
            console.log(error)
            throw error
        }
        console.log(results.rows[0].user_id)
        return res.status(200).json(results.rows)
    })
}


