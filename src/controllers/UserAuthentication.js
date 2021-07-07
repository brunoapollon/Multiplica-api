const { sign } = require('jsonwebtoken');
const { compare } = require('bcryptjs');
const authConfig = require('../config/authConfig');
const User = require('../models/User');

module.exports = {
  async store(request, response) {
    const { enrollment, password } = request.body;
    if (!enrollment || !password) {
      return response.status(400).json({ error: 'Validation fails' });
    }
    const user = await User.findByPk(enrollment);
    if (!user) {
      return response
        .status(400)
        .json({ error: 'enrollment or password is wrong' });
    }
    const passwordCompare = compare(password, user.password);
    if (!passwordCompare) {
      return response
        .status(400)
        .json({ error: 'enrollment or password is wrong' });
    }
    const sub = user.enrollment.toString();
    console.log(sub);
    const token = sign({ enrollment: user.enrollment }, authConfig.jwt.secret, {
      subject: sub,
      expiresIn: authConfig.jwt.expiresIn,
    });
    return response.json({ token });
  },
};
