const db = require('../db');

//User constructor
function Comment ({
  comment_text,
  post_id,
  user_id
}) {
    this.comment_text = comment_text,
    this.post_id = post_id,
    this.user_id = user_id
};

// add a createComment method to the prototype
Comment.prototype.createComment = async function() {
    try {
        const { rows } = await db.query(
            `INSERT INTO comments(comment_text, post_id, user_id) 
            VALUES ($1, $2, $3)`,
            [this.comment_text, this.post_id, this.user_id]
        );
        
        return rows
    } catch (error) {
        throw error
    }
};


module.exports = Comment
// db.query: the query method we exported earlier from db/index.js