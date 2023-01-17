const { get } = require('express/lib/response');
const db = require('../db');

//User constructor
function Post({
    title,
    image_url,
    user_id
}) {
    this.title = title,
        this.image_url = image_url,
        this.user_id = user_id
};

// add a createPost method to the prototype
Post.prototype.createPost = async function () {
    try {
        const { rows } = await db.query(
            `INSERT INTO posts(title, image_url, user_id) 
            VALUES ($1, $2, $3)`,
            [this.title, this.image_url, this.user_id]
        )

        return rows
    } catch (error) {
        throw error
    }
}


module.exports = Post
// db.query: the query method we exported earlier from db/index.js