
const jwt = require('jsonwebtoken');

module.exports.checkUser = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    const decode = jwt.decode(token, 'jsonwebtoken');
    if (decode) {
      req.userId = decode.id;
      return next();
    } else {
      return res.status(401).json({
        status: 'error',
        message: 'You are not authorised'
      });
    }
  } else {
    return res.status(401).json({
      status: 'error',
      message: 'You are not authorised'
    });
  }
}





module.exports.checkAdmin = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    const decode = jwt.decode(token, 'jsonwebtoken');
    if (decode) {
      if (decode.isAdmin) {
        req.userId = decode.id;
        req.isAdmin = decode.isAdmin;
        return next();
      } else {
        return res.status(401).json({
          status: 'error',
          message: 'You are not authorised'
        });
      }

    } else {
      return res.status(401).json({
        status: 'error',
        message: 'You are not authorised'
      });
    }
  } else {
    return res.status(401).json({
      status: 'error',
      message: 'You are not authorised'
    });
  }
}