const { verify } = require('jsonwebtoken');
const authConfig = require('../config/authConfig');

function ensureAuthenticated(request, response, next) {
  const authToken = request.headers.authorization;
  if (!authToken) {
    return response.status(401).json({ error: 'token is missing' });
  }
  const [, token] = authToken.split(' ');
  try {
    const { sub } = verify(token, authConfig.jwt.secret);
    request.enrollment = parseInt(sub);

    return next();
  } catch (err) {
    return response.status(401).json({ error: 'you are not authenticated' });
  }
}

module.exports = ensureAuthenticated;
