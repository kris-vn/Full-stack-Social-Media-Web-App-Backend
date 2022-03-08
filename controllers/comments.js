const { Pool } = require('pg');
const pool = new Pool();



exports.addComment = (req, res) => {
    const {comment_text, post_id, user_id} = req.body
    pool.query(`INSERT INTO comments(comment_text, post_id, user_id) VALUES ($1, $2, $3)`,
    [comment_text, post_id, user_id], (error, results) => {
      if (error) {
        throw error
      }
      res.status(201).send('Comment added successfully!')
    })
}



exports.deleteOneComment = (req, res) => {
    const id = parseInt(req.params.id)
  
    pool.query('DELETE FROM comments WHERE comment_id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).send('Comment successfully deleted.')
    })
}



exports.getAllComments = (req, res, next) => {
    const id = parseInt(req.params.id)

    pool.query('SELECT * FROM comments WHERE post_id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}
