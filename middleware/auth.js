const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_STRING');
    const userId = decodedToken.userId;
    req.auth = { userId }
    if (req.body.userId && req.body.userId !== userId) {
      console.log('no match')
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    console.log('unauthorized')
    res.status(401).json({
      'message': 'unauthorized'
    });
  }
};