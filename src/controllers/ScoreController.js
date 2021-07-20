const Score = require('../models/Score');
const User = require('../models/User');

module.exports = {
  async show(request, response) {
    const { enrollment } = request;
    const userScore = await Score.findOne({
      include: [{ model: User, as: 'user', attributes: ['name', 'level'] }],
      where: { user_enrollment: enrollment },
    });
    return response.status(200).json(userScore);
  },
};
