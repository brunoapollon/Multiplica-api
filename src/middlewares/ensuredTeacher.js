const User = require('../models/User');

async function ensuredTeacher(request, response, next) {
  const { enrollment } = request;
  const user = await User.findByPk(enrollment);
  if (user.type_user_id === 2) {
    return next();
  }
  return response.status(401).end();
}

module.exports = ensuredTeacher;
