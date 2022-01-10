const { sign } = require('jsonwebtoken');
const { compare } = require('bcryptjs');
const authConfig = require('../config/authConfig');
const User = require('../models/User');

module.exports = {
  async store(request, response) {
    const { enrollment, password } = request.body;
    if (!enrollment || !password) {
      return response.status(401).json({ error: 'Validation fails' });
    }
    let userFind = await User.findByPk(enrollment);
    if (!userFind) {
      return response
        .status(401)
        .json({ error: 'enrollment or password is wrong' });
    }
    const passwordCompare = await compare(password, userFind.password);
    if (!passwordCompare) {
      return response
        .status(401)
        .json({ error: 'enrollment or password is wrong' });
    }
    const sub = userFind.enrollment.toString();
    const token = sign(
      { enrollment: userFind.enrollment },
      authConfig.jwt.secret,
      {
        subject: sub,
        expiresIn: authConfig.jwt.expiresIn,
      },
    );
    let user;

    if (userFind.type_user_id === 1) {
      user = {
        enrollment: userFind.enrollment,
        name: userFind.name,
        email: userFind.email,
        level: userFind.level,
        type_user_id: userFind.type_user_id,
        avatar_id: userFind.avatar_id,
      };
    } else {
      user = {
        enrollment: userFind.enrollment,
        name: userFind.name,
        email: userFind.email,
        type_user_id: userFind.type_user_id,
        avatar_id: userFind.avatar_id,
      };
    }
    return response.status(200).json({ token, user });
  },
};
